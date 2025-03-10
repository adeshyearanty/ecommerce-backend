/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management APIs
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CartItem"
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *       400:
 *         description: Bad request, invalid input or out of stock
 *       401:
 *         description: Unauthorized, user must be logged in
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           description: ID of the product to add to the cart
 *         quantity:
 *           type: integer
 *           description: Number of items to add
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
import {
  compileMiddlewares,
  handleResponse,
  sanitizeRequestBody,
} from "../utils/utils.js";
import { checkUserExists } from "../middlewares/userMiddleware.js";
import { checkProductExists } from "../middlewares/productMiddleware.js";
import cartService from "../services/cartService.js";
import { checkProductQuantity } from "../middlewares/cartMiddleware.js";
import CartSchema from "../dto/cartDto.js";
const router = express.Router();

router
  .post(
    "/",
    sanitizeRequestBody(CartSchema),
    compileMiddlewares(
      checkUserExists,
      checkProductExists,
      checkProductQuantity
    ),
    handleResponse(cartService.createCart)
  )
  .get("/", handleResponse(cartService.showCart));

export default router;
