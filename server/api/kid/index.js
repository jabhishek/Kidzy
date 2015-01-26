var express = require("express");
var router = express.Router();
var controller = require('./kid.controller');
var auth = require('../auth/auth.service');

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.addKid);

module.exports = router;