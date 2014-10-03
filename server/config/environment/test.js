'use strict';
var localEnv = require('../local.env');

// Test specific configuration
// ===========================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: localEnv.mongo.testUri
    }
};
