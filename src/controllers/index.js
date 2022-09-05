const { handleLoginFile, handleSignupFile, handleWelcomePage, verifyTokenMiddleWare } = require("./handleFiles");
const signup = require("./signup");
const login = require("./login");

module.exports = { handleLoginFile, handleSignupFile, handleWelcomePage, verifyTokenMiddleWare, signup, login };
