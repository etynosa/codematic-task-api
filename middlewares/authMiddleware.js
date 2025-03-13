const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const config = require('../config/config');
const ApiError = require('../utils/apiError');


exports.protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ApiError('Not authorized to access this route', 401));
  }

  try {
    const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ApiError('User with this token no longer exists', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError('Not authorized to access this route', 401));
  }
};
