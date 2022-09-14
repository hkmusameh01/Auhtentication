const { insertPost } = require("../database/queries");

const createPost = (req, res) => {
  console.log(req.user);

  if(req.user) {
    const { postContent, userId } = req.body;
    insertPost(userId, postContent)
      .then((data) => res.status(200).json(data.rows[0].content))
      .catch((err) => err + "inserted err");
  } else {
    res.status(409).json({msg: 'you need to login first!'})
  }

};

module.exports = createPost;
