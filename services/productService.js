import Product from "../models/ProductModel.js";
import {
  NotFoundException,
} from "../utils/errorCodes.js";

const ProductService = {
  async getAllProducts() {
    const products = await Product.find();
    return products;
  },
  async createProduct(body, _, _req) {
    const { name, price, description, category, quantity } = body;
    const product = await Product.create({
      name,
      price,
      description,
      category,
      quantity,
    });
    return product;
  },
  async updateProduct(body, { id }, _req) {
    const { name, price, description, category, quantity } = body;
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { name, price, description, category, quantity },
      { new: true }
    );
    return product;
  },
  async deleteProduct(_body, { id }, _req) {
    const product = await Product.findOneAndDelete({ _id: id });
    return product;
  },
  async getSingleProduct(_body, { id }, _req) {
    const product = await Product.findOne({ _id: id });
    if (!product) throw new NotFoundException("Product not found.");
    return product;
  },
};

export default ProductService;
