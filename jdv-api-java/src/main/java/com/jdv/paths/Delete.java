package com.jdv.paths;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

@Path("delete")
public class Delete {
	@POST
	@Path("{id}")
	@Produces("application/json")
	public Response fazJogada(@PathParam("id") String id) {
		
		System.out.println("DELETING GAME OF ID = " + id);
		
		return Response.status(200).build();
	}
	
}
