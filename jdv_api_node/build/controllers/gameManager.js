"use strict";
exports.__esModule = true;
var jogo_1 = require("./../models/jogo");
var listaJogos = [];
exports.criaNovoJogo = function (id, dificuldade) {
    var userSymbol = 1;
    if (getRandomBoolean()) {
        userSymbol = -1;
    }
    var newJogo = new jogo_1.Jogo(id, userSymbol, dificuldade);
    listaJogos.push(newJogo);
    return newJogo;
};
exports.fazJogada = function (id, coord) {
    var meuJogo;
    for (var i = 0; i < listaJogos.length; i++) {
        if (listaJogos[i].playerId == id) {
            meuJogo = listaJogos[i];
            meuJogo.playerJogada(coord.x, coord.y);
            return meuJogo;
        }
    }
    throw new Error("Não achei um jogo pra este id");
};
exports.fazJogadaBot = function (id) {
    var meuJogo;
    for (var i = 0; i < listaJogos.length; i++) {
        if (listaJogos[i].playerId == id) {
            meuJogo = listaJogos[i];
            if (meuJogo.dificuldade == 0) {
                meuJogo.serverJogadaSimples();
            }
            else {
                meuJogo.serverJogada2();
            }
            return meuJogo;
        }
    }
    throw new Error("Não achei um jogo pra este id");
};
exports.deletaJogoDoUsuario = function (id) {
    var jogo = getJogoById(id);
    if (!!jogo) {
        listaJogos = listaJogos.filter(function (j) { return j != jogo; });
        console.log(listaJogos);
        return true;
    }
    return false;
};
function getRandomBoolean() {
    return (Math.round(Math.random()) >= 0.5);
}
function getJogoById(id) {
    return listaJogos.find(function (jogo) { return jogo.playerId == id; });
}
