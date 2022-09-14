const connection = require("../config/connection");

const insertPost = (userId, content) => {
  return connection.query(
    "INSERT INTO posts(user_id, content) VALUES ($1, $2) RETURNING content",
    [userId, content]
  );
};

module.exports = insertPost;
