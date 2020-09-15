package model;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

public class Reservations {
	private ArrayList<Reservation> reservations;
	private String putanja;
	
	public Reservations(String path) {
		putanja = path;
		this.reservations = new ArrayList<Reservation>();
		loadReservations(path);
	}
	public ArrayList<Reservation> getReservations() {
		return reservations;
	}
	public void  serReservations(ArrayList<Reservation> r) {
		 reservations=r;
	}
	
	public void add(Reservation r) {
			reservations.add(r);
		saveReservations(putanja);
	}
	public ArrayList<Reservation> pretragaForHost(String username, String usernameHost){
		ArrayList<Reservation> rez = new ArrayList<Reservation>();
		for(Reservation reservation : reservations) {
			if(reservation.getApartment().getHost().equals(usernameHost)) {
				if(provera(reservation, username))
					rez.add(reservation);
			}
		}
		return rez;
	}
	public ArrayList<Reservation> pretraga(String username) {
		ArrayList<Reservation> rez = new ArrayList<Reservation>();
			for (Reservation reservation : reservations) {
				if(provera(reservation, username))
					rez.add(reservation);
			}
					
		return rez;
	}
	
	public boolean provera(Reservation r, String username) {
		username.trim();
		if(!username.equals("") && !r.getGuest().getUsername().toLowerCase().equals(username.toLowerCase())) 
			return false;

		return true;
	}

	
	public void loadReservations(String path) {
		String putanja = path + "datoteka\\reservations.json";
		FileWriter fileWriter = null;
		BufferedReader in = null;
		File file = null;
		try {
			file = new File(putanja);
			in = new BufferedReader(new FileReader(file));

			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.setVisibilityChecker(
					VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
			TypeFactory factory = TypeFactory.defaultInstance();
			JavaType type = factory.constructParametrizedType(ArrayList.class, String.class, /*Apartment.class*/ Object.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			ArrayList<Object> podaci = (ArrayList<Object>) objectMapper.readValue(file, type);
			for (Object ap : podaci) {
				ObjectMapper mapper = new ObjectMapper();
				//String jsonInString = (String) ap.toString();
				Reservation r;
				 r = mapper.convertValue(ap, Reservation.class);
				 reservations.add(r);
			}
		} catch (FileNotFoundException fnfe) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String string = objectMapper.writeValueAsString(reservations);
				fileWriter.write(string);

			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if (fileWriter != null) {
					try {
						fileWriter.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	public void saveReservations(String path) {
		String putanja = path + "datoteka\\reservations.json";
		File f = new File(putanja);
		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(f);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String string = objectMapper.writeValueAsString(reservations);
			fileWriter.write(string);
			fileWriter.flush();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fileWriter != null) {
				try {
					fileWriter.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}

	}
	
}
