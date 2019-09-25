"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var gameController = __importStar(require("../controllers/gameManager"));
exports.botRouter = express_1["default"].Router();
exports.botRouter.post('/start', function (req, res) {
    var user = req.body.user;
    var dificuldade = req.body.dificuldade;
    return res.json(gameController.criaNovoJogo(user.id, dificuldade));
});
exports.botRouter.post('/:id', function (req, res) {
    var coord = req.body;
    var id = req.params.id;
    console.log('Usuario de id = ' + id + ' faz jogada');
    return res.json(gameController.fazJogada(id, coord));
});
exports.botRouter["delete"]('/delete/:id', function (req, res) {
    var id = req.params.id;
    console.log('Deletando jogo do usuario com id = ' + id);
    return res.json(gameController.deletaJogoDoUsuario(id));
});
exports.botRouter.post('/bot/:id', function (req, res) {
    var id = req.params.id;
    console.log('Fazendo Jogada do Bot no jogo do usuario de id = ' + id);
    res.json(gameController.fazJogadaBot(id));
});
