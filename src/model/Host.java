package model;

import java.util.ArrayList;

public class Host extends User {

	private ArrayList<Apartment> apartmentsForRent;

	public Host(String username, String password, String name, String surname, Gender gender, Role role, ArrayList<Apartment> apartmentsForRent) {
		super(username, password, name, surname, gender, role);
		this.apartmentsForRent = apartmentsForRent;
	}
}
