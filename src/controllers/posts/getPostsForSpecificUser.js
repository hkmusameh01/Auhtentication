const { getPostsForSpecificUserQuery } = require("../../database/queries");

const getPostsForSpecificUser = (req, res) => {
  const { userId, username } = req.user;
  getPostsForSpecificUserQuery(userId)
    .then((data) => {
      res.status(200).send({
        contents: data.rows,
        username: username,
      });
    })
    .catch((err) => console.log(err));
};

module.exports = getPostsForSpecificUser;
