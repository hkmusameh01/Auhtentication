const connection = require("../config/connection");

const selectUserByEmail = (email) => {
  return connection.query("SELECT id, username, password FROM users WHERE email = $1", [email]);
};

module.exports = selectUserByEmail;