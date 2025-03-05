import Product from "../models/ProductModel.js";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/errorCodes.js";

export const validateProductInput = (body, _, _next) => {
  const { name, price, description, category, quantity } = body;
  if (!name || !price || !description || !category || !quantity) {
    throw new BadRequestException("All fields are required.");
  }
};

export const checkProductExists = async (_body, _res, _next, params) => {
  const { id } = params;
  const product = await Product.findOne({ _id: id });
  if (!product) throw new NotFoundException("Product not found.");
};
