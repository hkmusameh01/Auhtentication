const {join} = require('path')

const handleSignupFile = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'pages', 'signup', 'index.html'))
}

module.exports = handleSignupFile;