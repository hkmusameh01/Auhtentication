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
  voteFor,
  voteAgainst,
  getAllposts,
  getAllComments,
  insertComment,
} = require("../controllers");

router.get("/login", handleLoginFile); // tested

router.get("/register", handleSignupFile); // tested

router.post("/register", signup); // tested

router.post("/login", login); // tested

router.get("/hello", verifyTokenMiddleWare, handleWelcomePage);

router.get("/userInfo", verifyTokenMiddleWare, userInfo);

router.get('/posts', verifyTokenMiddleWare, getAllposts) //done

router.get('/post', verifyTokenMiddleWare, getPostsForSpecificUser)

router.post('/post', verifyTokenMiddleWare, createPost) // done

router.delete('/post/:postId', verifyTokenMiddleWare, deletePost)

router.put('/post/:postId', verifyTokenMiddleWare, updatePost)

router.put('/voteFor/:postId', verifyTokenMiddleWare, voteFor)

router.put('/voteAgainst/:postId', verifyTokenMiddleWare, voteAgainst)

router.get('/comments/:postId', getAllComments);

router.post('/comment/:postId', verifyTokenMiddleWare, insertComment)

module.exports = router;
