package com.jdv.beans;

import java.util.ArrayList;
import java.util.stream.Collectors;

import javax.ejb.Remote;
import javax.ejb.Singleton;
import javax.ejb.Stateful;
import javax.ejb.Stateless;

@Remote
@Singleton
public class ManagerId {
	ArrayList<ClasseId> listaIds = new ArrayList<ClasseId>();
	
	public ClasseId geraId(ClasseId user) {
		
		String oldId = user.id;
		String oldSession = user.session;
		String newId = oldId;
		
		if(!listaIds.isEmpty()) {
			for(int i = 0; i < listaIds.size(); i++) {
				ClasseId whatever = listaIds.get(i);
				if(whatever.session.equals(oldSession)) {
					newId = whatever.id;
				}
			}
		}
		
		if(oldId.equals(newId)) {
			user.id = Integer.toString(listaIds.size() + 1);
			listaIds.add(user);
		}
		else {
			user.id = newId;
		}
		
		System.out.println("usuario logado : Id = " + user.id + " Session = " + oldSession);
		
		return user;
	}
	
	public ClasseId requestNewGame(String requestedId, String requesterId) {
		ClasseId requestedUser = findId(requestedId);
		if(requestedUser != null && requestedUser.isLogged) {
			requestedUser.gameRequest = true;
			requestedUser.requesterId = requestedId;
			return requestedUser;
		}
		return null;
	}
	
	public void confirmLoggedStatus(String id) throws Exception {
		ClasseId user = findId(id);
		if(user != null) {
			user.isLogged = true;
			return;
		}
		throw new Exception("user not found");
	}
	
	public ClasseId findId(String id) {
		for(int i = 0; i < listaIds.size(); i++) {
			ClasseId user = listaIds.get(i);
			if(user.id == id) {
				return user;
			}
		}
		return null;
	}
	
	public boolean validaId(String id) {
		return listaIds.contains(id);
	}
	
	
}
