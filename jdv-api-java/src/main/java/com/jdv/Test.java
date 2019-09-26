package com.jdv;

import java.util.ArrayList;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import com.google.gson.Gson;

@RequestScoped
@Path("test")
@Produces({ "application/xml", "application/json" })
@Consumes({ "application/xml", "application/json" })
public class Test {
	
	@GET
	@Produces("application/json")
	public ArrayList<String> lista(){
		ArrayList<String> Lst = new ArrayList<String>();
		Lst.add("aiwuefhiuawefh");
		Lst.add("aiwuefhiuawefhawf");
		Lst.add("aiwuefhiuawefhaefaew");
	
		
		return Lst;
	}

}
