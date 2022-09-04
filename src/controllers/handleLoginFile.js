const {join} = require('path');

const handleLoginFile = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'pages', 'login', 'index.html'))
}

module.exports = handleLoginFile;