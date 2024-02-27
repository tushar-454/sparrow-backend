const globalError = (err, _req, res, _next) => {
  const error = err.message ?? 'Server Internal Error';
  const status = err.status ?? 500;
  res.status(status).json({ message: error });
};

module.exports = globalError;
