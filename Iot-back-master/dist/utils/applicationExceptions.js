"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationErrors = exports.ErrorCodes = exports.ApplicationException = void 0;
var ApplicationException = /** @class */ (function () {
    function ApplicationException(error, message) {
        this.error = error;
        this.message = message;
    }
    return ApplicationException;
}());
exports.ApplicationException = ApplicationException;
var ErrorCodes = {
    BAD_REQUEST: { message: 'BAD_REQUEST', code: 400 },
    NOT_FOUND: { message: 'NOT_FOUND', code: 404 },
    FORBIDDEN: { message: 'FORBIDDEN', code: 403 },
    UNAUTHORIZED: { message: 'UNAUTHORIZED', code: 401 },
    VALIDATION_FAILURE: { message: 'VALIDATION_FAILURE', code: 406 },
    METHOD_NOT_ALLOWED: { message: 'METHOD_NOT_ALLOWED', code: 405 },
    PRECONDITION_FAILED: { message: 'PRECONDITION_FAILED', code: 412 },
    CONFLICT: { message: 'CONFLICT', code: 409 },
};
exports.ErrorCodes = ErrorCodes;
var ApplicationErrors = {
    is: function (error, errorCode) {
        return error instanceof ApplicationException && (errorCode === undefined || error.error === errorCode);
    },
    new: function (code, message) {
        return new ApplicationException(code.toString(), message);
    },
    errorHandler: function (error, response) {
        if (error instanceof ApplicationException) {
            // @ts-ignore
            response.status(parseInt(error.error)).send(error.message || error.error.message);
        }
        else {
            // @ts-ignore
            console.error(error && error.stack || error);
            response.sendStatus(500);
        }
    }
};
exports.ApplicationErrors = ApplicationErrors;
//# sourceMappingURL=applicationExceptions.js.map