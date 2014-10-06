var express = require("express");
var router = express.Router();
var controller = require('./user.controller');
var auth = require('../auth/auth.service');

router.get('/', auth.isAuthenticated(), controller.index);
module.exports = router;