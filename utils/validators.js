const { body } = require('express-validator');

exports.userValidators = {
  register: [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .trim()
      .isLength({ max: 50 })
      .withMessage('Name cannot be more than 50 characters'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  login: [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
  ]
};

exports.taskValidators = {
  create: [
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .trim()
      .isLength({ max: 100 })
      .withMessage('Title cannot be more than 100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description cannot be more than 500 characters'),
    body('dueDate')
      .notEmpty()
      .withMessage('Due date is required')
      .isISO8601()
      .withMessage('Due date must be a valid date')
      .toDate(),
    body('priority')
      .optional()
      .isIn(['Low', 'Medium', 'High'])
      .withMessage('Priority must be Low, Medium, or High'),
    body('status')
      .optional()
      .isIn(['Pending', 'Completed'])
      .withMessage('Status must be Pending or Completed')
  ],
  update: [
    body('title')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Title cannot be more than 100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description cannot be more than 500 characters'),
    body('dueDate')
      .optional()
      .isISO8601()
      .withMessage('Due date must be a valid date')
      .toDate(),
    body('priority')
      .optional()
      .isIn(['Low', 'Medium', 'High'])
      .withMessage('Priority must be Low, Medium, or High'),
    body('status')
      .optional()
      .isIn(['Pending', 'Completed'])
      .withMessage('Status must be Pending or Completed')
  ]
};