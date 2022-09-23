const deletePost = require('./deletePost');
const getAllposts = require('./getAllposts')
const getPostsForSpecificUser = require('./getPostsForSpecificUser')
const createPost = require('./insertPost')
const updatePost = require('./updatePost')

module.exports = {
  deletePost,
  getAllposts,
  getPostsForSpecificUser,
  createPost,
  updatePost
}