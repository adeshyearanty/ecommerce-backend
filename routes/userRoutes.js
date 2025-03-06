import express from "express";
import {
  validateRegister,
  validateLogin,
  validateDeregisterInput,
  authenticateUserForDeRegister,
  validateChangePassword,
} from "../middlewares/userMiddleware.js";
import { handleResponse, compileMiddlewares, sanitizeRequestBody } from "../utils/utils.js";
import { UserService } from "../services/userService.js";
import registerSchema from "../dto/registerDto.js";
import loginSchema from "../dto/loginDto.js";

const router = express.Router();

router.get("/", handleResponse(UserService.getAllUsers));
router.post(
  "/register",
  sanitizeRequestBody(registerSchema),
  compileMiddlewares(validateRegister),
  handleResponse(UserService.registerUser)
);
router.post(
  "/login",
  sanitizeRequestBody(loginSchema),
  compileMiddlewares(validateLogin),
  handleResponse(UserService.loginUser)
);
router.delete(
  "/deregister",
  compileMiddlewares(validateDeregisterInput, authenticateUserForDeRegister),
  handleResponse(UserService.deregisterUser)
);
router.get("/user/:id", handleResponse(UserService.getUserDetails));
router.post(
  "/change-password",
  compileMiddlewares(validateChangePassword),
  handleResponse(UserService.changePassword)
);
router.get('/whoAmI', handleResponse(UserService.whoAmI));

export default router;
