const { sign } = require("jsonwebtoken");

const generateToken = (payload, secretKey, algorithm) => {
  return new Promise((resolve, reject) => {
    resolve(sign(payload, secretKey, algorithm));
  });
};

module.exports = generateToken;
