package com.jdv.beans;

import java.util.ArrayList;
import java.util.Random;

import javax.ejb.Stateful;
import javax.inject.Inject;
import javax.print.attribute.standard.NumberOfDocuments;


public class JogoCPU {
	
	private int estadoDoJogo = 0;
	private int numeroDeJogadas = 0;
	private String tipo = "4";
	private boolean JogadorTurno = false;
	private boolean JogadorSimbolo = false;
	private String playerId;
	private int jogadorValue;
	private int serverValue;
	private int[][] jogo = new int[3][3];
	private int[][] winningSquares = new int[3][3];
	private int[][] mapper = {{0,0},{0,1},{0,2},{1,0},{1,1},{1,2},{2,0},{2,1},{2,2}};
	
	public String getTipo() {
		return tipo;
	}

	public boolean isJogadorTurno() {
		return JogadorTurno;
	}

	public boolean isJogadorSimbolo() {
		return JogadorSimbolo;
	}

	public JogoCPU(String id, Integer PlayerValue) {
		
		playerId = id;
		
		
		if(PlayerValue.intValue() == 1) {
			JogadorSimbolo = true;
			JogadorTurno = true;
			jogadorValue = 1;
			serverValue = -1;	
		}
		else {
			JogadorTurno = false;
			JogadorSimbolo = false;
			jogadorValue = -1;
			serverValue = 1;
		}
		
		
	}
		
	public int checaEstado(int[][] tabela, boolean checagemSeria, int numJogadas) {
		int numVezes = 0;
		
		// checa horizontalmente
		
		for(int i = 0; i < 3; i++) {
			
			int ultimoValor = tabela[i][0];
			
			for(int j = 0; j < 3; j++) {
				
				if(ultimoValor != 0 && ultimoValor == tabela[i][j]) {
					ultimoValor = tabela[i][j];
					numVezes += 1;
				}
			}
			
			if(numVezes == 3) {
				if(checagemSeria) {
					winningSquares[i][0] = tabela[i][0];
					winningSquares[i][1] = tabela[i][1];
					winningSquares[i][2] = tabela[i][2];
				}
				return ultimoValor;
			}
			
			numVezes = 0;
		}
		
		// checa verticalmente
		
		for(int i = 0; i < 3; i++) {
			
			int ultimoValor = tabela[0][i];
			
			for(int j = 0; j < 3; j++) {
				
				if(ultimoValor != 0 && ultimoValor == tabela[j][i]) {
					ultimoValor = tabela[j][i];
					numVezes += 1;
				}
			}
			
			if(numVezes == 3) {
				if(checagemSeria) {
					winningSquares[0][i] = tabela[0][i];
					winningSquares[1][i] = tabela[1][i];
					winningSquares[2][i] = tabela[2][i];
				}
				return ultimoValor;
			}
			
			numVezes = 0;
		}
		
		// checa diagonal principal
		
		if( tabela[0][0] != 0 && tabela[0][0] == tabela[1][1] && tabela[1][1] == tabela[2][2]) {
			if(checagemSeria) {
				winningSquares[0][0] = tabela[0][0];
				winningSquares[1][1] = tabela[1][1];
				winningSquares[2][2] = tabela[2][2];
			}
			return tabela[0][0];
		}
		
		// checa diagonal secundaria

		if( tabela[0][2] != 0 && tabela[0][2] == tabela[1][1] && tabela[1][1] == tabela[2][0]) {
			if(checagemSeria) {
				winningSquares[0][2] = tabela[0][2];
				winningSquares[1][1] = tabela[1][1];
				winningSquares[2][0] = tabela[2][0];
			}
			return tabela[0][2];
		}
		
		winningSquares = new int [3][3];
		
		if(numJogadas == 9) {
			return -99;
		}
		
		return 0;
		
	}
	
	public void playerJogada(int i, int j) {
		jogo[i][j] = jogadorValue;
		JogadorTurno = !JogadorTurno;
		numeroDeJogadas++;
		estadoDoJogo = checaEstado(jogo, true, numeroDeJogadas);
	}
	
	public void serverJogada(){
		for(int i = 0; i < 3; i++) {
			for(int j = 0; j < 3; j++) {
				if(jogo[i][j] == 0) {
					jogo[i][j] = serverValue;
					JogadorTurno = !JogadorTurno;
					numeroDeJogadas++;
					estadoDoJogo = checaEstado(jogo, true, numeroDeJogadas);
					return;
				}
			}
		}
		System.out.println("retornei errado");
		return;
	}
	
