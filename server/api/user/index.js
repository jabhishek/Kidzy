var express = require("express");
var router = express.Router();
var controller = require('./user.controller');
var auth = require('../auth/auth.service');

router.get('/me', auth.isAuthenticated(), controller.getLoggedInUser);
router.get('/', auth.hasRole('admin'), controller.index);
router.post('/', controller.createUser);
router.get('/checkUser/:username', controller.checkUser);

module.exports = router;