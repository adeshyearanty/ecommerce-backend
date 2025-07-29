import Joi from "joi";

const UserAddressSchema = Joi.object({
  addressLine1: Joi.string().required(),
  addressLine2: Joi.string(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  pinCode: Joi.number().required(),
  mobileNumber: Joi.number().required(),
});

export default UserAddressSchema;
