const express = require('express');

//controller functions

const {loginUser, signupUser} = require('../controllers/userController');

const Router = express.Router();

//login route

Router.post('/login', loginUser);


//signup route

Router.post('/signup', signupUser);

module.exports = Router;