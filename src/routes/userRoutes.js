const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

//test command: http://localhost:3000/users/register
router.post('/register', userControllers.registerUser);

//test command: 
router.post('/login', userControllers.loginUser);
//test command in postman: http://localhost:3000/users/yushi
router.post('/:username', userControllers.UpdateUserProfile);

module.exports = router;