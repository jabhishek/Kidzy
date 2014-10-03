'use strict';

var path = require('path');
var _ = require('lodash');
var localEnv = require('../local.env');

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

   // Secret for session
  secrets: {
    session: localEnv.SESSION_SECRET
  },

  // List of user roles
  userRoles: ['parent', 'child', 'admin']
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

