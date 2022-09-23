const { addCommentForPostQuery } = require("../../database/queries");

const addCommentForPost = (req, res) => {
  const {
    user: { userId },
    params: { postId },
    body: { comment },
  } = req;

  addCommentForPostQuery(userId, postId, comment)
    .then((data) =>
      res.status(201).send({ msg: "Insertion Done successfully!" })
    )
    .catch((err) => console.log(err));
};

module.exports = addCommentForPost;
