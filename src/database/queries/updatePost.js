const connection = require('../config/connection')

const updatePostQuery = (updatedContent, postId) => {
  return connection.query('UPDATE posts SET content = $1 WHERE id = $2 RETURNING *', [updatedContent, postId])
}

module.exports = updatePostQuery;