const { handleLoginFile, handleSignupFile, handleWelcomePage, verifyTokenMiddleWare, userInfo } = require("./handleFiles");
const signup = require("./signup");
const login = require("./login");
const getAllposts = require('./getAllposts')
const getPostsForSpecificUser = require('./getPostsForSpecificUser')
const createPost = require('./insertPost')
const deletePost = require('./deletePost')
const updatePost = require('./updatePost')
const {voteFor, voteAgainst} = require('./vote')
const getAllComments = require('./getAllComments')
const insertComment = require('./insertComment')

module.exports = { handleLoginFile, handleSignupFile, handleWelcomePage, verifyTokenMiddleWare, userInfo, signup, login, getAllposts, getPostsForSpecificUser, createPost, deletePost, updatePost, voteFor, voteAgainst, insertComment, getAllComments };
