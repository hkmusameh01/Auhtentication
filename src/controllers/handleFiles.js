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

const handleWelcomePage = (req, res) => {
  res.sendFile(join(__dirname, "..", "..", "private", "index.html"));
};

const verifyTokenMiddleWare = (req, res, next) => {
  const token = req.cookies.token;
  if(!token) {
    return res.status(403).redirect('/login')
  } else {
    verifyToken(token, process.env.SECRET_KEY).then(decoded => {
      res.cookie('username', decoded.username);
      res.cookie('userId', decoded.id);
    })
    next();
  }
}

module.exports = { handleLoginFile, handleSignupFile, handleWelcomePage, verifyTokenMiddleWare };
