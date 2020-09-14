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

import model.Amenities;
import model.Amenitiess;
import model.Apartment;
import model.Apartments;
import model.Host;
import model.User;
import model.Users;

@Path ("/sadrzaj")
public class AmenitiesService {

	
	@Context
	ServletContext ctx;
	
	@Context
	HttpServletRequest request;
	
	public AmenitiesService() {
		
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
		if (ctx.getAttribute("amenities") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("amenities", new Amenitiess(contextPath));
		}
	}
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response dodajSadrzaj(Amenities a) {
		System.out.println("udjeeeeeeeeeeeeeeeeeeee" + a.getId());
		
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
		if(ulogovani == null /*|| !ulogovani.getRole().equals("HOST")*/) {
			return Response.status(400).entity("Samo domacini mogu dodavati apartmane").build();
		}
		if(a.getId().equals("") || a.getName().equals("") ) {
			return Response.status(400).entity("Niste unijeli sva obavezna polja.").build();
		}
			
		Amenitiess amenitiess = (Amenitiess) ctx.getAttribute("amenities");
		HashMap<String, Amenities> mapaAmenities = amenitiess.getAmenitiess();
		//Kategorije kategorije = (Kategorije) ctx.getAttribute("kategorije");
		Users users = (Users) ctx.getAttribute("users");
		String contextPath = ctx.getRealPath("");
		//User kor = (User) request.getSession().getAttribute("ulogovani");
		System.out.println("Id je : "+a.getId());
		if(!mapaAmenities.containsKey(a.getId())) {
			System.out.println("Usao u if, a broj apartmana je "+ amenitiess.getAmenitiess().size());
			
			amenitiess.dodaj(a);
			
			return Response.status(200).build();
		}
		else {
			return Response.status(400).entity("Apartman sa id koji ste unijeli vec postoji.").build();
		}
	}
	
	@GET
	@Path("/prikazSadrzaja")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public HashMap<String, Amenities> getAmenities() {
		User ulogovani = (User) request.getSession().getAttribute("ulogovani");
		if(ulogovani == null) {
			return null;
		}		
		Amenitiess amenitiess = (Amenitiess) ctx.getAttribute("amenities");
		System.out.println("ucitao sadrzaj "+amenitiess.getAmenitiess().size());
		return amenitiess.getAmenitiess();
	}
}
