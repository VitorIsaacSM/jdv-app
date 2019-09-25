"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var gameController = __importStar(require("../controllers/idManager"));
var express_1 = __importDefault(require("express"));
exports.idRouter = express_1["default"].Router();
exports.idRouter.post('/geraId', function (req, res) {
    var user = req.body;
    res.json(gameController.geraId(user));
});
