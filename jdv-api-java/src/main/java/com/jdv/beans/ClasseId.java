package com.jdv.beans;

public class ClasseId {
	public String id;
	public String session;
	public boolean isLogged;
	public boolean gameRequest;
	public String requesterId;
	
	public ClasseId() {
		isLogged = false;
		gameRequest = false;
		requesterId = null;
	}
}
