/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RegisterUser"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginUser"
 *     responses:
 *       200:
 *         description: Login successful, returns a token
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User Not Found
 */

/**
 * @swagger
 * /users/deregister:
 *   delete:
 *     summary: Deregister a user account
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User deregistered successfully
 *       401:
 *         description: Unauthorized or authentication failure
 */

/**
 * @swagger
 * /users/user/{id}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/change-password:
 *   post:
 *     summary: Change user password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - oldPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: User Not Found
 */

/**
 * @swagger
 * /users/whoAmI:
 *   get:
 *     summary: Get authenticated user details
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns the logged-in user's details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User Not Found  
 */

/**
 * @swagger
 * /users/forgotPassword:
 *   post:
 *     summary: Send password reset email
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Error sending email
 *       404:
 *         description: User Not Found
 */

/**
 * @swagger
 * /users/changeForgotPassword:
 *   post:
 *     summary: Change password after reset
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *             required:
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: User Not Found
 */

/**
 * @swagger
 * /users/addAddress:
 *   post:
 *     summary: Add an address for the user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/userAddressDto"
 *     responses:
 *       200:
 *         description: Address added successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: User Not Found
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *     UserAddress:
 *       type: object
 *       required:
 *         - addressLine1
 *         - city
 *         - state
 *         - pinCode
 *         - country
 *         - mobileNumber
 *       properties:
 *         addressLine1:
 *           type: string
 *         addressLine2:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         pinCode:
 *           type: number
 *         country:
 *           type: string
 *         mobileNumber:
 *           type: number
 */

import express from "express";
import {
  validateRegister,
  validateLogin,
  validateDeregisterInput,
  authenticateUserForDeRegister,
  validateChangePassword,
  validateForgotPassword,
  checkUserExists,
} from "../middlewares/userMiddleware.js";
import {
  handleResponse,
  compileMiddlewares,
  sanitizeRequestBody,
} from "../utils/utils.js";
import { UserService } from "../services/userService.js";
import registerSchema from "../dto/registerDto.js";
import loginSchema from "../dto/loginDto.js";
import userAddressSchema from "../dto/userAddressDto.js";
import { sendAMail } from "../utils/nodeMailer.js";

const router = express.Router();

router
  .get("/", handleResponse(UserService.getAllUsers))
  .post(
    "/register",
    sanitizeRequestBody(registerSchema),
    compileMiddlewares(validateRegister),
    handleResponse(UserService.registerUser)
  )
  .post(
    "/login",
    sanitizeRequestBody(loginSchema),
    compileMiddlewares(validateLogin),
    handleResponse(UserService.loginUser)
  )
  .delete(
    "/deregister",
    compileMiddlewares(validateDeregisterInput, authenticateUserForDeRegister),
    handleResponse(UserService.deregisterUser)
  )
  .get("/user/:id", handleResponse(UserService.getUserDetails))
  .post(
    "/changePassword",
    compileMiddlewares(checkUserExists, validateChangePassword),
    handleResponse(UserService.changePassword)
  )
  .get(
    "/whoAmI",
    compileMiddlewares(checkUserExists),
    handleResponse(UserService.whoAmI)
  )
  .post("/forgotPassword", handleResponse(sendAMail))
  .post(
    "/changeForgotPassword",
    compileMiddlewares(checkUserExists, validateForgotPassword),
    handleResponse(UserService.changePassword)
  )
  .post(
    "/addAddress",
    sanitizeRequestBody(userAddressSchema),
    compileMiddlewares(checkUserExists),
    handleResponse(UserService.addAddress)
  );

export default router;
