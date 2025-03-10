import Wishlist from "../models/WishlistModel.js";
import { BadRequestException } from "../utils/errorCodes.js";

const WishlistService = {
  async showWishlist(_body, _, req) {
    const userId = req.user.id;
    const wishlist = Wishlist.findOne({ userId });
    return wishlist;
  },
  async addToWishlist({ productId }, _, req) {
    const userId = req.user.id;
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      //if no cart is created for the user, then create one
      wishlist = new Wishlist({ userId, products: [] });
    }
    const existingProduct = wishlist.products.includes(
      //check if the product is already in the cart
      productId
    );
    if (!existingProduct) {
      wishlist.products.push(productId);
    }
    await wishlist.save();
    return wishlist;
  },
  async removeFromWishlist({ productId }, _, req) {
    const userId = req.user.id;
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      throw new BadRequestException("User don't have a wishlist");
    }
    const existingProduct = wishlist.products.includes(productId);
    if (!existingProduct) {
      throw new BadRequestException("The product does not exist in wishlist");
    }
    wishlist.products = wishlist.products.filter((prodId) => String(prodId) !== String(productId));
    await wishlist.save();
    return wishlist;
  },
};

export default WishlistService;
