const { notFoundError, serverError } = require("./errors");

const {
  getAllCommentsForSpesificPost,
  addCommentForPost,
} = require("./comments");

const { login, signup } = require("./authentication");

const { voteFor, voteAgainst } = require("./vote");

const {
  getAllposts,
  getPostsForSpecificUser,
  createPost,
  deletePost,
  updatePost,
} = require("./posts");

const {
  handleLoginFile,
  handleSignupFile,
  handleWelcomePage,
  verifyTokenMiddleWare,
  userInfo,
} = require("./handleFiles");

module.exports = {
  notFoundError,
  serverError,
  handleLoginFile,
  handleSignupFile,
  handleWelcomePage,
  verifyTokenMiddleWare,
  userInfo,
  signup,
  login,
  getAllposts,
  getPostsForSpecificUser,
  createPost,
  deletePost,
  updatePost,
  voteFor,
  addCommentForPost,
  getAllCommentsForSpesificPost,
};
