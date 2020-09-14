package model;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

public class Amenitiess {
	
	private HashMap<String, Amenities> amenitiess;
	private String putanja;
	
	public Amenitiess(String path) {
		putanja = path;
		this.amenitiess = new HashMap<String, Amenities>();
		loadAmenities(path);
	}
	
	
	public HashMap<String, Amenities> getAmenitiess() {
		return amenitiess;
	}
	
	public void dodaj(Amenities a) {
		if(!amenitiess.containsKey(a.getId()))
			amenitiess.put(a.getId(), a);
		saveAmenities(putanja);
	}
	
	@SuppressWarnings("unchecked")
	public void loadAmenities(String path) {
		String putanja = path + "datoteka\\amenities.json";
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
				Amenities a;
				 a = mapper.convertValue(ap.getValue(), Amenities.class);
				 amenitiess.put(a.getId(), a);
				
			}
		} catch (FileNotFoundException fnfe) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String string = objectMapper.writeValueAsString(amenitiess);
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
	
	public void saveAmenities(String path) {
		String putanja = path + "datoteka\\amenities.json";
		File f = new File(putanja);
		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(f);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String string = objectMapper.writeValueAsString(amenitiess);
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
