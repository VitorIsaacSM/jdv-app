"use strict";
exports.__esModule = true;
var mapper_1 = require("./mapper");
var Jogo = /** @class */ (function () {
    function Jogo(id, playerValue, dificuldade) {
        this.estadoDoJogo = 0;
        this.numeroDeJogadas = 0;
        this.tipo = "4";
        this.jogadorTurno = false;
        this.jogadorSimbolo = false;
        this.jogo = this.getEmptyBoard();
        this.winningSquares = this.getEmptyBoard();
        this.mapper = mapper_1.MAPPER;
        this.playerId = id;
        this.dificuldade = dificuldade;
        if (playerValue == 1) {
            this.jogadorSimbolo = true;
            this.jogadorTurno = true;
            this.jogadorValue = 1;
            this.serverValue = -1;
        }
        else {
            this.jogadorTurno = false;
            this.jogadorSimbolo = false;
            this.jogadorValue = -1;
            this.serverValue = 1;
        }
    }
    Jogo.prototype.checaEstado = function (tabela, checagemSeria, numJogadas) {
        var numVezes = 0;
        // checa horizontalmente
        for (var i = 0; i < 3; i++) {
            var ultimoValor = tabela[i][0];
            for (var j = 0; j < 3; j++) {
                if (ultimoValor != 0 && ultimoValor == tabela[i][j]) {
                    ultimoValor = tabela[i][j];
                    numVezes += 1;
                }
            }
            if (numVezes == 3) {
                if (checagemSeria) {
                    this.winningSquares[i][0] = tabela[i][0];
                    this.winningSquares[i][1] = tabela[i][1];
                    this.winningSquares[i][2] = tabela[i][2];
                }
                return ultimoValor;
            }
            numVezes = 0;
        }
        // checa verticalmente
        for (var i = 0; i < 3; i++) {
            var ultimoValor = tabela[0][i];
            for (var j = 0; j < 3; j++) {
                if (ultimoValor != 0 && ultimoValor == tabela[j][i]) {
                    ultimoValor = tabela[j][i];
                    numVezes += 1;
                }
            }
            if (numVezes == 3) {
                if (checagemSeria) {
                    this.winningSquares[0][i] = tabela[0][i];
                    this.winningSquares[1][i] = tabela[1][i];
                    this.winningSquares[2][i] = tabela[2][i];
                }
                return ultimoValor;
            }
            numVezes = 0;
        }
        // checa diagonal principal
        if (tabela[0][0] != 0 && tabela[0][0] == tabela[1][1] && tabela[1][1] == tabela[2][2]) {
            if (checagemSeria) {
                this.winningSquares[0][0] = tabela[0][0];
                this.winningSquares[1][1] = tabela[1][1];
                this.winningSquares[2][2] = tabela[2][2];
            }
            return tabela[0][0];
        }
        // checa diagonal secundaria
        if (tabela[0][2] != 0 && tabela[0][2] == tabela[1][1] && tabela[1][1] == tabela[2][0]) {
            if (checagemSeria) {
                this.winningSquares[0][2] = tabela[0][2];
                this.winningSquares[1][1] = tabela[1][1];
                this.winningSquares[2][0] = tabela[2][0];
            }
            return tabela[0][2];
        }
        this.winningSquares = this.getEmptyBoard();
        if (numJogadas == 9) {
            return -99;
        }
        return 0;
    };
    Jogo.prototype.getEmptyBoard = function () {
        return [Array(3).fill(0), Array(3).fill(0), Array(3).fill(0)];
    };
    Jogo.prototype.playerJogada = function (i, j) {
        this.jogo[i][j] = this.jogadorValue;
        this.jogadorTurno = !this.jogadorTurno;
        this.numeroDeJogadas++;
        this.estadoDoJogo = this.checaEstado(this.jogo, true, this.numeroDeJogadas);
    };
    // faz o bot jogar no proximo quadrando disponivel
    Jogo.prototype.serverJogadaSimples = function () {
        if ((Math.round(Math.random()) >= 0.65)) {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (this.jogo[i][j] == 0) {
                        this.jogo[i][j] = this.serverValue;
                        this.jogadorTurno = !this.jogadorTurno;
                        this.numeroDeJogadas++;
                        this.estadoDoJogo = this.checaEstado(this.jogo, true, this.numeroDeJogadas);
                        return;
                    }
                }
            }
        }
        else {
            return this.serverJogada2();
        }
        throw new Error("Error: Jogada invalida do Bot");
    };
    // faz a melhor jogada possivel para o bot
    Jogo.prototype.serverJogada2 = function () {
        if (this.numeroDeJogadas == 3 && this.dificuldade == 2) {
            console.log('checked for the trick');
            if (this.checkForTrickOnRound3()) {
                this.jogo[0][1] = this.serverValue;
                this.jogadorTurno = !this.jogadorTurno;
                this.numeroDeJogadas++;
                return;
            }
        }
        var possibilidades = [];
        for (var i = 0; i < 9; i++) {
            if (this.jogo[this.mapper[i][0]][this.mapper[i][1]] == 0) {
                possibilidades.push(this.calculaBranch(i, this.jogo, true, this.numeroDeJogadas));
                console.log("soma da branch = " + possibilidades[i]);
            }
            else {
                possibilidades.push(null);
            }
        }
        var melhorJogadaIndex = 0;
        var maiorValorJogada = null;
        for (var i = 0; i < 9; i++) {
            var possibilidade = possibilidades[i];
            if (possibilidade != null) {
                if (maiorValorJogada == null) {
                    maiorValorJogada = possibilidade;
                    melhorJogadaIndex = i;
                }
                if (possibilidade > maiorValorJogada) {
                    maiorValorJogada = possibilidade;
                    melhorJogadaIndex = i;
                }
            }
        }
        console.log("escolhi uma opcao com o valor de" + possibilidades[melhorJogadaIndex]);
        this.jogo[this.mapper[melhorJogadaIndex][0]][this.mapper[melhorJogadaIndex][1]] = this.serverValue;
        this.jogadorTurno = !this.jogadorTurno;
        this.numeroDeJogadas++;
        this.estadoDoJogo = this.checaEstado(this.jogo, true, this.numeroDeJogadas);
        return;
    };
    Jogo.prototype.calculaBranch = function (i, fakeTabela, serverTurno, numJogadas) {
        var fakeTable = this.getEmptyBoard();
        for (var a = 0; a < 3; a++) {
            for (var b = 0; b < 3; b++) {
                fakeTable[a][b] = fakeTabela[a][b];
            }
        }
        var fakeNumjogadas = numJogadas;
        var currentBranch = this.mapper[i];
        var resultadoAtual;
        if (serverTurno) {
            fakeTable[currentBranch[0]][currentBranch[1]] = this.serverValue;
        }
        else {
            fakeTable[currentBranch[0]][currentBranch[1]] = this.jogadorValue;
        }
        fakeNumjogadas++;
        resultadoAtual = this.checaEstado(fakeTable, false, fakeNumjogadas);
        if (resultadoAtual == this.serverValue) {
            return 10 * (Math.pow((9 - fakeNumjogadas), (9 - fakeNumjogadas)));
        }
        else if (resultadoAtual == this.jogadorValue) {
            return -10 * (Math.pow((9 - fakeNumjogadas), (9 - fakeNumjogadas)));
        }
        else if (resultadoAtual == -99) {
            return 0;
        }
        else {
            var fakePossibilidades = [];
            for (var it = 0; it < 9; it++) {
                if (fakeTable[this.mapper[it][0]][this.mapper[it][1]] == 0) {
                    fakePossibilidades.push((this.calculaBranch(it, fakeTable, !serverTurno, fakeNumjogadas)));
                }
            }
            var somaDaBranch = 0;
            for (var w = 0; w < fakePossibilidades.length; w++) {
                somaDaBranch += fakePossibilidades[w];
            }
            return somaDaBranch;
        }
    };
    Jogo.prototype.checkForTrickOnRound3 = function () {
        if (this.jogo[0][0] == this.jogadorValue) {
            if (this.jogo[1][1] == this.serverValue) {
                if (this.jogo[2][2] == this.jogadorValue) {
                    return true;
                }
            }
        }
        else if (this.jogo[0][2] == this.jogadorValue) {
            if (this.jogo[1][1] == this.serverValue) {
                if (this.jogo[2][0] == this.jogadorValue) {
                    return true;
                }
            }
        }
        return false;
    };
    return Jogo;
}());
exports.Jogo = Jogo;
