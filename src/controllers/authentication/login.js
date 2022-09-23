const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { loginSchema } = require("../../validation");
const { selectUserByEmail } = require("../../database/queries");
const { generateToken } = require("../../promise");

const login = (req, res) => {
  loginSchema
    .validateAsync(req.body)
    .then((data) => selectUserByEmail(data.email))
    .then((user) => {
      if (!user.rowCount) {
        res.status(404).send({ msg: "Email does not exist!" });
      } else {
        const { username, id, password } = user.rows[0];
        bcrypt
          .compare(req.body.password, password)
          .then((isPassed) => {
            if (!isPassed) {
              res.status(401).send({ msg: "Wrong Password!" });
            } else {
              generateToken({ username, id }, process.env.SECRET_KEY, {
                algorithm: "HS256",
              })
                .then((token) =>
                  res
                    .cookie("token", token)
                    .status(201)
                    .send({ msg: "Token generated successfully" })
                )
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => res.send(err));
      }
    })
  .catch((err) => res.status(404).send({ msg: "Sth goes wrong with login!" }));
  // Do I need this catch ??
};

module.exports = login;
