
const notFoundError = (req, res) => {
  console.log('Not Found Error ======> : ');
  res.status(404).send({msg: 'page not found, damn bro dont mess with me!'})
}

module.exports = notFoundError

