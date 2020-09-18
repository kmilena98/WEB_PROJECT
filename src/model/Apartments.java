package model;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

public class Apartments {

	private HashMap<String, Apartment> apartments;
	private String putanja;
	
	public Apartments(String path) {
		putanja = path;
		this.apartments = new HashMap<String, Apartment>();
		loadApartments(path);
	}
	
	public Collection<Apartment> findAll() {
		return apartments.values();
	}
	
	public HashMap<String, Apartment> getApartments() {
		return apartments;
	}
	
	public Apartment getApartment(String name) {
		Apartment a = apartments.get(name);
		return a;
	}
	
	public void izmeni(Amenities a) {
		for(Map.Entry<String, Apartment> ap : apartments.entrySet()) {
			ap.getValue().izmeniAmenitie(a);
		}
	}
		
	@SuppressWarnings("unchecked")
	public void loadApartments(String path) {
		String putanja = path + "datoteka\\apartments.json";
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
			MapType type = factory.constructMapType(HashMap.class, String.class, /*Apartment.class*/ Object.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			HashMap<String, Object> podaci = (HashMap<String, Object>) objectMapper.readValue(file, type);
			for (Map.Entry<String, Object> ap : podaci.entrySet()) {
				ObjectMapper mapper = new ObjectMapper();
				//String jsonInString = (String) ap.toString();
				Apartment a;
				 a = mapper.convertValue(ap.getValue(), Apartment.class);
				 apartments.put(a.getId(), a);
				
			}
		} catch (FileNotFoundException fnfe) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String string = objectMapper.writeValueAsString(apartments);
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
		
		/*DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date date = new Date();
		String datumIVrijeme = dateFormat.format(date);
		String[] pom = datumIVrijeme.split(" ");
		String datum = pom[0].replace('/', '-');*/
		/*for(Map.Entry<String, Apartment> par : apartments.entrySet()) {
			if(veci(par.getValue().getDateOfRentingStart(), par.getValue().getDateOfRentingEnd())) {
				apartments.get(par.getKey()).setStatus(false);
			}
		}*/
	}
	
	
	
	public void saveApartments(String path) {
		String putanja = path + "datoteka\\apartments.json";
		File f = new File(putanja);
		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(f);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String string = objectMapper.writeValueAsString(apartments);
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
	
	public boolean veci(String d1, String d2) {
		String[] datum1 = d1.split("-");
		String[] datum2 = d2.split("-");
		int godina1 = Integer.parseInt(datum1[0]);
		int godina2 = Integer.parseInt(datum2[0]);
		int mjesec1 = Integer.parseInt(datum1[1]);
		int mjesec2 = Integer.parseInt(datum2[1]);
		int dan1 = Integer.parseInt(datum1[2]);
		int dan2 = Integer.parseInt(datum2[2]);
		if(godina1 > godina2) return true;
		if(godina1 < godina2) return false;
		if(mjesec1 > mjesec2) return true;
		if(mjesec1 < mjesec2) return false;
		if(dan1 >= dan2) return true;
		return false;
	}
	
	public void add(Apartment a) {
		apartments.put(a.getId(), a);
		saveApartments(putanja);
	}
	public void obrisi(Apartment a) {
		apartments.get(a.getId()).setObrisan(true);
		saveApartments(putanja);
	}
	
	public HashMap<String, Apartment> pretragaZaDomacina(User u, String datumOd, String datumDo, String grad, double cenaOd, double cenaDo, int brojSobaOd,int brojSobaDo,int brojOsoba) {
		System.out.println("Uso za pretragu kod domacia");
		HashMap<String, Apartment> rez = new HashMap<String, Apartment>();
			for (Map.Entry<String, Apartment> entry : apartments.entrySet()) {
				if(entry.getValue().getHost().equals(u.getUsername()) && u.getRole().equals("HOST") && !entry.getValue().getObrisan()) {
					System.out.println("cccccccccccccc " + u.getUsername() + u.getRole());
					if(provera(entry.getValue(), datumOd, datumDo, grad, cenaOd, cenaDo, brojSobaOd, brojSobaDo, brojOsoba))
						rez.put(entry.getKey(), entry.getValue());
				}
			}
					
		return rez;
	}
	
	public HashMap<String, Apartment> pretraga(String datumOd, String datumDo, String grad, double cenaOd, double cenaDo, int brojSobaOd,int brojSobaDo,int brojOsoba) {
		HashMap<String, Apartment> rez = new HashMap<String, Apartment>();
			for (Map.Entry<String, Apartment> entry : apartments.entrySet()) {
				if(provera(entry.getValue(), datumOd, datumDo, grad, cenaOd, cenaDo, brojSobaOd, brojSobaDo, brojOsoba))
					rez.put(entry.getKey(), entry.getValue());
			}
					
		return rez;
	}
	
	public boolean provera(Apartment a, String datumOd, String datumDo, String grad, double cenaOd, double cenaDo, int brojSobaOd,int brojSobaDo,int brojOsoba) {
		System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaa");
		datumOd.trim();
		datumDo.trim();
		grad.trim();
		System.out.println("Datum do " + datumDo);
		int pom = 0;
		if(/*!datumOd.equals("") && !datumDo.equals("") &&*/ datumDo.equals(null) || datumOd.equals(null)) {
			String[] datum1 = datumOd.split("\\-");
			int godina1 = Integer.parseInt(datum1[0].trim());
			int mesec1 = Integer.parseInt(datum1[1]);
			int dan1 = Integer.parseInt(datum1[2]);
		
			String[] datum2 = datumDo.split("\\-");
			int godina2 = Integer.parseInt(datum2[0]);
			int mesec2 = Integer.parseInt(datum2[1]);
			int dan2 = Integer.parseInt(datum2[2]);
		
		System.out.println("Datum do " + datumDo);
			for(String trenutni : a.getDatesForRenting()) {
				System.out.println(a.getDatesForRenting());
				if(trenutni != null) {
					String[] datumTrenutni = trenutni.split("\\-");
					int godinaT = Integer.parseInt(datumTrenutni[0]);
					int mesecT = Integer.parseInt(datumTrenutni[1]);
					int danT = Integer.parseInt(datumTrenutni[2]);
			
					if(godina1 < godinaT && godina2 > godinaT) {
						pom++;
					}else if(godina1 == godinaT || godina2 == godinaT) {
						if(mesec1 < mesecT && mesec2 > mesecT) {
							pom++;
						}else if(mesec1 == mesecT || mesec2 == mesecT) {
							if(dan1 < danT && dan2 > danT) {
								pom++;
							}else if(dan1 == danT || dan2 == danT) {
								pom++;
							}
						}
					}
				}
			}
		}
		System.out.println("Pom je: " + pom);
		/*if((!datumDo.equals(null) && !datumOd.equals(null)) && pom == 0) {
			System.out.println("Usao ovdeeeeeeeeeeeeee");
			return false;
		}*/
		if(cenaOd != 0 && cenaDo != 0 && (a.getPracePerNight()>= cenaDo || a.getPracePerNight() <= cenaOd)) 
			return false;
		if( brojSobaOd != 0 && brojSobaDo != 0 && (a.getRoomNumber()>= brojSobaDo || a.getRoomNumber() <= brojSobaOd)) 
			return false;
		if(brojOsoba != 0 && brojOsoba != a.getGuestNumber()) 
			return false;


		return true;
	}


}
