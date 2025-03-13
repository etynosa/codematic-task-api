const config = require('../config/config');
const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');


const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  logger.error(`${err.name}: ${err.message}`, { stack: err.stack });

  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ApiError(message, 404);
  }

  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ApiError(message, 400);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ApiError(message, 400);
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    error = new ApiError('Invalid JSON payload', 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    ...(config.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
};

module.exports = errorHandler;
