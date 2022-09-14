const { getPostsForSpecificUserQuery } = require("../database/queries");

const getPostsForSpecificUser = (req, res) => {
  if(req.user) {
    const { userId, username } = req.user;
  getPostsForSpecificUserQuery(userId)
    .then((data) =>{
      res.send({
        contents: data.rows,
        username: username,
      })}
    )
    .catch((err) => console.log(err));
  } else {
    res.status(409).json({msg: 'you need to login first!'});
  }
};

module.exports = getPostsForSpecificUser;
