const logger = (req, res, next) => {
  const log = {
    path: req.url,
    method: req.method,
    status: res.statusCode,
  };
  console.log(log);
  next();
};
module.exports = logger;
