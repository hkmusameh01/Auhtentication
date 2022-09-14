const insertUserInfo = require("./insertUserInfo");
const selectUserByEmail = require("./selectUserByEmail");
const getAllpostsQuery = require('./getAllposts')
const getPostsForSpecificUserQuery = require("./getPostsForSpecificUser");
const insertPost = require("./insertPost");
const deletePostQuery = require('./deletePost')
const updatePostQuery = require('./updatePost');
const {voteForQuery, voteAgainstQuery, getVotes, votesNumberFor, votesNumberAgainst, getSpecificPost} = require('./vote');
const getAllCommentsQuery = require('./getAllComments')
const insertCommentQuery = require('./insertComment')

module.exports = {
  insertUserInfo,
  selectUserByEmail,
  insertPost,
  getAllpostsQuery,
  getPostsForSpecificUserQuery,
  deletePostQuery,
  updatePostQuery,
  voteForQuery,
  voteAgainstQuery,
  getVotes,
  votesNumberFor,
  votesNumberAgainst,
  getSpecificPost,
  getAllCommentsQuery,
  insertCommentQuery,
};
