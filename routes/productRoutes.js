/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Product"
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden, only admins can create products
 */

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{productId}:
 *   put:
 *     summary: Update a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Product"
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       403:
 *         description: Forbidden, only admins can update products
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     summary: Delete a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       403:
 *         description: Forbidden, only admins can delete products
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - quantity
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         quantity:
 *           type: integer
 *         description:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

import express from "express";
import multer from "multer";
import ProductService from "../services/productService.js";
import { handleResponse, compileMiddlewares } from "../utils/utils.js";
import {
  validateProductInput,
  checkProductExists,
} from "../middlewares/productMiddleware.js";
import { userRoleMiddleware } from "../middlewares/userRoleMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router
  .get("/", handleResponse(ProductService.getAllProducts))
  .post(
    "/",
    userRoleMiddleware("admin"),
    compileMiddlewares(validateProductInput),
    handleResponse(ProductService.createProduct)
  )
  .get(
    "/:productId",
    compileMiddlewares(checkProductExists),
    handleResponse(ProductService.getSingleProduct)
  )
  .put(
    "/:productId",
    userRoleMiddleware("admin"),
    compileMiddlewares(checkProductExists),
    handleResponse(ProductService.updateProduct)
  )
  .delete(
    "/:productId",
    userRoleMiddleware("admin"),
    compileMiddlewares(checkProductExists),
    handleResponse(ProductService.deleteProduct)
  );

export default router;
