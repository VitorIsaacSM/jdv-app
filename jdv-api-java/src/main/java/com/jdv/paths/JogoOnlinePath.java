package com.jdv.paths;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.jdv.Coordenada;
import com.jdv.beans.ListaJogosOnline;
import com.jdv.beans.ClasseId;

@Path("online")
@Produces("application/json")
@Consumes("application/json")
public class JogoOnlinePath {
	
	@Inject
	ListaJogosOnline lista;
	
	@POST
	@Path("search/{id}")
	@Produces("application/json")
	@Consumes("application/json")
	public Response iniciaJogo(@PathParam("id") String id, ClasseId user) {
		
		return Response.status(200).entity(lista.criaNovoJogo(id, user.id)).build();
	}
	
}
