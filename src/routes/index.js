const router = require("express").Router();

const {
  handleLoginFile,
  handleSignupFile,
  signup,
  login,
  handleWelcomePage,
  verifyTokenMiddleWare,
  userInfo,
  getPostsForSpecificUser,
  createPost,
  deletePost,
  updatePost,
  vote,
  getAllposts,
  getAllCommentsForSpesificPost,
  addCommentForPost,
} = require("../controllers");

router.get("/login", handleLoginFile); // tested

router.get("/register", handleSignupFile); // tested

router.post("/register", signup); // tested

router.post("/login", login); // tested

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.end();
});

router.get("/hello", verifyTokenMiddleWare, handleWelcomePage);

router.get("/userInfo", verifyTokenMiddleWare, userInfo);

router.get("/posts", getAllposts); // tested

router.get("/post", verifyTokenMiddleWare, getPostsForSpecificUser); // tested (not sure)

router.post("/post", verifyTokenMiddleWare, createPost); // tested

router.put("/post/:postId", verifyTokenMiddleWare, updatePost); // tested

router.delete("/post/:postId", verifyTokenMiddleWare, deletePost); // tested

router.put("/vote/:postId", verifyTokenMiddleWare, vote);

router.post("/comment/:postId", verifyTokenMiddleWare, addCommentForPost);

router.get("/comments/:postId", getAllCommentsForSpesificPost);

module.exports = router;
