const { getAllpostsQuery } = require("../database/queries");

const getAllposts = (req, res) => {
  getAllpostsQuery()
    .then((data) =>
      res.status(200).send({
        posts: data.rows,
        isLogin: req.user ? true : false,
      })
    )
    .catch((err) => console.log(err));
};

module.exports = getAllposts;
