package model;

enum Gender{MALE, FEMALE}
enum Role{ADMINISTRATOR, HOST, GUEST}

public class User {

	private String username;
	private String password;
	private String name;
	private String surname;
	private Gender gender;
	private Role role;
	
	public User() {
		this.username = "";
		this.password = "";
		this.name = "";
		this.surname = "";
	}
	public User(String username, String password, String name, String surname) {
		//super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		
	}
	
	public User(String username, String password, String name, String surname, Gender gender, Role role) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.role = role;
	}
	


	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}
	public Gender toEnumGender(String gender) {
		if(gender.equals("MALE"))
			return Gender.MALE;
		else
			return Gender.FEMALE;
	}
	
	public Role toEnumRole(String gender) {
		if(gender.equals("ADMINISTRATOR"))
			return Role.ADMINISTRATOR;
		else if(gender.equals("GUEST")){
			return Role.GUEST;
		}else {
			return Role.HOST;
		}
	}

	/*public Gender getGender() {
		return gender;
	}*/
	
	public String getGender() {
		if(gender.toString().equals("MALE"))
			return "MALE";
		else
			return "FEMALE";
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public String getRole() {
		if(role.toString().contains("HOST"))
			return "HOST";
		else if(role.toString().contains("ADMINISTRATOR"))
			return "ADMINISTRATOR";
		else
			return "GUEST";
	}
	
	public void setRole(Role role) {
		this.role = role;
	}
	
}
