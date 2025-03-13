const User = require('../models/User');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ApiError('Email already registered', 400));
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password
  });

  // Generate token
  const token = user.getSignedJwtToken();

  // Remove password from response
  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email
  };

  return ApiResponse.success(
    res, 
    { user: userResponse, token }, 
    'User registered successfully', 
    201
  );
});

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new ApiError('Please provide email and password', 400));
  }

  // Find user by email and select password for comparison
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ApiError('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ApiError('Invalid credentials', 401));
  }

  //check if email is lower case
  if (email !== email.toLowerCase()) {
    return next(new ApiError('Email must be in lowercase', 400));
  }

  // Generate token
  const token = user.getSignedJwtToken();

  // Remove password from response
  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email
  };

  return ApiResponse.success(
    res, 
    { user: userResponse, token }, 
    'Login successful'
  );
});

/**
 * @desc    Get current logged in user
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  // req.user is set from the auth middleware
  const user = await User.findById(req.user.id);

  return ApiResponse.success(
    res, 
    { user }, 
    'User information retrieved successfully'
  );
});

//logout user
/**
 * @desc    Logout user
 * @route   GET /api/v1/auth/logout
 * @access  Private
 */
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  return ApiResponse.success(res, {}, 'User logged out successfully');
});
