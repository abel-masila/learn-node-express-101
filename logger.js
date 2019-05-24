function log(req, res, next) {
  console.log("Authenticating...");
  next();
}

module.exports = log;
