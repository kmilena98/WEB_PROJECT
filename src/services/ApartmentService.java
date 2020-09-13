package services;

import java.util.Collection;
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

import model.Apartment;
import model.Apartments;
import model.Host;
import model.User;
import model.Users;


@Path ("/apartmani")
public class ApartmentService {

	
	@Context
	ServletContext ctx;
	
	@Context
	HttpServletRequest request;
	
	public ApartmentService() {
		
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("apartments") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("apartments", new Apartments(contextPath));
		}
		if (ctx.getAttribute("users") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("users", new Users(contextPath));
		}
	}
	
	@GET
	@Path("/ap")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public HashMap<String, Apartment> getApartmani() {
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
		if(ulogovani == null) {
			return null;
		}		
		Apartments apartmani = (Apartments) ctx.getAttribute("apartments");
		System.out.println("ucitao apartmane"+apartmani.getApartments().size());
		return apartmani.getApartments();
	}
	
	@POST
	@Path("/prikazApartmana")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void sacuvajSelektovaniApartman(Apartment a) {
		ctx.setAttribute("izabraniApartman", a);
	}
	
	@GET
	@Path("/prikaz")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Apartment prikaziIzabrani() {
		Apartment a = (Apartment) ctx.getAttribute("izabraniApartman");
		if(a==null) {
			System.out.println("Nema izabranih apartmana!");
			return null;
		}
		System.out.println("Vrati apartman: "+a.getId());
		return a;
	}
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response dodajApartman(Apartment a) {
		System.out.println("udjeeeeeeeeeeeeeeeeeeee" + a.getId());
		
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
		if(ulogovani == null /*|| !ulogovani.getRole().equals("HOST")*/) {
			return Response.status(400).entity("Samo domacini mogu dodavati apartmane").build();
		}
		if(a.getRoomType().equals("") || a.getLocation().equals("") || a.getDateOfRentingStart().equals("") || a.getDateOfRentingEnd().equals("") 
				|| a.getImage().equals("")/* || a.getPracePerNight().equals("")*/) {
			return Response.status(400).entity("Niste unijeli sva obavezna polja.").build();
		}
			
		Apartments apartments = (Apartments) ctx.getAttribute("apartments");
		HashMap<String, Apartment> mapaApartments = apartments.getApartments();
		//Kategorije kategorije = (Kategorije) ctx.getAttribute("kategorije");
		Users users = (Users) ctx.getAttribute("users");
		String contextPath = ctx.getRealPath("");
		User kor = (User) request.getSession().getAttribute("ulogovani");
		System.out.println("Id je : "+a.getId());
		if(!mapaApartments.containsKey(a.getId())) {
			System.out.println("Usao u if, a broj apartmana je "+ apartments.getApartments().size());
			//Host h = users.getHost(kor.getUsername());
			
			//Host h = (Host)us;
			//Host us= host(kor.getUsername());
			User us = (User)users.getUser(kor.getUsername());
			Host h;
			try {
		      h = (Host) users.getUser(kor.getUsername());
		      System.out.println("Iz try-a!");
			}catch(Exception e) {
			  h = new Host(us.getUsername(),us.getPassword(),us.getName(),us.getSurname(),us.toEnumGender(us.getGender()),us.toEnumRole(us.getRole()));
			  System.out.println("Iz catch-a!");
			}	
			a.setHost(kor.getUsername());
			apartments.add(a);
			h.addAppartment(a);
			
			User user = users.getUser(h.getUsername());
			users.getUsers().remove(user.getUsername());
			users.dodaj(h);
			users.sacuvajKorisnike(contextPath);
			apartments.saveApartments(contextPath);
			return Response.status(200).build();
		}
		else {
			return Response.status(400).entity("Apartman sa id koji ste unijeli vec postoji.").build();
		}
	}


@POST
@Path("/edit")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public Response editApartman(Apartment a) {
	System.out.println("udjeeeeeeeeeeeeeeeeeeee" + a.getHost());
	
	User ulogovani = (User) request.getSession().getAttribute("ulogovani");
	if(ulogovani == null /*|| !ulogovani.getRole().equals("HOST")*/) {
		return Response.status(400).entity("Samo domacini mogu dodavati apartmane").build();
	}
//	if(a.getRoomType().equals("") || a.getLocation().equals("") || a.getDateOfRentingStart().equals("") || a.getDateOfRentingEnd().equals("") 
//			|| a.getImage().equals("")/* || a.getPracePerNight().equals("")*/) {
//		return Response.status(400).entity("Niste unijeli sva obavezna polja.").build();
//	}
		
	Apartments apartments = (Apartments) ctx.getAttribute("apartments");
	HashMap<String, Apartment> mapaApartments = apartments.getApartments();
	//Kategorije kategorije = (Kategorije) ctx.getAttribute("kategorije");
	Users users = (Users) ctx.getAttribute("users");
	String contextPath = ctx.getRealPath("");
	User kor = (User) request.getSession().getAttribute("ulogovani");
	System.out.println("Id je : "+a.getId());
	if(!mapaApartments.containsKey(a.getId())) {
		return Response.status(400).entity("Apartman sa id koji ste unijeline postoji!").build();
		
		
	}
	else {
		System.out.println("Apartman postoji, a ukupno ih je :  "+ apartments.getApartments().size());
		//Host h = users.getHost(kor.getUsername());
		
		//Host h = (Host)us;
		//Host us= host(kor.getUsername());
		User us = (User)users.getUser(a.getHost());
		Host h;
		try {
	      h = (Host) users.getUser(a.getHost());
	      System.out.println("Iz try-a!");
		}catch(Exception e) {
		  h = new Host(us.getUsername(),us.getPassword(),us.getName(),us.getSurname(),us.toEnumGender(us.getGender()),us.toEnumRole(us.getRole()));
		  System.out.println("Iz catch-a!");
		}	
		System.out.println("Apartman koji zelim da izbrisem je "+a.toString());
		apartments.add(a);
		h.removeApartment(a);
		h.addAppartment(a);
		
		User user = users.getUser(h.getUsername());
		users.getUsers().remove(user.getUsername());
		users.dodaj(h);
		users.sacuvajKorisnike(contextPath);
		apartments.saveApartments(contextPath);
		return Response.status(200).build();
	}
}
}
