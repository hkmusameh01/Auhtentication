const { insertPost } = require("../../database/queries");

const createPost = (req, res) => {
  const { postContent, userId } = req.body;
  insertPost(userId, postContent)
    .then((data) => res.status(201).json(data.rows[0].content))
    .catch((err) => err + "inserted err");
};

module.exports = createPost;
