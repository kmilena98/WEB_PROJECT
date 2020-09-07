package model;

import java.util.HashMap;


public class Users {
	private HashMap<String, User> users;
	private String path;
	public Users(String path) {
		this.users = new HashMap<String, User>();
		this.path = path;
		users.put("a", new User("a","123","Milos","Markovic",Gender.MALE,Role.HOST));
		users.put("b", new User("b","223"," Nikola","Ivic",Gender.MALE,Role.ADMINISTRATOR));
		users.put("c", new User("c","323","Marko","Jakov",Gender.MALE,Role.GUEST));
		users.put("d", new User("d","423","Nikolina","Boskovic",Gender.FEMALE,Role.HOST));
		users.put("e", new User("e","523","Andjela","Nikcevic",Gender.FEMALE,Role.GUEST));
		users.put("f", new User("f","623","Milica","Jon",Gender.FEMALE,Role.GUEST));
		users.put("g", new User("g","723","Ivona","Zubac",Gender.FEMALE,Role.GUEST));
		users.put("h", new User("h","823","Leki","Kovacevic",Gender.MALE,Role.GUEST));
	}
	
	public HashMap<String, User> getUsers() {
		return users;
	}
	public void setUsers(HashMap<String, User> korisnici) {
		this.users = korisnici;
	}
}
