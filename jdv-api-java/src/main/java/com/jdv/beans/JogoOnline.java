package com.jdv.beans;

public class JogoOnline {
	private boolean started = false;
	private int estadoDoJogo = 0;
	private int numeroDeJogadas = 0;
	private String tipo = "5";
	private String playerOneId;
	private String playerTwoId;
	private int jogadorOneValue;
	private int jogadorTwoValue;
	private boolean turno;
	private int[][] jogo = new int[3][3];
	private int[][] winningSquares = new int[3][3];
	
	public String getTipo() {
		return tipo;
	}

	public JogoOnline(String id, String id2, Integer PlayerOneValue) {
		
		playerOneId = id;
		playerTwoId = id2;
		
		if(PlayerOneValue.intValue() == 1) {
			turno = true;
			jogadorOneValue = 1;
			jogadorTwoValue = -1;	
		}
		else {
			turno = false;
			jogadorOneValue = -1;
			jogadorTwoValue = 1;
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
	
	public void AplicaJogadaDoJogador(int jogadorValue, int i, int j) {
		jogo[i][j] = jogadorValue;
		turno = !turno;
		numeroDeJogadas++;
		estadoDoJogo = checaEstado(jogo, true, numeroDeJogadas);
	}
	
	public void confirmaStart() {
		started = true;
	}
	
	public int getJogadorOneValue() {
		return jogadorOneValue;
	}
	
	public int getJogadorTwoValue() {
		return jogadorTwoValue;
	}
	
	public String getPlayerOneId() {
		return playerOneId;
	}
	
	public String getPlayerTwoId() {
		return playerTwoId;
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
	
	public boolean getStarted() {
		return started;
	}
	
}
