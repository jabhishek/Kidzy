var express = require("express");
var router = express.Router();
var controller = require('./kid.controller');
var auth = require('../auth/auth.service');

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.hasRole("parent"), controller.addKid);
router.post('/:kidId/points', auth.hasRole("parent"), controller.addPoints);

module.exports = router;