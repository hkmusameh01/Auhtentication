const connection = require("../config/connection");

const getAllCommentsQuery = (postId) => {
  return connection.query(
    `SELECT users.username, comments.content, comments.id FROM users JOIN comments ON comments.post_id = $1 AND users.id = comments.user_id`, [postId]
  );
};

module.exports = getAllCommentsQuery;