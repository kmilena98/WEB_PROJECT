package services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import model.Apartment;
import model.Apartments;
import model.Reservation;
import model.Reservations;
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
			if (ctx.getAttribute("apartments") == null) {
		    	String contextPath = ctx.getRealPath("");
				ctx.setAttribute("apartments", new Apartments(contextPath));
			}
			if (ctx.getAttribute("reservations") == null) {
		    	String contextPath = ctx.getRealPath("");
				ctx.setAttribute("reservations", new Reservations(contextPath));
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
		@Path("/korisnickoIme/{s}")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public User getUserByUsername(@PathParam("s") String s) {	
			System.out.println("DOSAOO");
			String[] delovi =s.split("\\.");
			String username = delovi[0].trim();
			String password = delovi[1].trim();
			System.out.println("DOSAOO   :  "+username+"  "+password);
			Users users = (Users) ctx.getAttribute("users");
			User ulogovanKorisnik = (User) ctx.getAttribute("ulogovani");
			if(ulogovanKorisnik!=null)
				return null;
			HashMap<String, User>  mapa = users.getUsers();
			User u = mapa.get(username);
			System.out.println("User "+u.getName());
			if(u.getPassword().equals(password)) {
				System.out.println("Vratio sam pravog");
				return u;
			}else {
				System.out.println("Vratio null");
				return null;
			}
		}
		
		@GET
		@Path("/korisnici")
		@Produces(MediaType.APPLICATION_JSON)
		public HashMap<String, User> getKorisnici() {
			User ulogovani = (User) request.getSession().getAttribute("ulogovani");
			if(ulogovani == null) {
				return null;
			}		
			Users users = (Users) ctx.getAttribute("users");
			return users.getUsers();
		}
		
		/*@GET
		@Path("/korisniciZaDomacina")
		@Produces(MediaType.APPLICATION_JSON)
		public HashMap<String, User> getKorisniciZaDomacina() {
			User ulogovani = (User) request.getSession().getAttribute("ulogovani");
			if(ulogovani == null) {
				return null;
			}		
			Users users = (Users) ctx.getAttribute("users");
			HashMap<String, User> korisnici = new HashMap<String, User>();
			for(Map.Entry<String, User> kor : users.getUsers().entrySet()) {
				if(kor.)
			}
			return users.getUsers();
		}*/
		
		@GET
		@Path("/korisniciZaDomacina")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public ArrayList<User> prikazApartmanaZaDomacina() {
			System.out.println("Usao ovde!");
			Apartments postojeciApartmani = (Apartments) ctx.getAttribute("apartments");
			User u = (User)request.getSession().getAttribute("ulogovani");
			Reservations reservations = (Reservations) ctx.getAttribute("reservations");
			ArrayList<User> korisnici = new ArrayList<User>();
			HashMap<String, Apartment> ap = new HashMap<String, Apartment>();
			
			for(Entry<String, Apartment> pa : postojeciApartmani.getApartments().entrySet()) {
				if(pa.getValue().getHost().equals(u.getUsername())&& !pa.getValue().getObrisan()) {
					ap.put(pa.getKey(), pa.getValue());
				}
				
			}
			 for(Reservation r : reservations.getReservations()) {
				 if(ap.containsKey(r.getApartment().getId())) {
					 korisnici.add(r.getGuest());
				 }
			 }
			 
			 return korisnici;
		}
		
		
		@POST
		@Path("/add")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response registracija(User u) {
			User ulogovani = (User) request.getSession().getAttribute("ulogovani");
			
			
			if(ulogovani != null && !ulogovani.getRole().contains("ADMINISTRATOR") ) {
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
			User ulogovani = (User) request.getSession().getAttribute("ulogovani");
			if(ulogovani != null) {
				return Response.status(400).entity("Ulogovani ste.").build();
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
			if(u.getUsername().equals("") || u.getPassword().equals("") || u.getName().equals("") || u.getSurname().equals("")) {
				return Response.status(400).entity("Niste popunili sva obavezna polja").build();
			}
			java.util.regex.Pattern p = java.util.regex.Pattern.compile("[A-Z][a-zA-Z ]*");
			java.util.regex.Matcher m = p.matcher(u.getName());
			if(!m.matches()) {
				return Response.status(400).entity("Niste ispravno popunili sva polja forme").build();
			}

			p = java.util.regex.Pattern.compile("[A-Z][a-zA-Z ]*");
			m = p.matcher(u.getSurname());
			if(!m.matches()) { 
				return Response.status(400).entity("Niste ispravno popunili sva polja forme").build();
			}
			
			Users users = (Users) ctx.getAttribute("users");
			User user = users.getUser(u.getUsername());
			users.getUsers().remove(user.getUsername());
			
			users.dodaj(u);
			String contextPath = ctx.getRealPath("");
			users.sacuvajKorisnike(contextPath);

			request.getSession().setAttribute("ulogovani", u);
			
			return Response.status(200).build();
		}
		
		@POST
		@Path("/pretraga")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public HashMap<String, User> pretrazi(User u) {
			Users users = (Users) ctx.getAttribute("users");
			String username = "";
			String role = "";
			String gender = "";
			try {
				username = (String) u.getUsername();
			} catch (Exception e) {
				// TODO: handle exception
			}
			
			try {
				role = (String) u.getRole();
			} catch (Exception e) {
				// TODO: handle exception
			}
			
			try {
				gender = (String) u.getGender();
			} catch (Exception e) {
				// TODO: handle exception
			}
			
			return users.pretraga(username, role, gender);
		
		}
		
}
