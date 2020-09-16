package model;

import java.util.ArrayList;

public class Guest extends User {

	private ArrayList<Apartment> rentedApartments = new ArrayList<Apartment>();
	private ArrayList<Reservation> bookingList = new ArrayList<Reservation>();
	
	public Guest() {
		
	}
	
	public void addReservation(Reservation r) {
		this.bookingList.add(r);
	}
	
	public void addApartment(Apartment a) {
		this.rentedApartments.add(a);
	}
	
	public Guest(String username, String password, String name, String surname, Gender gender, Role role) {
		super(username, password, name, surname, gender, role);
	}

	public ArrayList<Apartment> getRentedApartments() {
		return rentedApartments;
	}

	public void setRentedApartments(ArrayList<Apartment> rentedApartments) {
		this.rentedApartments = rentedApartments;
	}

	public ArrayList<Reservation> getBookingList() {
		return bookingList;
	}

	public void setBookingList(ArrayList<Reservation> bookingList) {
		this.bookingList = bookingList;
	}
	
	
	
	
}
