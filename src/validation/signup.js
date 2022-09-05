const Joi = require("joi");

const signupSchema = Joi.object({
  username: Joi.string().alphanum().required(),
  password: Joi.string().min(4).required(),
  email: Joi.string().email({ minDomainSegments: 2, separator: "." }),
});

module.exports = signupSchema;