'use strict';
var localEnv = require('../local.env');

// Production specific configuration
// =================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: process.env.MONGOLAB_URI
    },

    secrets: {
        session: process.env.SESSION_SECRET
    }
};