	public void serverJogada2() {
		
		if(numeroDeJogadas == 3) {
			if(checkForTrickOnRound3()){
				jogo[0][1] = serverValue;
				JogadorTurno = !JogadorTurno;
				numeroDeJogadas++;
				return;
			}
		}
		
		ArrayList<Double> possibilidades = new ArrayList<Double>();
		for(int i = 0; i < 9; i++) {
			if(jogo[ mapper[i][0] ][ mapper[i][1] ] == 0) {				
				possibilidades.add(new Double(calculaBranch(i, jogo, true, numeroDeJogadas)));
				System.out.println("soma da branch = " + possibilidades.get(i)); 
			}
			else {
				possibilidades.add(null);
			}
		}
		
		int melhorJogadaIndex = 0;
		Double maiorValorJogada = null;
		for(int i = 0; i < 9; i++) {
			Double possibilidade = possibilidades.get(i);
			if(possibilidade != null) {
				if(maiorValorJogada == null) {
					maiorValorJogada = possibilidade.doubleValue();
					melhorJogadaIndex = i;
				}
				if(possibilidade.intValue() > maiorValorJogada.intValue()) {
					maiorValorJogada = possibilidade;
					melhorJogadaIndex = i;
				}
			}
		}
		
		System.out.println("escolhi um opcao com o valor de " + possibilidades.get(melhorJogadaIndex));
		jogo[mapper[melhorJogadaIndex][0]][mapper[melhorJogadaIndex][1]] = serverValue;
		JogadorTurno = !JogadorTurno;
		numeroDeJogadas++;
		estadoDoJogo = checaEstado(jogo, true, numeroDeJogadas);
		return;
		
	}
	
	public double calculaBranch(Integer i, int[][] fakeTabela, boolean serverTurno, int numJogadas) {
		int[][] fakeTable = new int[3][3];
		for(int a = 0; a < 3; a++) {
			for(int b = 0; b < 3; b++) {
				fakeTable[a][b] = fakeTabela[a][b];
			}
		}
		int fakeNumjogadas = numJogadas;
		int[] currentBranch = mapper[i];
		int resultadoAtual;
		
		if(serverTurno) {
			fakeTable[currentBranch[0]][currentBranch[1]] = serverValue;
		}else {
			fakeTable[currentBranch[0]][currentBranch[1]] = jogadorValue;
		}
		fakeNumjogadas++;
		resultadoAtual = checaEstado(fakeTable, false, fakeNumjogadas);
		
		if(resultadoAtual == serverValue) {
			return 10*(Math.pow((9-fakeNumjogadas), (9-fakeNumjogadas)));
		}
		else if(resultadoAtual == jogadorValue) {
			return -10*(Math.pow((9-fakeNumjogadas), (9-fakeNumjogadas)));
		}
		else if(resultadoAtual == -99) {
			return 0;
		}
		else {
			ArrayList<Double> fakePossibilidades = new ArrayList<Double>();
			for(int it = 0; it < 9; it++) {
				if(fakeTable[ mapper[it][0] ][ mapper[it][1]] == 0) {
					fakePossibilidades.add(new Double(calculaBranch(it, fakeTable, !serverTurno, fakeNumjogadas)));
				}
			}


			int somaDaBranch = 0;
			for(int w = 0; w < fakePossibilidades.size(); w++) {								
				somaDaBranch += (fakePossibilidades.get(w).doubleValue());																			
			}
			return somaDaBranch;
//			int mapperIterator = 0;
//			int score = -20;
//			for(int x = 0; x < 3; x++) {
//				for(int y = 0; y < 3; y++) {
//					if(fakeTable[x][y] == 0) {
//						int blob = calculaBranch(mapperIterator, fakeTable, !serverTurno, fakeNumjogadas);
//						if(blob > score) {
//							score = blob;
//						}
//					}
//					mapperIterator++;
//				}
//			}
//			return (serverTurno) ? -score : -score;
		}
		
	}
	
	public boolean checkForTrickOnRound3(){
		if(jogo[0][0] == jogadorValue) {
			if(jogo[1][1] == serverValue) {
				if(jogo[2][2] == jogadorValue) {
					return true;
				}
			}
		}
		else if(jogo[0][2] == jogadorValue) {
			if(jogo[1][1] == serverValue) {
				if(jogo[2][0] == jogadorValue) {
					return true;
				}
			}
		}
		return false;
	}
	
	public String getPlayerId() {
		return playerId;
	}
	
	public int getJogadorValue() {
		return jogadorValue;
	}
	public int getServerValue() {
		return serverValue;
	}
	
	public int[][] getWinningSquares() {
		return winningSquares;
	}
	
	public int[][] getJogo() {
		return jogo;
	}
	
	public int getEstadoDoJogo() {
		return estadoDoJogo;
	}
	
}
