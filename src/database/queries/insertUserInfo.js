const connection = require("../config/connection");

const insertUserInfo = ({ username, password, email }) => {
  return connection.query({
    text: "INSERT INTO users(username, password, email) VALUES ($1, $2, $3) RETURNING *",
    values: [username, password, email]
  })
};

module.exports = insertUserInfo;