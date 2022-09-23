const connection = require("../../config/connection");

const addCommentForPostQuery = (userId, postId, content) => {
  return connection.query(
    `INSERT INTO comments(user_id, post_id, content) VALUES ($1,  $2, $3) returning *`,
    [userId, postId, content]
  );
};

module.exports = addCommentForPostQuery;
