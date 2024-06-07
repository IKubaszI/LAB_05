"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSchema = void 0;
var mongoose_1 = require("mongoose");
exports.DataSchema = new mongoose_1.Schema({
    temperature: { type: Number, required: true },
    pressure: { type: Number, required: true },
    humidity: { type: Number, required: true },
    readingDate: { type: Date, default: Date.now },
    deviceId: { type: Number, required: true }
});
exports.default = (0, mongoose_1.model)('Params', exports.DataSchema);
//# sourceMappingURL=data.schema.js.map