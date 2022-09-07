const { handleLoginFile, handleSignupFile, handleWelcomePage, verifyTokenMiddleWare, userInfo } = require("./handleFiles");
const signup = require("./signup");
const login = require("./login");

module.exports = { handleLoginFile, handleSignupFile, handleWelcomePage, verifyTokenMiddleWare, userInfo, signup, login };
