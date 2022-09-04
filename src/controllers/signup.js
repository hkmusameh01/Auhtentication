const Joi = require("joi");
const bcrypt = require("bcrypt");

const { insertUserInfo } = require("../database/queries");

const schema = Joi.object({
  username: Joi.string().alphanum().required(),
  password: Joi.string()
    .min(4)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2, separator: "." }),
});

const signup = (req, res) => {
  schema
    .validateAsync(req.body)
    .then((data) => hashPassword(data.password))
    .then((hasedPassword) =>
      insertUserInfo({
        password: hasedPassword,
        email: req.body.email,
        username: req.body.username,
      })
    )
    .catch((err) => console.log("err: " + err));
};

// returned a promise contains hased password;
const hashPassword = (password) => {
  return bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(password, salt))
    .catch((err) => console.log("err: " + err));
};

module.exports = signup;
