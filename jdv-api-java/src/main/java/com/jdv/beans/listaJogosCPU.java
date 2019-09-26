package com.jdv.beans;

import java.util.ArrayList;
import java.util.Random;

import javax.ejb.Singleton;
import javax.ejb.Stateful;

import com.jdv.Coordenada;


@Singleton
public class listaJogosCPU {
	ArrayList<JogoCPU> listaCpu = new ArrayList<JogoCPU>();
	Random generator = new Random();
	
		
	public JogoCPU criaNovoJogo(String id) {
		
		Integer userSymbol = 1;
		
		if(generator.nextBoolean()) {
			userSymbol = -1;
		}
		
		JogoCPU newJogo = new JogoCPU(id, userSymbol); 
		
		listaCpu.add(newJogo);
		
		return newJogo;
	}
	
	public JogoCPU fazJogada(String id, Coordenada coord) {
		JogoCPU meuJogo;
		
		for(int i = 0; i < listaCpu.size(); i++) {
			if(listaCpu.get(i).getPlayerId().equals(id)) {
				meuJogo = listaCpu.get(i);
				meuJogo.playerJogada(coord.x, coord.y);
				return meuJogo;
			}
		}
		
		return null;
	}
	
	public JogoCPU fazJogadaBot(String id) {
		JogoCPU meuJogo;
		
		for(int i = 0; i < listaCpu.size(); i++) {
			if(listaCpu.get(i).getPlayerId().equals(id)) {
				meuJogo = listaCpu.get(i);
				meuJogo.serverJogada2();
				return meuJogo;
			}
		}
		System.out.println("retornei nulo porra");
		return null;
	}
	
	public boolean deletaJogoDoUsuario(String id) {
		for(int i = 0; i < listaCpu.size(); i++) {
			if(listaCpu.get(i).getPlayerId().equals(id)) {
				listaCpu.remove(i);
				return true;
			}
			
		}
		
		return false;
	}
}
