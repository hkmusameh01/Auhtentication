const { join } = require("path");

const {
  handleLoginFile,
  handleSignupFile,
  signup,
  login,
  handleWelcomePage,
  verifyTokenMiddleWare,
} = require("../controllers");

const router = require("express").Router();

router.get("/login", handleLoginFile);

router.get("/register", handleSignupFile);

router.post("/register", signup);

router.post("/login", login);

router.get('/welcome', verifyTokenMiddleWare,  handleWelcomePage)

module.exports = router;
