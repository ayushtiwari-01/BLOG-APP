const express = require('express');
const router = express.Router();
const { getAllUsers, registerController, loginController } = require('../controllers/userController');


router.get('/all-users',getAllUsers);
router.post('/register',registerController);
router.post('/login',loginController);

module.exports = router;