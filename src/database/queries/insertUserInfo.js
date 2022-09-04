const connection = require("../config/connection");

const insertUserInfo = ({ username, password, email }) => {
  return connection.query({
    text: "INSERT INTO users(username, password, email) VALUES ($1, $2, $3)",
    values: [username, password, email]
  })
};

module.exports = insertUserInfo;