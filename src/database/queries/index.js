const insertUserInfo = require("./insertUserInfo");
const selectUserByEmail = require("./selectUserByEmail");
const {
  addingUserVotingValue,
  getPostVotesForSpesificUserById,
  increasingVotesNumberByOne,
  decreasingVotesNumberByOne,
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
  addingUserVotingValue,
  getPostVotesForSpesificUserById,
  increasingVotesNumberByOne,
  decreasingVotesNumberByOne,
  getAllCommentsForSpesificPostQuery,
  addCommentForPostQuery,
};
