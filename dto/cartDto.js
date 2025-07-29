import Joi from "joi";

const CartSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().required(),
});

export default CartSchema;
