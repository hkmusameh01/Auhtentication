const Joi = require("joi");

const loginSchema = Joi.object({
  password: Joi.string().min(4).required(),
  email: Joi.string().email({ minDomainSegments: 2, separator: "." }),
});

module.exports = loginSchema;