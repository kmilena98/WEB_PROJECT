package services;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
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
import model.Comment;
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
	public ArrayList<Apartment> getApartmani() {
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
		if(ulogovani == null) {
			return null;
		}		
		Apartments apartmani = (Apartments) ctx.getAttribute("apartments");
		ArrayList<Apartment> postojeciApartmani = new ArrayList<Apartment>();
		for(Entry<String, Apartment> a:apartmani.getApartments().entrySet()) {
			if(!a.getValue().getObrisan())
			postojeciApartmani.add(a.getValue());
		}
		return postojeciApartmani;
	}
	
	@GET
	@Path("/appom")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public HashMap<String, Apartment> getApartmani2() {
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
				
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
		System.out.println("Usao ovde!");
		Apartments postojeciApartmani = (Apartments) ctx.getAttribute("apartments");
		User u = (User)request.getSession().getAttribute("ulogovani");
		
		 
		ArrayList<Apartment> ap = new ArrayList<Apartment>();
		
			for(Entry<String, Apartment> pa : postojeciApartmani.getApartments().entrySet()) {
				if(pa.getValue().getHost().equals(u.getUsername())&& !pa.getValue().getObrisan()) {
					ap.add(pa.getValue());
				}
			
		}
		return ap; 
	}
	

	@GET
	@Path("/svihKomentara")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<Comment> sviKomentari() {
		System.out.println("Usao ovde!");
		Apartments postojeciApartmani = (Apartments) ctx.getAttribute("apartments");
		User u = (User)request.getSession().getAttribute("ulogovani");
		
		 
		ArrayList<Comment> komentari = new ArrayList<Comment>();
		
			for(Entry<String, Apartment> pa : postojeciApartmani.getApartments().entrySet()) {
				if(!pa.getValue().getObrisan()) {
					System.out.println("Usao ovde");
					for(Comment c: pa.getValue().getComents()) {
						komentari.add(c);
					}
				}
			
		}
			//System.out.println("Svi komentari " + komentari.size());
		return komentari; 
	}
	
	@GET
	@Path("/svihKomentaraZaDomacina")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<Comment> sviKomentariZaDomacina() {
		System.out.println("Usao ovde!");
		Apartments postojeciApartmani = (Apartments) ctx.getAttribute("apartments");
		User u = (User)request.getSession().getAttribute("ulogovani");
		
		 
		ArrayList<Comment> komentari = new ArrayList<Comment>();
		
			for(Entry<String, Apartment> pa : postojeciApartmani.getApartments().entrySet()) {
				if(pa.getValue().getHost().equals(u.getUsername()) && !pa.getValue().getObrisan()) {
					System.out.println("Usao ovde");
					for(Comment c: pa.getValue().getComents()) {
						komentari.add(c);
					}
				}
			
		}
			//System.out.println("Svi komentari " + komentari.size());
		return komentari; 
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
//		if(a.getRoomType().equals("") || a.getLocation().equals("") || a.getDateOfRentingStart().equals("") || a.getDateOfRentingEnd().equals("") 
//				|| a.getImage().equals("")/* || a.getPracePerNight().equals("")*/) {
//			return Response.status(400).entity("Niste unijeli sva obavezna polja.").build();
//		}
		
		Apartments apartments = (Apartments) ctx.getAttribute("apartments");
		HashMap<String, Apartment> mapaApartments = apartments.getApartments();

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

	/*Komentari*/

	@POST
	@Path("/sendComment")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response posaljiPoruku(Comment comment) {
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
		if(ulogovani == null)
			return Response.status(400).entity("Morate biti prijavljeni").build();
		/*if(comment.getText().equals("") || Integer.parseInt(comment.getGrade())==0) {
			return Response.status(400).entity("Niste popunili sva obavezna polja.").build();
		}*/
	
		/*DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date date = new Date();
		String datum = dateFormat.format(date);
		poruka.setDatum(datum);*/
		Apartments apartments = (Apartments)ctx.getAttribute("apartments");
	
		Apartment ap = apartments.getApartment(comment.getApartmentId());
	
		ap.dodajKomentar(comment);
	
		String contextPath = ctx.getRealPath("");
		apartments.saveApartments(contextPath);
		return Response.status(200).build();
	
	}

	@POST
	@Path("/dopusti")
	@Produces(MediaType.APPLICATION_JSON)
	public void dopusti(Comment comment) {
	
		Apartments apartments = (Apartments)ctx.getAttribute("apartments");
		for(Map.Entry<String, Apartment> a : apartments.getApartments().entrySet()) {
			for(Comment c : a.getValue().getComents()) {
				if(comment.getApartmentId().equals(c.getApartmentId()) && comment.getGuest().getUsername().equals(c.getGuest().getUsername()) && 
						comment.getGrade() == c.getGrade() && comment.getText().equals(c.getText())) {
					if(c.isDopusti()) {
						c.setDopusti(false);
					}else {
						c.setDopusti(true);
					}
				
				}
			}
		}	
		String contextPath = ctx.getRealPath("");
		apartments.saveApartments(contextPath);
	}
	
	@GET
	@Path("/svihKomentaraZaGosta")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<Comment> sviKomentariZaGosta() {
		System.out.println("Usao ovde!");
		Apartments postojeciApartmani = (Apartments) ctx.getAttribute("apartments");
		User u = (User)request.getSession().getAttribute("ulogovani");
		
		 
		ArrayList<Comment> komentari = new ArrayList<Comment>();
		
			for(Entry<String, Apartment> pa : postojeciApartmani.getApartments().entrySet()) {
				if(!pa.getValue().getObrisan()) {
					System.out.println("Usao ovde");
					for(Comment c: pa.getValue().getComents()) {
						if(c.isDopusti()) {
							komentari.add(c);
						}
					}
				}
			
		}
			//System.out.println("Svi komentari " + komentari.size());
		return komentari; 
	}
}
