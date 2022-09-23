const {
  getAllCommentsForSpesificPostQuery,
} = require("../../database/queries");

const getAllCommentsForSpesificPost = (req, res) => {
  const { postId } = req.params;
  getAllCommentsForSpesificPostQuery(postId)
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => console.log(err));
};

module.exports = getAllCommentsForSpesificPost;
