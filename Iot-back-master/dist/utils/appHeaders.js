"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppHeaders = /** @class */ (function () {
    function AppHeaders() {
    }
    AppHeaders.getValues = function (headers) {
        var userHeaders = {};
        for (var _i = 0, _a = this.accountHeaders; _i < _a.length; _i++) {
            var header = _a[_i];
            // @ts-ignore
            userHeaders[header.toLowerCase()] = headers[header.toLowerCase()];
        }
        return userHeaders;
    };
    AppHeaders.accountHeaders = [
        'X-Account-User-Identity',
        'X-Account-User-Uuid',
        'X-Account-User-Filtered-Groups',
        'X-Account-User-Attr-Provider',
        'X-Account-Access-Token'
    ];
    return AppHeaders;
}());
exports.default = AppHeaders;
//# sourceMappingURL=appHeaders.js.map