package com.jdv.beans;

import java.util.ArrayList;
import java.util.Random;

import javax.ejb.Singleton;

import com.jdv.Coordenada;

@Singleton
public class ListaJogosOnline {
	ArrayList<JogoOnline> lista = new ArrayList<JogoOnline>();
	Random generator = new Random();
			
	public JogoOnline criaNovoJogo(String id1, String id2) {
		
		Integer PlayerOneSymbol = 1;
		
		if(generator.nextBoolean()) {
			PlayerOneSymbol = -1;
		}
		
		JogoOnline newJogo = new JogoOnline(id1, id2, PlayerOneSymbol); 
		
		lista.add(newJogo);
		
		return newJogo;
	}
	
	public JogoOnline fazJogada(String id, Coordenada coord) {
		JogoOnline meuJogo;
		
		for(int i = 0; i < lista.size(); i++) {
			if(lista.get(i).getPlayerOneId().equals(id)) {
				meuJogo = lista.get(i);
				meuJogo.AplicaJogadaDoJogador(meuJogo.getJogadorOneValue(), coord.x, coord.y);
				return meuJogo;
			}
			else if(lista.get(i).getPlayerTwoId().equals(id)) {
				meuJogo = lista.get(i);
				meuJogo.AplicaJogadaDoJogador(meuJogo.getJogadorTwoValue(), coord.x, coord.y);
				return meuJogo;
			}
		}
		
		return null;
	}
	
	public boolean deletaJogoDoUsuario(String id) {
		for(int i = 0; i < lista.size(); i++) {
			if(lista.get(i).getPlayerOneId().equals(id)) {
				lista.remove(i);
				return true;
			}
			else if(lista.get(i).getPlayerTwoId().equals(id)) {
				lista.remove(i);
				return true;
			}
		}
		
		return false;
	}
}
