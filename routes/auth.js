const express = require('express');
const router = express.Router();
//importing the controllers_functions
const {
 register,
 login
} = require('../controllers/auth');

//creating the main routes regarding authentication
router.post('/register', register);
router.post('/login', login);

//exporting the routes
module.exports = router;