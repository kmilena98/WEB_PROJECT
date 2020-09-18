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
import model.Guest;
import model.Host;
import model.Reservation;
import model.Reservations;
import model.User;
import model.Users;

@Path ("/reservation")
public class ReservationService {

	@Context
	ServletContext ctx;
	
	@Context
	HttpServletRequest request;
	
	public ReservationService() {
		// TODO Auto-generated constructor stub
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
		if (ctx.getAttribute("reservations") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("reservations", new Reservations(contextPath));
		}
	}
	
	@POST
	@Path("/addR")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response dodajRezervaciju2(Reservation r) {
		
		System.out.println("Izgled datuma : "+r.getBookingStartDate());
		
	
			return Response.status(400).entity("Nema dovoljno noci za rezervaciju.").build();
		
		
	}
	
	
	
	@POST
	@Path("/addReservation")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response dodajRezervaciju(Reservation r) {
		
		System.out.println("Izgled datuma : "+r.getBookingStartDate());
		
		Apartments apartmani = (Apartments)ctx.getAttribute("apartments");
		Apartment a = apartmani.getApartment(r.getApartment().getId());
		boolean ispravna = a.ispravnaRezervacija(r);
		System.out.println("dA LI JE ISPRAVNA?? "+ispravna);
		if(ispravna) {
		
			User kor = (User) request.getSession().getAttribute("ulogovani");
			if(kor == null ) {
				return Response.status(400).entity("Niste ulogovani").build();
			}
			if(r.getNumberOfNights()<=0  || r.getGuest()==null || r.getApartment()==null || r.getBookingStartDate()==null) {
				return Response.status(400).entity("Greska prilikom popunjavanja polja.").build();
			}
				
			Reservations reservations = (Reservations) ctx.getAttribute("reservations");
			ArrayList<Reservation> mapaRezervacija = reservations.getReservations();
			Users users = (Users) ctx.getAttribute("users");
			String contextPath = ctx.getRealPath("");
			boolean prosao = false;
			for(Reservation res : reservations.getReservations()) {
				if(res.getApartment().getId().equals(r.getApartment().getId()) && res.getBookingStartDate().equals(r.getBookingStartDate()) && res.getStatus().equals("ACCEPTED")){
					prosao = true;
					break;
				}
			}
				if(!prosao) {
						User us = (User)users.getUser(kor.getUsername());
						Guest g;
						String usernameHosta= r.getApartment().getHost();
						try {
							g = (Guest) users.getUser(kor.getUsername());
						}catch(Exception e) {
							g = new Guest(us.getUsername(),us.getPassword(),us.getName(),us.getSurname(),us.toEnumGender(us.getGender()),us.toEnumRole(us.getRole()));
				 
						}
				
						g.addReservation(r);
						reservations.add(r);
				
						users.getUsers().remove(g.getUsername());
						users.dodaj(g);
						users.sacuvajKorisnike(contextPath);
						reservations.saveReservations(contextPath);
						return Response.status(200).build();
					
				}else {
					return Response.status(400).entity("Apartman koji zelite da rezervisete u tom periodu je zauzet.").build();
				}
		}else {
			return Response.status(400).entity("Nema dovoljno noci za rezervaciju.").build();
		}
		
	}
	@GET
	@Path("/rezervacijeDomacin")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<Reservation> getReservationsForHost() {
			User ulogovani = (User) request.getSession().getAttribute("ulogovani");
			if(ulogovani == null) {
				return null;
			}	
			ArrayList<Reservation> rez = new ArrayList<Reservation>();
			Reservations rezervacije = (Reservations) ctx.getAttribute("reservations");
			for(Reservation r : rezervacije.getReservations()) {
				//System.out.println("Username " + r.getGuest().getUsername() + "username ulogovanog: " + ulogovani.getUsername());
				if(r.getApartment().getHost().equals(ulogovani.getUsername())) {
					rez.add(r);
				}
			}
			//System.out.println("Broj rezervacija koji je vracen je "+rez.size());
			return rez;
	}
	
