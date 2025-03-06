import express from "express";
import { compileMiddlewares, handleResponse } from "../utils/utils.js";
import { checkUserExists } from "../middlewares/userMiddleware.js";
import { checkProductExists } from "../middlewares/productMiddleware.js";
import cartService from "../services/cartService.js";
import { checkProductQuantity } from "../middlewares/cartMiddleware.js";
const router = express.Router();

router.post(
  "/",
  compileMiddlewares(checkUserExists, checkProductExists, checkProductQuantity),
  handleResponse(cartService.createCart)
);

export default router;
