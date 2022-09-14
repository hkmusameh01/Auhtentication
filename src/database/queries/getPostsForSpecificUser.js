const connection = require('../config/connection')

const getPostsForSpecificUserQuery = (userId) => {
  return connection.query('SELECT id, content, votingnumber FROM posts WHERE user_id = $1 ORDER BY id DESC', [userId])
}

module.exports = getPostsForSpecificUserQuery;