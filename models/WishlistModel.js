import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WishlistSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default mongoose.model("Wishlist", WishlistSchema);
