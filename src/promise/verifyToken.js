const {verify} = require('jsonwebtoken')

const verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    resolve(verify(token, secretKey))
  })
}

module.exports = verifyToken;