	@GET
	@Path("/rezervacijeGost")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<Reservation> getReservationsForGest() {
			User ulogovani = (User) request.getSession().getAttribute("ulogovani");
			if(ulogovani == null) {
				return null;
			}	
			ArrayList<Reservation> rez = new ArrayList<Reservation>();
			Reservations rezervacije = (Reservations) ctx.getAttribute("reservations");
			for(Reservation r : rezervacije.getReservations()) {
				if(r.getGuest().getUsername().equals(ulogovani.getUsername())) {
					rez.add(r);
				}
			}
			//System.out.println("Broj rezervacija koji je vracen je "+rez.size());
			return rez;
	}
	
	@GET
	@Path("/rezervacijeAdministrator")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<Reservation> getReservationsForAdministrator() {
			User ulogovani = (User) request.getSession().getAttribute("ulogovani");
			if(ulogovani == null) {
				return null;
			}		
			Reservations rezervacije = (Reservations) ctx.getAttribute("reservations");
			//System.out.println("Broj rezervacija koji je vracen je "+rezervacije.getReservations().size());
			return rezervacije.getReservations();
	}
	
	
	
	@GET
	@Path("/pretragaRezervacija/{username}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Reservation> pretrazi(@PathParam("username") String username) {
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
		if(ulogovani == null) {
			return null;
		}		
		Reservations reservations = (Reservations) ctx.getAttribute("reservations");
		
			//System.out.println("Username " + r.getGuest().getUsername() + "username ulogovanog: " + ulogovani.getUsername());
			if(ulogovani.getRole().equals("HOST")) {
				return reservations.pretragaForHost(username, ulogovani.getUsername());
			}else {
		
				return reservations.pretraga(username);
			}
	}
	
	@POST
	@Path("/ponistavanjeRezervacije")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response ponistavanje(Reservation r) {
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
		if(ulogovani == null) {
			return null;
		}	
		Users users = (Users) ctx.getAttribute("users");
		String contextPath = ctx.getRealPath("");
		
		
		Reservations reservations = (Reservations) ctx.getAttribute("reservations");
		for(Reservation res : reservations.getReservations()) {
			if(res.getApartment().getId().equals(r.getApartment().getId()) && res.getBookingStartDate().equals(r.getBookingStartDate())) {
				res.izmeniStatus("REJECTED");
				break;
			}
		}
	
		reservations.saveReservations(contextPath);
		users.sacuvajKorisnike(contextPath);
		ctx.setAttribute("reservations", reservations);
		
		return Response.status(200).build();
	}
	
	
	@POST
	@Path("/odustani")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response odustajanjeGosta(Reservation r) {
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
		if(ulogovani == null) {
			return null;
		}	
		Users users = (Users) ctx.getAttribute("users");
		String contextPath = ctx.getRealPath("");
		
		/*User us = (User)users.getUser(ulogovani.getUsername());
		Guest g;
		String usernameHosta= r.getApartment().getHost();
		try {
	      g = (Guest) users.getUser(ulogovani.getUsername());
		}catch(Exception e) {
		  g = new Guest(us.getUsername(),us.getPassword(),us.getName(),us.getSurname(),us.toEnumGender(us.getGender()),us.toEnumRole(us.getRole()));
		 
		}*/

		
		Reservations reservations = (Reservations) ctx.getAttribute("reservations");
		for(Reservation res : reservations.getReservations()) {
			if(res.getApartment().getId().equals(r.getApartment().getId()) && res.getBookingStartDate().equals(r.getBookingStartDate())) {
				res.izmeniStatus("CANCELED");
				//res.getGuest()
				break;
			}
		}
	
		reservations.saveReservations(contextPath);
		users.sacuvajKorisnike(contextPath);
		//ctx.setAttribute("reservations", reservations);
		
		return Response.status(200).build();
	}
	
	@POST
	@Path("/odgovorDomacinaZaRezervacije")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response odgovorDomacina(Reservation r) {
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
		if(ulogovani == null) {
			return null;
		}	
		Users users = (Users) ctx.getAttribute("users");
		String contextPath = ctx.getRealPath("");
		
		/*User us = (User)users.getUser(ulogovani.getUsername());
		Guest g;
		String usernameHosta= r.getApartment().getHost();
		try {
	      g = (Guest) users.getUser(ulogovani.getUsername());
		}catch(Exception e) {
		  g = new Guest(us.getUsername(),us.getPassword(),us.getName(),us.getSurname(),us.toEnumGender(us.getGender()),us.toEnumRole(us.getRole()));
		 
		}*/

		
		Reservations reservations = (Reservations) ctx.getAttribute("reservations");
		for(Reservation res : reservations.getReservations()) {
			if(res.getApartment().getId().equals(r.getApartment().getId()) && res.getBookingStartDate().equals(r.getBookingStartDate())) {
				res.izmeniStatus("ACCEPTED");
				//res.getGuest()
				break;
			}
		}
	
		reservations.saveReservations(contextPath);
		users.sacuvajKorisnike(contextPath);
		//ctx.setAttribute("reservations", reservations);
		
		return Response.status(200).build();
	}
	
