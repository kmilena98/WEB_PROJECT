package services;

import java.util.ArrayList;
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
		
		
		@GET
		@Path("/ulogovani")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public User login() {
			User u = (User) request.getSession().getAttribute("ulogovani");
			return u;
		}
		
		@GET
		@Path("/korisnici")
		@Produces(MediaType.APPLICATION_JSON)
		public HashMap<String, User> getKorisnici() {
			User ulogovani = (User) request.getSession().getAttribute("ulogovani");
			if(ulogovani == null) {
				return null;
			}		
			Users users = (Users) ctx.getAttribute("korisnici");
			return users.getUsers();
		}
		
		
		
		@POST
		@Path("/add")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response registracija(User u) {
			User ulogovani = (User) request.getSession().getAttribute("ulogovani");
			if(ulogovani != null) {
				return Response.status(400).entity("Ne mozete registrovati novog korisnika dok ste prijavljeni").build();
			}
			if(u.getUsername().equals("") || u.getPassword().equals("") || u.getName().equals("") || u.getSurname().equals("")) {
				return Response.status(400).entity("Niste popunili sva obavezna polja").build();
			}
			
			java.util.regex.Pattern p = java.util.regex.Pattern.compile("[A-Z][a-zA-Z ]*");
			java.util.regex.Matcher m = p.matcher(u.getName());
			if(!m.matches()) return Response.status(400).entity("Niste ispravno popunili sva polja forme").build();

			p = java.util.regex.Pattern.compile("[A-Z][a-zA-Z ]*");
			m = p.matcher(u.getSurname());
			if(!m.matches()) return Response.status(400).entity("Niste ispravno popunili sva polja forme").build();
			
			//if(!m.matches()) return Response.status(400).entity("Niste ispravno popunili sva polja forme").build();
			Users users = (Users) ctx.getAttribute("users");
			HashMap<String, User>  mapa = users.getUsers();
			if(!mapa.containsKey(u.getUsername())) {
				users.dodaj(u);
				return Response.status(200).build();
			}
			else {
				return Response.status(400).entity("Korisnicko ime koje ste unijeli vec postoji.").build();
			}
		}
		
		@POST
		@Path("/login")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response login(User u) {
			System.out.println("usao u login");
			User ulogovani = (User) request.getSession().getAttribute("ulogovani");
			if(ulogovani != null) {
				return Response.status(400).entity("Vec ste prijavljeni.").build();
			}
			
			if(u.getUsername().equals("") || u.getPassword().equals(""))
				return Response.status(400).entity("Niste unijeli sva obavezvna polja").build();
			
			Users users = (Users) ctx.getAttribute("users");
			HashMap<String, User> mapa = users.getUsers();
			System.out.println("uzela korisnike!"+ mapa.size());
			User postoji = (User)mapa.get(u.getUsername());
			if(postoji != null && postoji.getPassword().equals(u.getPassword())) {
				request.getSession().setAttribute("ulogovani", postoji);
				System.out.println("zavrsio login uspesno");
				return Response.status(200).build();
			}
			else 				
				return Response.status(400).entity("Pogresno korisnicko ime ili lozinka").build();
		}
		
		@POST
		@Path("/logout")
		@Produces(MediaType.APPLICATION_JSON)
		public Response logout() {
			User ulogovani = (User) request.getSession().getAttribute("ulogovani");
			if(ulogovani == null) {
				return Response.status(400).entity("Niko nije prijavljen.").build();
			}
			request.getSession().invalidate();
			return Response.status(200).build();
		}
		
		@POST
		@Path("/izmena")
		@Produces(MediaType.APPLICATION_JSON)
		public Response izmijeni(User u) {
			System.out.println("IZMENAAAAAAAAAAA");
			if(u.getUsername().equals("") || u.getPassword().equals("") || u.getName().equals("") || u.getSurname().equals("")) {
				System.out.println("Izmena 1");
				return Response.status(400).entity("Niste popunili sva obavezna polja").build();
			}
			java.util.regex.Pattern p = java.util.regex.Pattern.compile("[A-Z][a-zA-Z ]*");
			java.util.regex.Matcher m = p.matcher(u.getName());
			if(!m.matches()) {
				System.out.println("Izmena 2");
				return Response.status(400).entity("Niste ispravno popunili sva polja forme").build();
			}

			p = java.util.regex.Pattern.compile("[A-Z][a-zA-Z ]*");
			m = p.matcher(u.getSurname());
			if(!m.matches()) { 
				System.out.println("Izmena 3");
				return Response.status(400).entity("Niste ispravno popunili sva polja forme").build();
			}
			
			Users users = (Users) ctx.getAttribute("users");
			User user = users.getUser(u.getUsername());
			users.getUsers().remove(user.getUsername());
			System.out.println("Usao u izmenu!"+user.getName());
			
			
			String contextPath = ctx.getRealPath("");
			users.sacuvajKorisnike(contextPath);
			
			users.dodaj(u);
			request.getSession().setAttribute("ulogovani", u);
			
			/*korisnici.sacuvajKorisnike(contextPath);
			oglasi.sacuvajOglase(contextPath);
			kategorije.sacuvajKategorije(contextPath);*/
			System.out.println("Izmena : Vratio dobro!");
			return Response.status(200).build();
		}
		
}
