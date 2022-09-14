const { insertCommentQuery } = require("../database/queries");

const insertComment = (req, res) => {
  if (req.user) {
    const {
      user: { userId },
      params: { postId },
      body: { comment },
    } = req;

    insertCommentQuery(userId, postId, comment)
      .then((data) => console.log(data))
      .then((data) => res.status(201).send(data.rows[0]))
      .catch((err) => console.log(err));
  } else {
    res.status(401).send({ msg: "Unauthorized User" });
  }
};

module.exports = insertComment;
