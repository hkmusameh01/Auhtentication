const bcrypt = require("bcrypt");

const { insertUserInfo, selectUserByEmail } = require("../../database/queries");
const { signupSchema } = require("../../validation");
const { generateToken } = require("../../promise");

const signup = (req, res) => {
  const { password } = req.body;
  signupSchema
    .validateAsync(req.body)
    .then((data) => selectUserByEmail(data.email))
    .then((user) => {
      if (user.rowCount) {
        res.status(409).send({ msg: "Email already exist!" });
      } else {
        bcrypt.hash(password, 10).then((hasedPassword) =>
          insertUserInfo({
            password: hasedPassword,
            email: req.body.email,
            username: req.body.username,
          }).then((data) => {
            const { username, id } = data.rows[0];
            generateToken({ username, id }, process.env.SECRET_KEY, {
              algorithm: "HS256",
            }).then((token) => {
              res
                .cookie("token", token)
                .status(201)
                .send({ msg: "User Created successfully" });
            });
          })
        );
      }
    })
    .catch((err) => {
      res.send({ msg: "Something goes wrong with signup" });
    });
};

module.exports = signup;
