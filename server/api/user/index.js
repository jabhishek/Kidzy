var express = require("express");
var router = express.Router();
var controller = require('./user.controller');
var auth = require('../auth/auth.service');

router.get('/me', auth.isAuthenticated(), controller.getLoggedInUser);
router.get('/', auth.hasRole('admin'), controller.index);

module.exports = router;