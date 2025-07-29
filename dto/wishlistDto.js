import Joi from "joi";

const WishlistSchema = Joi.object({
  productId: Joi.string().required(),
});

export default WishlistSchema;
