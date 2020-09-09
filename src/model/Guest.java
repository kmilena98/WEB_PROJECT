package model;

import java.util.ArrayList;

public class Guest extends User {

	private ArrayList<Apartment> rentedApartments;
	private ArrayList<Reservation> bookingList;
	
	public Guest(String username, String password, String name, String surname, Gender gender, Role role) {
		super(username, password, name, surname, gender, role);
		this.rentedApartments = new ArrayList<Apartment>();
		this.bookingList = new ArrayList<Reservation>();
	}
	
	
	
}
