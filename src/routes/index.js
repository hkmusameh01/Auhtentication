const router = require("express").Router();

const {
  handleLoginFile,
  handleSignupFile,
  signup,
  login,
  handleWelcomePage,
  verifyTokenMiddleWare,
  userInfo,
} = require("../controllers");

router.get("/login", handleLoginFile); // tested

router.get("/register", handleSignupFile); // tested

router.post("/register", signup); // tested

router.post("/login", login); // tested

router.get("/hello", verifyTokenMiddleWare, handleWelcomePage);

router.get("/userInfo", verifyTokenMiddleWare, userInfo);

module.exports = router;
