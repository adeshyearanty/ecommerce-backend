import Joi from "joi";

const CheckoutSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  name: Joi.string().required(),
  address: Joi.object({
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string().optional().allow(""),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    pinCode: Joi.number().integer().required(),
    mobileNumber: Joi.number().integer().required(),
  }).required(),
  orderTotal: Joi.number().required(),
  paymentMethod: Joi.string().valid("cash", "card", "online").required(),
  paymentStatus: Joi.string()
    .valid("pending", "paid", "failed")
    .optional()
    .default("pending"),
});

export default CheckoutSchema;
