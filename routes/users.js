const express = require("express");
const router = express.Router();
const { check } = require('express-validator')
const userController = require('../controllers/userController');

router.post('/',
[
    check('username', 'username is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').isLength({min: 6}),
],
userController.newUser
);

module.exports = router; 