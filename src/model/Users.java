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




public class Users {
	private HashMap<String, User> users;
	private HashMap<String, Host> hosts;
	//private HashMap<String, Guest> guests;
	private String path;
	public Users(String path) {
		this.users = new HashMap<String, User>();
		//this.hosts = new HashMap<String, Host>();
		this.path = path;
		loadUsers(path);
		System.out.println("Ucitao korisnike iz fajla!"+ users.size());
		//getUser("e").get;
	}
	
	public HashMap<String, User> getUsers() {
		return users;
	}
	public void setUsers(HashMap<String, User> korisnici) {
		this.users = korisnici;
	}
	
	public User getUser(String name) {
		User u = users.get(name);
		return u;
	}
	public User getHost(String name) {
		Host h = hosts.get(name);
		return h;
	}
	
	public void dodaj(User u) {
		if(!users.containsKey(u.getUsername()))
			users.put(u.getUsername(), u);
		sacuvajKorisnike(path);
	}
	
	public void loadUsers(String path) {
		String putanja = path + "podaci\\users.json";
		System.out.println("putanja za citanje je : "+putanja);
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
			MapType type = factory.constructMapType(HashMap.class, String.class, Object.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			@SuppressWarnings("unchecked")
			HashMap<String, Object> podaci = (HashMap<String, Object>) objectMapper.readValue(file, type);
			System.out.println("korisnici su :" + podaci.size()
			);
			for (Map.Entry<String, Object> par : podaci.entrySet()) {
				ObjectMapper mapper = new ObjectMapper();
				String jsonInString = (String) par.toString();
				User u;// = mapper.convertValue(par.getValue(), User.class);
				//Host h = new Host();
				
				if(jsonInString.contains("role=GUEST,")) {
		            u = mapper.convertValue(par.getValue(), Guest.class);
		           // users.put(u.getUsername(), u);
				}
				else if(jsonInString.contains("role=HOST,")) {
					 u = mapper.convertValue(par.getValue(),Host.class);
					// hosts.put(h.getUsername(), h);
				}
				else 
					 u = mapper.convertValue(par.getValue(),User.class);
				users.put(u.getUsername(), u);
				
				
			}

		} catch (FileNotFoundException fnfe) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String stringUsers = objectMapper.writeValueAsString(users);
				fileWriter.write(stringUsers);

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

	
	public void sacuvajKorisnike(String path) {
		String current;
		try {
			current = new java.io.File( "." ).getCanonicalPath();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        
		String putanja = path + "podaci\\users.json";

		System.out.println("putanja za upis je : "+putanja);
		File f = new File(putanja);
		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(f);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String stringUsers = objectMapper.writeValueAsString(users);
			//String stringHosts = objectMapper.writeValueAsString(hosts);
			fileWriter.write(stringUsers);
			//fileWriter.write(stringHosts);
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
	
	public HashMap<String, User> pretraga(String username, String role, String gender) {
		HashMap<String, User> rez = new HashMap<String, User>();
			for (Map.Entry<String, User> entry : users.entrySet()) {
				if(provera(entry.getValue(), username,  role, gender))
					rez.put(entry.getKey(), entry.getValue());
			}
					
		return rez;
	}
	
	public boolean provera(User u, String username, String role, String gender) {
		username.trim();
		role.trim();
		gender.trim();
		if(!username.equals("") && !u.getUsername().toLowerCase().contains(username.toLowerCase())) 
			return false;
		if(!role.equals("") && !u.getRole().toLowerCase().equals(role.toLowerCase())) 
			return false;
		if(!gender.equals("") && !u.getGender().toLowerCase().equals(gender.toLowerCase())) 
			return false;

		return true;
	}

}
