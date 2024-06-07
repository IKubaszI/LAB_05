"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var deviceIdParam_middleware_1 = require("../middlewares/deviceIdParam.middleware");
var data_service_1 = __importDefault(require("../modules/services/data.service"));
var joi_1 = __importDefault(require("joi"));
var DataController = /** @class */ (function () {
    function DataController() {
        var _this = this;
        this.path = '/api/data';
        this.router = (0, express_1.Router)();
        this.addData = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var Data, air, id, schema, validatedData, readingData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Data = new data_service_1.default;
                        air = request.body.air;
                        id = request.params.id;
                        schema = joi_1.default.object({
                            air: joi_1.default.array().items(joi_1.default.object({
                                id: joi_1.default.number().integer().positive().required(),
                                value: joi_1.default.number().positive().required()
                            })).unique(function (a, b) { return a.id === b.id; }),
                            deviceId: joi_1.default.number().integer().positive().valid(parseInt(id, 10)).required()
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, schema.validateAsync({ air: air, deviceId: parseInt(id, 10) })];
                    case 2:
                        validatedData = _a.sent();
                        readingData = {
                            temperature: validatedData.air[0].value,
                            pressure: validatedData.air[1].value,
                            humidity: validatedData.air[2].value,
                            deviceId: validatedData.deviceId
                        };
                        return [4 /*yield*/, Data.createData(readingData)];
                    case 3:
                        _a.sent();
                        response.status(200).json(readingData);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error("B\u0142\u0105d walidacji danych: " + error_1.message);
                        response.status(400).json({ error: 'Nieprawidłowe dane wejściowe.' });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getAllDeviceData = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, Data, allData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        Data = new data_service_1.default;
                        return [4 /*yield*/, Data.query(id)];
                    case 1:
                        allData = _a.sent();
                        response.status(201).json(allData);
                        return [2 /*return*/];
                }
            });
        }); };
        this.getPeriodData = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, id, num, limit, Data, allData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.params, id = _a.id, num = _a.num;
                        if (!num) {
                            limit = 1;
                        }
                        else {
                            limit = +num;
                        }
                        if (isNaN(parseInt(id, 10))) {
                            return [2 /*return*/, response.status(400).send('Brak lub niepoprawny parametr ID urządzenia!')];
                        }
                        Data = new data_service_1.default;
                        return [4 /*yield*/, Data.get(id, limit)];
                    case 1:
                        allData = _b.sent();
                        response.status(201).json(allData);
                        return [2 /*return*/];
                }
            });
        }); };
        this.getLatestReadingsFromAllDevices = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var Data, allData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Data = new data_service_1.default;
                        return [4 /*yield*/, Data.getAllNewest()];
                    case 1:
                        allData = _a.sent();
                        response.status(201).json(allData);
                        return [2 /*return*/];
                }
            });
        }); };
        this.cleanDeviceData = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, Data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        Data = new data_service_1.default;
                        return [4 /*yield*/, Data.deleteData({ deviceId: id })];
                    case 1:
                        _a.sent();
                        response.sendStatus(200);
                        return [2 /*return*/];
                }
            });
        }); };
        this.cleanAllDevices = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var Data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Data = new data_service_1.default;
                        return [4 /*yield*/, Data.deleteData({})];
                    case 1:
                        _a.sent();
                        response.sendStatus(200);
                        return [2 /*return*/];
                }
            });
        }); };
        this.initializeRoutes();
    }
    DataController.prototype.initializeRoutes = function () {
        this.router.get(this.path + "/latest", this.getLatestReadingsFromAllDevices);
        this.router.post(this.path + "/:id", deviceIdParam_middleware_1.checkIdParam, this.addData);
        this.router.get(this.path + "/:id", deviceIdParam_middleware_1.checkIdParam, this.getAllDeviceData);
        this.router.get(this.path + "/:id/latest", deviceIdParam_middleware_1.checkIdParam, this.getPeriodData);
        this.router.get(this.path + "/:id/:num", deviceIdParam_middleware_1.checkIdParam, this.getPeriodData);
        this.router.delete(this.path + "/all", this.cleanAllDevices);
        this.router.delete(this.path + "/:id", deviceIdParam_middleware_1.checkIdParam, this.cleanDeviceData);
    };
    return DataController;
}());
exports.default = DataController;
//# sourceMappingURL=data.controller.js.map