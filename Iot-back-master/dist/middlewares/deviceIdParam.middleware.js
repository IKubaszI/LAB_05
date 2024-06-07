"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIdParam = void 0;
var config_1 = require("../config");
var checkIdParam = function (request, response, next) {
    var id = request.params.id;
    var parsedValue = parseInt(id, 10);
    if (isNaN(parsedValue) || parsedValue >= config_1.config.supportedDevicesNum) {
        return response.status(400).send('Brak lub niepoprawny parametr ID urządzenia!');
    }
    next();
};
exports.checkIdParam = checkIdParam;
//# sourceMappingURL=deviceIdParam.middleware.js.map