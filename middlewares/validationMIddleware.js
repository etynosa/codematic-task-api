const { validationResult } = require('express-validator');
const ApiError = require('../utils/apiError');


exports.validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }));

    return next(new ApiError('Validation failed', 400, extractedErrors));
  };
};