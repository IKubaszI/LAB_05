"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDateTime = void 0;
var getCurrentDateTime = function () {
    var currentDate = new Date();
    // ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
    return currentDate.toISOString();
};
exports.getCurrentDateTime = getCurrentDateTime;
//# sourceMappingURL=date.service.js.map