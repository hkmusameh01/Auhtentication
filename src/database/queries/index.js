const insertUserInfo = require("./insertUserInfo");
const selectUserByEmail = require("./selectUserByEmail");
const {
  voteForQuery,
  voteAgainstQuery,
  getVotes,
  votesNumberFor,
  votesNumberAgainst,
  getSpecificPost,
} = require("./vote");

const {
  deletePostQuery,
  getAllpostsQuery,
  getPostsForSpecificUserQuery,
  insertPost,
  updatePostQuery,
} = require("./posts");

const {
  getAllCommentsForSpesificPostQuery,
  addCommentForPostQuery,
} = require("./comments");

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
  getAllCommentsForSpesificPostQuery,
  addCommentForPostQuery,
};