	@POST
	@Path("/odgovorDomacinaZaRezervacijeReject")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response odgovorDomacinaOdbijeno(Reservation r) {
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
		if(ulogovani == null) {
			return null;
		}	
		Users users = (Users) ctx.getAttribute("users");
		String contextPath = ctx.getRealPath("");
		
		User us = (User)users.getUser(ulogovani.getUsername());

		
		Reservations reservations = (Reservations) ctx.getAttribute("reservations");
		for(Reservation res : reservations.getReservations()) {
			if(res.getApartment().getId().equals(r.getApartment().getId()) && res.getBookingStartDate().equals(r.getBookingStartDate())) {
				res.izmeniStatus("REJECTED");
				break;
			}
		}
		
		reservations.saveReservations(contextPath);
		users.sacuvajKorisnike(contextPath);
		ctx.setAttribute("reservations", reservations);
		
		return Response.status(200).build();
	}
	
	@POST
	@Path("/zavrsi")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response zavrsi(Reservation r) {
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
		if(ulogovani == null) {
			return null;
		}	
		Users users = (Users) ctx.getAttribute("users");
		String contextPath = ctx.getRealPath("");
		
		User us = (User)users.getUser(ulogovani.getUsername());

		
		Reservations reservations = (Reservations) ctx.getAttribute("reservations");
		for(Reservation res : reservations.getReservations()) {
			if(res.getApartment().getId().equals(r.getApartment().getId()) && res.getBookingStartDate().equals(r.getBookingStartDate())) {
				String[] delovi = res.getBookingStartDate().split("-");
				Integer god = Integer.parseInt(delovi[0]);
				Integer month = Integer.parseInt(delovi[1]);
				Integer day = Integer.parseInt(delovi[2]);
				String[] delovi2=java.time.LocalDate.now().toString().split("-");
				Integer god2 = Integer.parseInt(delovi2[0]);
				Integer month2 = Integer.parseInt(delovi2[1]);
				Integer day2 = Integer.parseInt(delovi2[2]);
				if(god<god2) {
				res.izmeniStatus("COMPLETED");
				break;
				}else if(god<=god2 && month<month2) {
					res.izmeniStatus("COMPLETED");
					break;
				}else if(god<=god2 && month<=month2 && day<=day2) {
					res.izmeniStatus("COMPLETED");
					break;
				}
			}
		}
		
		reservations.saveReservations(contextPath);
		users.sacuvajKorisnike(contextPath);
		ctx.setAttribute("reservations", reservations);
		
		return Response.status(200).build();
	}
	
	
	@POST
	@Path("/odgovorGostaZaRezervacije")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response odgovorGosta(Reservation r) {
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
		if(ulogovani == null) {
			return null;
		}	
		Users users = (Users) ctx.getAttribute("users");
		String contextPath = ctx.getRealPath("");
		
		User us = (User)users.getUser(ulogovani.getUsername());
		Guest g;
		String usernameHosta= r.getApartment().getHost();
		try {
	      g = (Guest) users.getUser(ulogovani.getUsername());
		}catch(Exception e) {
		  g = new Guest(us.getUsername(),us.getPassword(),us.getName(),us.getSurname(),us.toEnumGender(us.getGender()),us.toEnumRole(us.getRole()));
		 
		}

		
		Reservations reservations = (Reservations) ctx.getAttribute("reservations");
		for(Reservation res : reservations.getReservations()) {
			if(res.getApartment().getId().equals(r.getApartment().getId()) && res.getBookingStartDate().equals(r.getBookingStartDate())) {
				res.izmeniStatus("CANCELED");
				//res.getGuest()
				break;
			}
		}

		reservations.saveReservations(contextPath);
		users.sacuvajKorisnike(contextPath);
		//ctx.setAttribute("reservations", reservations);
		
		return Response.status(200).build();
	}
	
}
	



