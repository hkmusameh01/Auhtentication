const { deletePostQuery } = require("../database/queries");

const deletePost = (req, res) => {

  if(req.user) {
    const { postId } = req.params;
    const { userId } = req.user;
  
    deletePostQuery(postId, userId)
      .then((data) => res.status(200).send((data.rowCount).toString()))
      .catch((err) => console.log(err));
  } else {
    res.status(409).json({msg: 'you need to login first!'})
  }

};

module.exports = deletePost;
