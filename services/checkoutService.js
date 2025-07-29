import CartModel from "../models/CartModel.js";
import CheckoutModel from "../models/CheckoutModel.js";

const CheckoutService = {
  async createCheckout(body, _params, req) {
    const userId = req.user.id;
    const cart = await CartModel.findOne({ userId }).populate(
      "products.productId"
    );

    if (!cart || cart.products.length === 0) {
      throw new Error("Cart is empty");
    }

    let orderTotal = 0;
    const products = cart.products.map((product) => {
      const totalPrice = product.quantity * product.productId.price;
      orderTotal += totalPrice;
      return {
        productId: product.productId,
        quantity: product.quantity,
      };
    });

    const checkoutData = {
      userId,
      email: body.email,
      name: body.name,
      address: body.address,
      products,
      orderTotal,
      paymentMethod: body.paymentMethod,
      paymentStatus: "pending"
    };

    const checkout = await CheckoutModel.create(checkoutData);
    return checkout;
  },
};

export default CheckoutService;
