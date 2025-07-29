import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});

export default registerSchema;
