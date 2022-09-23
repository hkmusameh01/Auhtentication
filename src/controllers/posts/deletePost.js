const { deletePostQuery } = require("../../database/queries");

const deletePost = (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user;

  deletePostQuery(postId, userId)
    // .then((data) => res.status(200).send(data.rowCount.toString()))
    .then((data) => res.status(200).send(data.rows[0]))
    .catch((err) => console.log(err));
};

module.exports = deletePost;
