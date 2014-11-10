(function (app) {
    'use strict';
    app.factory('logger', function () {
        var logger = {};
        logger.messageLog = [];
        logger.logMessage = logMessage;
        logger.clear = clear;
        return logger;

        function logMessage(parameters) {
            var logEntry = new LogEntry(parameters);
            logger.messageLog.push(logEntry);
        }

        function clear() {
            logger.messageLog = [];
        }

        function LogEntry (parameters) {
            this.message = parameters.message || '';
            this.type = parameters.type || '';
            this.caller = parameters.caller || '';
            this.time = new Date();
        }
    });
})(angular.module('HousePointsApp'));
