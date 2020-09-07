package services;

import java.util.HashMap;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import model.User;
import model.Users;

@Path ("/registracija")
public class Registration {
		
	@GET
	@Path("/test")
	@Produces(MediaType.APPLICATION_JSON)
	public String test() {
		return "REST rulez!";
	}
	
		@Context
		ServletContext ctx;
		
		@Context
		HttpServletRequest request;
		
		public Registration() {
		}
		
		@PostConstruct
		public void init() {
			if (ctx.getAttribute("users") == null) {
		    	String contextPath = ctx.getRealPath("");
				ctx.setAttribute("users", new Users(contextPath));
			}
		}
		
		@POST
		@Path("/login")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response login(User u) {
			System.out.println("radi");
			User ulogovani = (User) request.getSession().getAttribute("ulogovani");
			if(ulogovani != null) {
				return Response.status(400).entity("Vec ste se priavili.").build();
			}
			
			if(u.getUsername().equals("") || u.getPassword().equals(""))
				return Response.status(400).entity("Niste unijeli sva obavezvna polja").build();
			
			Users users = (Users) ctx.getAttribute("users");
			HashMap<String, User> mapa = users.getUsers();
			
			User postoji = (User)mapa.get(u.getUsername());
			if(postoji != null && postoji.getPassword().equals(u.getPassword())) {
				request.getSession().setAttribute("ulogovani", postoji);
				return Response.status(200).build();
			}
			else
				return Response.status(400).entity("Pogresno korisnicko ime ili lozinka").build();
		}
		
}
