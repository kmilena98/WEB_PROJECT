package services;

import java.util.HashMap;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
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
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response dodajOglas(Apartment a) {
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
			User us = (User)users.getUser(kor.getUsername());
			Host h = (Host) users.getUser(kor.getUsername());
			//Host host = new Host(us.getUsername(),us.getPassword(),us.getName(),us.getSurname(),us.toEnumGender(us.getGender()),us.toEnumRole(us.getRole()));
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
}
