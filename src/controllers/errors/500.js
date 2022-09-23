
const serverError = (err, req, res, next) => {
  console.log('Server Error ======> ', err);
  res.status(500).send(err);
}

module.exports = serverError;