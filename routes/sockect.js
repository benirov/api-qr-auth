const express = require("express");
const router = express.Router();
const { check } = require('express-validator')
const sockectController = require('../controllers/sockectController');
const auth = require('../middleware/auth');

router.get('/:id',
[
    check('id', 'Id is required').not().isEmpty(),
],
sockectController.sigInPermision
);

router.post('/',
auth,
sockectController.loginInPermision
);


module.exports = router; 