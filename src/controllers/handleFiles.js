const { join } = require("path");
const { verifyToken } = require("../promise");

const handleLoginFile = (req, res) => {
  res.sendFile(
    join(__dirname, "..", "..", "public", "pages", "login", "index.html")
  );
};

const handleSignupFile = (req, res) => {
  res.sendFile(
    join(__dirname, "..", "..", "public", "pages", "signup", "index.html")
  );
};

const userInfo = (req, res) => {
  const { username, userId } = req.user;
  if(!(username && userId)) {
    res.status(404).send({msg: 'User info does not exist!'})
  } else {
    res.status(200).json({username, userId});
  }
};

const handleWelcomePage = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'private', 'index.html'));
};

const verifyTokenMiddleWare = (req, res, next) => {
  const token = req.cookies.token;
  if(!token) {
    return res.status(403).redirect('/login')
  } else {
    verifyToken(token, process.env.SECRET_KEY).then(decoded => {
      req.user = {
        username: decoded.username,
        userId: decoded.id
      }
      next();
      
    }).catch(err => {
      return next(err);
    })
  }
}

module.exports = { handleLoginFile, handleSignupFile, handleWelcomePage, verifyTokenMiddleWare, userInfo };
