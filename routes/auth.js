const express = require("express");
const router = express.Router();
const { check } = require('express-validator')
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/',
    [
        check('email', "Email is required").isEmail(),
        check('password', "password is required").not().isEmpty()
    ],
    authController.authUser
);

router.get('/',
    auth,
    authController.userAuthenticate
);

module.exports = router; 