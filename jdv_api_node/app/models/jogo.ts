import { MAPPER } from './mapper';
export class Jogo {
    estadoDoJogo = 0;
	numeroDeJogadas = 0;
	tipo = "4";
	jogadorTurno = false;
	jogadorSimbolo = false;
    playerId: string;
	jogadorValue: number;
	serverValue: number;
	jogo: number[][] = this.getEmptyBoard();
	winningSquares: number[][] = this.getEmptyBoard();
    mapper = MAPPER;
    
    constructor(id: string, playerValue: number) {
        this.playerId = id;
		
		if(playerValue == 1) {
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

    checaEstado(tabela: number[][], checagemSeria: boolean, numJogadas: number) {
		let numVezes = 0;
		
		// checa horizontalmente
		
		for(let i = 0; i < 3; i++) {
			
			let ultimoValor = tabela[i][0];
			
			for(let j = 0; j < 3; j++) {
				
				if(ultimoValor != 0 && ultimoValor == tabela[i][j]) {
					ultimoValor = tabela[i][j];
					numVezes += 1;
				}
			}
			
			if(numVezes == 3) {
				if(checagemSeria) {
					this.winningSquares[i][0] = tabela[i][0];
					this.winningSquares[i][1] = tabela[i][1];
					this.winningSquares[i][2] = tabela[i][2];
				}
				return ultimoValor;
			}
			
			numVezes = 0;
		}
		
		// checa verticalmente
		
		for(let i = 0; i < 3; i++) {
			
			let ultimoValor = tabela[0][i];
			
			for(let j = 0; j < 3; j++) {
				
				if(ultimoValor != 0 && ultimoValor == tabela[j][i]) {
					ultimoValor = tabela[j][i];
					numVezes += 1;
				}
			}
			
			if(numVezes == 3) {
				if(checagemSeria) {
					this.winningSquares[0][i] = tabela[0][i];
					this.winningSquares[1][i] = tabela[1][i];
					this.winningSquares[2][i] = tabela[2][i];
				}
				return ultimoValor;
			}
			
			numVezes = 0;
		}
		
		// checa diagonal principal
		
		if( tabela[0][0] != 0 && tabela[0][0] == tabela[1][1] && tabela[1][1] == tabela[2][2]) {
			if(checagemSeria) {
				this.winningSquares[0][0] = tabela[0][0];
				this.winningSquares[1][1] = tabela[1][1];
				this.winningSquares[2][2] = tabela[2][2];
			}
			return tabela[0][0];
		}
		
		// checa diagonal secundaria

		if( tabela[0][2] != 0 && tabela[0][2] == tabela[1][1] && tabela[1][1] == tabela[2][0]) {
			if(checagemSeria) {
				this.winningSquares[0][2] = tabela[0][2];
				this.winningSquares[1][1] = tabela[1][1];
				this.winningSquares[2][0] = tabela[2][0];
			}
			return tabela[0][2];
		}
		
		this.winningSquares = this.getEmptyBoard();
		
		if(numJogadas == 9) {
			return -99;
		}
		
		return 0;
		
    }
    
    private getEmptyBoard(): number[][] {
        return [Array(3).fill(0), Array(3).fill(0), Array(3).fill(0)]
    }

    public playerJogada(i: number, j: number): void {
		this.jogo[i][j] = this.jogadorValue;
		this.jogadorTurno = !this.jogadorTurno;
		this.numeroDeJogadas++;
		this.estadoDoJogo = this.checaEstado(this.jogo, true, this.numeroDeJogadas);
	}
    
    // faz o bot jogar no proximo quadrando disponivel
	public serverJogadaSimples(): void {
		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < 3; j++) {
				if(this.jogo[i][j] == 0) {
					this.jogo[i][j] = this.serverValue;
					this.jogadorTurno = !this.jogadorTurno;
					this.numeroDeJogadas++;
					this.estadoDoJogo = this.checaEstado(this.jogo, true, this.numeroDeJogadas);
					return;
				}
			}
        }
    
        throw new Error("Error: Jogada invalida do Bot")
    }

    // faz a melhor jogada possivel para o bot
    public serverJogada2(): void {
		
		if(this.numeroDeJogadas == 3) {
			if(this.checkForTrickOnRound3()){
				this.jogo[0][1] = this.serverValue;
				this.jogadorTurno = !this.jogadorTurno;
				this.numeroDeJogadas++;
				return;
			}
		}
		
		let possibilidades: number[] = []
		for(let i = 0; i < 9; i++) {
			if(this.jogo[ this.mapper[i][0] ][ this.mapper[i][1] ] == 0) {				
				possibilidades.push(this.calculaBranch(i, this.jogo, true, this.numeroDeJogadas));
                console.log("soma da branch = " + possibilidades[i])
			}
			else {
				possibilidades.push(null);
			}
		}
		
		let melhorJogadaIndex = 0;
		let maiorValorJogada: number = null;
		for(let i = 0; i < 9; i++) {
			let possibilidade: number = possibilidades[i];
			if(possibilidade != null) {
				if(maiorValorJogada == null) {
					maiorValorJogada = possibilidade;
					melhorJogadaIndex = i;
				}
				if(possibilidade > maiorValorJogada) {
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
		
	}
	
	public calculaBranch(i: number, fakeTabela: number[][], serverTurno: boolean, numJogadas: number) {
		let fakeTable = this.getEmptyBoard();
		for(let a = 0; a < 3; a++) {
			for(let b = 0; b < 3; b++) {
				fakeTable[a][b] = fakeTabela[a][b];
			}
		}
		let fakeNumjogadas = numJogadas;
		let currentBranch = this.mapper[i];
		let resultadoAtual;
		
		if(serverTurno) {
			fakeTable[currentBranch[0]][currentBranch[1]] = this.serverValue;
		}else {
			fakeTable[currentBranch[0]][currentBranch[1]] = this.jogadorValue;
		}
		fakeNumjogadas++;
		resultadoAtual = this.checaEstado(fakeTable, false, fakeNumjogadas);
		
		if(resultadoAtual == this.serverValue) {
			return 10*(Math.pow((9-fakeNumjogadas), (9-fakeNumjogadas)));
		}
		else if(resultadoAtual == this.jogadorValue) {
			return -10*(Math.pow((9-fakeNumjogadas), (9-fakeNumjogadas)));
		}
		else if(resultadoAtual == -99) {
			return 0;
		}
		else {
			let fakePossibilidades: number[] = []
			for(let it = 0; it < 9; it++) {
				if(fakeTable[ this.mapper[it][0] ][ this.mapper[it][1]] == 0) {
					fakePossibilidades.push((this.calculaBranch(it, fakeTable, !serverTurno, fakeNumjogadas)));
				}
			}
			let somaDaBranch = 0;
			for(let w = 0; w < fakePossibilidades.length; w++) {								
				somaDaBranch += fakePossibilidades[w];																			
			}
			return somaDaBranch;
		}
	}
	
	public checkForTrickOnRound3(): boolean{
		if(this.jogo[0][0] == this.jogadorValue) {
			if(this.jogo[1][1] == this.serverValue) {
				if(this.jogo[2][2] == this.jogadorValue) {
					return true;
				}
			}
		}
		else if(this.jogo[0][2] == this.jogadorValue) {
			if(this.jogo[1][1] == this.serverValue) {
				if(this.jogo[2][0] == this.jogadorValue) {
					return true;
				}
			}
		}
		return false;
	}
}
