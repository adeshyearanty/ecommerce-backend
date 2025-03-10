/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management APIs
 */

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get user's wishlist
 *     tags: [Wishlist]
 *     responses:
 *       200:
 *         description: Successfully retrieved wishlist
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /wishlist:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Wishlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/WishlistItem"
 *     responses:
 *       201:
 *         description: Product added to wishlist
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: User or product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /wishlist:
 *   delete:
 *     summary: Remove product from wishlist
 *     tags: [Wishlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/WishlistItem"
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User or product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WishlistItem:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 *       properties:
 *         userId:
 *           type: string
 *           description: ID of the user
 *         productId:
 *           type: string
 *           description: ID of the product
 */

import express from "express";
import {
  compileMiddlewares,
  handleResponse,
  sanitizeRequestBody,
} from "../utils/utils.js";
import WishlistService from "../services/wishlistService.js";
import WishlistSchema from "../dto/wishlistDto.js";
import { checkUserExists } from "../middlewares/userMiddleware.js";
import { checkProductExists } from "../middlewares/productMiddleware.js";

const router = express.Router();

router
  .get("/", handleResponse(WishlistService.showWishlist))
  .post(
    "/",
    sanitizeRequestBody(WishlistSchema),
    compileMiddlewares(checkUserExists, checkProductExists),
    handleResponse(WishlistService.addToWishlist)
  )
  .delete(
    "/",
    compileMiddlewares(checkUserExists, checkProductExists),
    handleResponse(WishlistService.removeFromWishlist)
  );

export default router;
