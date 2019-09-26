package com.jdv.paths;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.jdv.Coordenada;
import com.jdv.beans.ClasseId;
import com.jdv.beans.listaJogosCPU;

@Path("offline")
@Produces("application/json")
@Consumes("application/json")
public class JogoOfflinePath {
	
	@Inject
	listaJogosCPU lista;
	
	@POST
	@Path("start")
	@Produces("application/json")
	@Consumes("application/json")
	public Response iniciaJogo(ClasseId user) {
		
		return Response.status(200).entity(lista.criaNovoJogo(user.id)).build();
	}
	
	@POST
	@Path("{id}")
	@Produces("application/json")
	@Consumes("application/json")
	public Response fazJogada(Coordenada coord, @PathParam("id") String id) {
		
		System.out.println("x = "+ coord.x +" y = " + coord.y);
		
		return Response.status(200).entity(lista.fazJogada(id ,coord)).build();
	}
	
	@POST
	@Path("delete/{id}")
	@Produces("application/json")
	public Response fazJogada(@PathParam("id") String id) {
		
		System.out.println("DELETING GAME OF ID = " + id);
		
		return Response.status(200).entity(lista.deletaJogoDoUsuario(id)).build();
	}
	
	@POST
	@Path("bot/{id}")
	@Produces("application/json")
	public Response fazJogadaBot(@PathParam("id") String id) {
		
		System.out.println("Fazendo jogada do bot no jogo do id = " + id);
		
		return Response.status(200).entity(lista.fazJogadaBot(id)).build();
	}
	
}
