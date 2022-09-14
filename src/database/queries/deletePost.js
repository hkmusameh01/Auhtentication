const connection = require("../config/connection");

const deletePostQuery = (postId, userId) => {
  return connection.query(
    "DELETE FROM posts WHERE id = $1 AND user_id = $2",
    [postId, userId]
  );
};

module.exports = deletePostQuery;
