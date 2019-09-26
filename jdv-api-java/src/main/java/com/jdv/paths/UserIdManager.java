package com.jdv.paths;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.jdv.beans.ListaJogosOnline;
import com.jdv.beans.ManagerId;
import com.jdv.beans.ClasseId;

@Path("id")
public class UserIdManager {
	@Inject
	ManagerId manager;
	
	@Inject
	ListaJogosOnline listaOnline;
	
	@Path("geraId")
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	public Response geraId(ClasseId user) {
		
		return Response.status(200).entity(manager.geraId(user)).build();
	}
	
	@Path("search/{id}/{id2}")
	@GET
	@Produces("application/json")
	public Response searchId(@PathParam("id") String id, @PathParam("id2") String id2) {
		return Response.status(200).entity(manager.requestNewGame(id, id2)).build();
	}
}
