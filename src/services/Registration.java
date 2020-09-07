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
		@Path("/add")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public String registracija(User u) {
			System.out.println("Korisnik je registrovan!");
			return "Odradio!";
			/*User ulogovani = (User) request.getSession().getAttribute("ulogovani");
			if(ulogovani != null) {
				return Response.status(400).entity("Ne mozete registrovati novog korisnika dok ste prijavljeni").build();
			}
			if(u.getUsername().equals("") || u.getPassword().equals("") || u.getName().equals("") || u.getSurname().equals("")) {
				return Response.status(400).entity("Niste popunili sva obavezna polja").build();
			}

			//java.util.regex.Pattern p = java.util.regex.Pattern.compile("[A-Z][a-zA-Z ]*");
			//java.util.regex.Matcher m = p.matcher(k.getIme());
			//if(!m.matches()) return Response.status(400).entity("Niste ispravno popunili sva polja forme").build();

			//p = java.util.regex.Pattern.compile("[A-Z][a-zA-Z ]*");
			//m = p.matcher(k.getPrezime());
			//if(!m.matches()) return Response.status(400).entity("Niste ispravno popunili sva polja forme").build();
			
			//p = java.util.regex.Pattern.compile("[A-Z][a-zA-Z ]*");
			//m = p.matcher(k.getGrad());
			//if(!m.matches()) return Response.status(400).entity("Niste ispravno popunili sva polja forme").build();
			
			Users users = (Users) ctx.getAttribute("korisnici");
			HashMap<String, User> mapa = users.getUsers();
			
			if(!mapa.containsKey(u.getUsername())) {
				users.dodaj(u);
				return Response.status(200).build();
			}
			else {
				return Response.status(400).entity("Korisnicko ime koje ste unijeli vec postoji.").build();
			}*/
		}
		
}
