import express from "express";
import { handleResponse, sanitizeRequestBody } from "../utils/utils.js";
import CheckoutSchema from "../dto/checkoutDto.js";
import CheckoutService from "../services/checkoutService.js";

const router = express.Router();

router.post(
  "/",
  // sanitizeRequestBody(CheckoutSchema),
  handleResponse(CheckoutService.createCheckout)
);

export default router;
