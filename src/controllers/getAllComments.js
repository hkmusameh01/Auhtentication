const { getAllCommentsQuery } = require("../database/queries");

const getAllComments = (req, res) => {
  const {postId} = req.params;
  getAllCommentsQuery(postId)
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => console.log(err));
};

module.exports = getAllComments;
