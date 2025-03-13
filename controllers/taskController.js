const Task = require('../models/Task');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Create a new task
 * @route   POST /api/v1/tasks
 * @access  Private
 */
exports.createTask = asyncHandler(async (req, res, next) => {
  // Add user id to request body
  req.body.user = req.user.id;

  //validate inputs
  if (!req.body.title || !req.body.dueDate || !req.body.priority) {
    return next(new ApiError('Title, due date and priority are required', 400));
  }

  
  const task = await Task.create(req.body);
  
  return ApiResponse.success(res, { task }, 'Task created successfully', 201);
});

/**
 * @desc    Get all tasks for logged in user
 * @route   GET /api/v1/tasks
 * @access  Private
 */
exports.getTasks = asyncHandler(async (req, res, next) => {
  // Filtering
  const filterOptions = { user: req.user.id };
  
  // Add optional filters
  if (req.query.status) {
    filterOptions.status = req.query.status;
  }
  if (req.query.priority) {
    filterOptions.priority = req.query.priority;
  }
  
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Task.countDocuments(filterOptions);
  
  // Find tasks with filtering and pagination
  const tasks = await Task.find(filterOptions)
    .sort({ dueDate: 1, createdAt: -1 })
    .skip(startIndex)
    .limit(limit);
  
  // Pagination results
  const pagination = {
    total,
    page,
    limit,
    pages: Math.ceil(total / limit)
  };
  
  // Add next/prev page info if available
  if (endIndex < total) {
    pagination.next = page + 1;
  }
  if (startIndex > 0) {
    pagination.prev = page - 1;
  }
  
  return ApiResponse.success(
    res, 
    { tasks, count: tasks.length }, 
    'Tasks retrieved successfully',
    200,
    pagination
  );
});

/**
 * @desc    Get a single task
 * @route   GET /api/v1/tasks/:id
 * @access  Private
 */
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  
  if (!task) {
    return next(new ApiError(`Task not found with id ${req.params.id}`, 404));
  }
  
  // Check if task belongs to user
  if (task.user.toString() !== req.user.id) {
    return next(new ApiError('Not authorized to access this task', 403));
  }
  
  return ApiResponse.success(res, { task }, 'Task retrieved successfully');
});

/**
 * @desc    Update a task
 * @route   PUT /api/v1/tasks/:id
 * @access  Private
 */
exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);
  
  if (!task) {
    return next(new ApiError(`Task not found with id ${req.params.id}`, 404));
  }
  
  // Check if task belongs to user
  if (task.user.toString() !== req.user.id) {
    return next(new ApiError('Not authorized to update this task', 403));
  }
  
  // Update task
  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  return ApiResponse.success(res, { task }, 'Task updated successfully');
});

/**
 * @desc    Delete a task
 * @route   DELETE /api/v1/tasks/:id
 * @access  Private
 */
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  
  if (!task) {
    return next(new ApiError(`Task not found with id ${req.params.id}`, 404));
  }
  
  // Check if task belongs to user
  if (task.user.toString() !== req.user.id) {
    return next(new ApiError('Not authorized to delete this task', 403));
  }

  //

  //check if task title already exists for user
  const taskExists = await Task.findOne
  ({ title: req.body.title, user: req.user.id, _id: { $ne: req.params.id } });
  if (taskExists) {
    return next(new ApiError('Task with this title already exists', 400));
  }
  
  await task.remove();
  
  return ApiResponse.success(res, {}, 'Task deleted successfully');
});