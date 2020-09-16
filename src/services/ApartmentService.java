package services;

import java.util.ArrayList;
import java.util.Collection;
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
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import model.Apartment;
import model.Apartments;
import model.Guest;
import model.Host;
import model.Reservation;
import model.Reservations;
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
		HashMap<String, Apartment> postojeciApartmani = new HashMap<String, Apartment>();
		for(Entry<String, Apartment> a:apartmani.getApartments().entrySet()) {
			if(!a.getValue().getObrisan())
			postojeciApartmani.put(a.getKey(),a.getValue());
		}
		return postojeciApartmani;
	}
	
	@GET
	@Path("/aktivniApartmani")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public HashMap<String, Apartment> getAktivniApartmani() {
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
		if(ulogovani == null) {
			return null;
		}		
		HashMap<String,Apartment> aktivniApartmani = new HashMap<String,Apartment>();
		Apartments apartmani = (Apartments) ctx.getAttribute("apartments");
		for(Entry<String, Apartment> a : apartmani.getApartments().entrySet() ) {
			if(a.getValue().getStatus().equals("ACTIVE")&&!a.getValue().getObrisan()) {
				aktivniApartmani.put(a.getKey(),a.getValue());
			}else {
			}
		}
		return aktivniApartmani;
	}
	
	@GET
	@Path("/neaktivniApartmani")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public HashMap<String, Apartment> getNeaktivniApartmani() {
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
		if(ulogovani == null) {
			return null;
		}		
		HashMap<String,Apartment> neaktivniApartmani = new HashMap<String,Apartment>();
		Apartments apartmani = (Apartments) ctx.getAttribute("apartments");
		for(Entry<String, Apartment> a : apartmani.getApartments().entrySet() ) {
			if(a.getValue().getStatus().toString().equals("INACTIVE")&& !a.getValue().getObrisan()) {
				neaktivniApartmani.put(a.getKey(),a.getValue());
			}
		}
		return neaktivniApartmani;
	}
	
	@POST
	@Path("/prikazApartmana")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void sacuvajSelektovaniApartman(Apartment a) {
		ctx.setAttribute("izabraniApartman", a);
	}
	
	@GET
	@Path("/prikazZaDomacina")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<Apartment> prikazApartmanaZaDomacina() {
		Apartments postojeciApartmani = (Apartments) ctx.getAttribute("apartments");
		Host h = new Host();
		try {
			h = (Host)request.getSession().getAttribute("ulogovani");
		}catch(Exception e) {
			
		} 
		ArrayList<Apartment> ap = new ArrayList<Apartment>();
		for(Apartment a : h.getApartmentsForRent()) {
			for(Entry<String, Apartment> pa : postojeciApartmani.getApartments().entrySet()) {
				if(pa.getValue().getId().equals(a.getId())&& !pa.getValue().getObrisan()) {
					ap.add(a);
				}
			}
		}
		return ap; 
	}
	
	
	@GET
	@Path("/prikaz")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Apartment prikaziIzabrani() {
		Apartment a = (Apartment) ctx.getAttribute("izabraniApartman");
		if(a==null) {
			return null;
		}
		return a;
	}
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response dodajApartman(Apartment a) {
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
		if(ulogovani == null /*|| !ulogovani.getRole().equals("HOST")*/) {
			return Response.status(400).entity("Samo domacini mogu dodavati apartmane").build();
		}
		if(a.getRoomType().equals("") || a.getLocation().equals("")  
				|| a.getImage().equals("")/* || a.getPracePerNight().equals("")*/) {
			return Response.status(400).entity("Niste unijeli sva obavezna polja.").build();
		}
			
		Apartments apartments = (Apartments) ctx.getAttribute("apartments");
		HashMap<String, Apartment> mapaApartments = apartments.getApartments();
		//Kategorije kategorije = (Kategorije) ctx.getAttribute("kategorije");
		Users users = (Users) ctx.getAttribute("users");
		String contextPath = ctx.getRealPath("");
		User kor = (User) request.getSession().getAttribute("ulogovani");
		if(!mapaApartments.containsKey(a.getId())) {
			//Host h = users.getHost(kor.getUsername());
			
			//Host h = (Host)us;
			//Host us= host(kor.getUsername());
			User us = (User)users.getUser(kor.getUsername());
			Host h;
			try {
		      h = (Host) users.getUser(kor.getUsername());
			}catch(Exception e) {
			  h = new Host(us.getUsername(),us.getPassword(),us.getName(),us.getSurname(),us.toEnumGender(us.getGender()),us.toEnumRole(us.getRole()));
			 
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
	@Path("/obrisi")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response obrisiApartman(Apartment a) {
		String contextPath = ctx.getRealPath("");
		System.out.println("Usao u obrisi");
		Apartments apartments = (Apartments) ctx.getAttribute("apartments");
		apartments.obrisi(a);
		ctx.setAttribute("apartments", apartments);
		return Response.status(200).build();
	}


@POST
@Path("/edit")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public Response editApartman(Apartment a) {
	ctx.setAttribute("izabraniApartman", a);
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
	if(!mapaApartments.containsKey(a.getId())) {
		return Response.status(400).entity("Apartman sa id koji ste unijeline postoji!").build();
	}
	else {
	
		User us = (User)users.getUser(a.getHost());
		Host h;
		try {
	      h = (Host) users.getUser(a.getHost());
		}catch(Exception e) {
		  h = new Host(us.getUsername(),us.getPassword(),us.getName(),us.getSurname(),us.toEnumGender(us.getGender()),us.toEnumRole(us.getRole()));
		}	
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
