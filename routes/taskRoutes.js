const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMIddleware');
const { taskValidators } = require('../utils/validators');

router
  .route('/')
  .get(protect, getTasks)
  .post(protect, validate(taskValidators.create), createTask);

router
  .route('/:id')
  .get(protect, getTask)
  .put(protect, validate(taskValidators.update), updateTask)
  .delete(protect, deleteTask);

module.exports = router;