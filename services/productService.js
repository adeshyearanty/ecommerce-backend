import Product from "../models/ProductModel.js";

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
  async updateProduct(body, { productId }, _req) {
    const { name, price, description, category, quantity } = body;
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      { name, price, description, category, quantity },
      { new: true }
    );
    return product;
  },
  async deleteProduct(_body, { productId }, _req) {
    const product = await Product.findOneAndDelete({ _id: productId });
    return product;
  },
  async getSingleProduct(_body, { productId }, _req) {
    const product = await Product.findOne({ _id: productId });
    return product;
  },
};

export default ProductService;
