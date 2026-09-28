const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(`[ERROR] ${statusCode} - ${err.message}`);

  res.status(statusCode).json({
    message: statusCode === 500 ? "Internal server error" : err.message,
  });
};

module.exports = errorHandler;
