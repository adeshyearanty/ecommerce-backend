import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CartSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

export default mongoose.model("Cart", CartSchema);
