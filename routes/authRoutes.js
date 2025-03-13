const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMIddleware');
const { userValidators } = require('../utils/validators');

router.post('/register', validate(userValidators.register), register);
router.post('/login', validate(userValidators.login), login);
router.get('/me', protect, getMe);

module.exports = router;