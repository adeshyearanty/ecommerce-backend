import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";
import { BadRequestException } from "../utils/errorCodes.js";

const CartService = {
  async removeProductFromCart(productId, cart) {
    cart.products = cart.products.filter( //filtering the products, removing the product of productId
      (product) => product.productId.toString() !== productId
    );
    await cart.save();
    return cart;
  },
  async createCart({ productId, quantity }, _, req) {
    const userId = req.user.id;
    let [product, cart] = await Promise.all([
      Product.findById(productId),
      Cart.findOne({ userId }),
    ]);
    if (!cart) {
      //if no cart is created for the user, then create one
      cart = new Cart({ userId, products: [] });
    }
    if (quantity === 0)
      //remove product from cart if input quantity is '0'
      return CartService.removeProductFromCart(productId, cart);
    const existingProduct = cart.products.find(
      //check if the product is already in the cart
      (p) => p.productId.toString() === productId
    );
    if (existingProduct) {
      //increment the quantity if product already exists
      existingProduct.quantity += quantity;
      if (existingProduct.quantity <= 0) //if aggregated quantity is <= 0 then remove the product from the cart
        return CartService.removeProductFromCart(productId, cart);
    } else {
      //else push the product along with quantity
      if (quantity < 0) { //input quantity cannot be negative
        throw new BadRequestException("Quantity cannot by negative");
      }
      cart.products.push({ productId, quantity });
    }
    if ((existingProduct?.quantity ?? quantity) > product.quantity) {
      //if total quantity is greater than the inventory quantity, then reject
      throw new BadRequestException(
        `Not enough stock. Available quantity: ${product.quantity}`
      );
    }
    await cart.save();
    return cart;
  },
  async showCart(_body, _, req) {
    const userId = req.user.id
    let cart = await Cart.findOne({ userId })
    return cart
  }
};

export default CartService;
