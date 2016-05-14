"use strict";
var AppExceptionHandler = (function () {
    function AppExceptionHandler() {
    }
    AppExceptionHandler.prototype.call = function (exception, stackTrace, reason) {
        console.groupCollapsed('Whoops, something went wrong.');
        console.warn('Please run the app in development mode to debug.');
        console.error(exception);
        if (stackTrace !== undefined) {
            console.error(stackTrace);
        }
        if (reason !== undefined) {
            console.log(reason);
        }
        console.groupEnd();
    };
    return AppExceptionHandler;
}());
exports.AppExceptionHandler = AppExceptionHandler;
