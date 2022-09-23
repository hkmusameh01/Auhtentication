const deletePostQuery = require('./deletePost')
const getAllpostsQuery = require('./getAllposts')
const getPostsForSpecificUserQuery = require('./getPostsForSpecificUser')
const insertPost = require('./insertPost')
const updatePostQuery = require('./updatePost')

module.exports = {
  deletePostQuery,
  getAllpostsQuery,
  getPostsForSpecificUserQuery,
  insertPost,
  updatePostQuery
}