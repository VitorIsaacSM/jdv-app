"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var idRest_1 = require("./routes/idRest");
var botRest_1 = require("./routes/botRest");
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var commonPath = '/jdv/api';
var app = express_1["default"]();
var options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "http://localhost:4200",
    preflightContinue: false
};
/* app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next()
}); */
app.use(cors_1["default"](options));
app.options('*', cors_1["default"](options));
app.use(body_parser_1["default"].json());
app.use(commonPath + '/id', idRest_1.idRouter);
app.use(commonPath + '/offline', botRest_1.botRouter);
app.listen(process.env.PORT || 8080, function () {
    console.log('Server started');
});
