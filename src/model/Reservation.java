package model;

import java.util.Date;

enum Status{CREATED, REJECTED, CANCELED, ACCEPTED, COMPLETED}

public class Reservation {

	private Apartment apartment;
	private String bookingStartDate;
	private int numberOfNights;
	private int totalPrice;
	private String bookingMessage;
	private User guest;
	private Status status;
	
	public Reservation() {
		
	}
	
	public Reservation(Apartment apartment, String bookingStartDate, int numberOfNights, int totalPrice,
			String bookingMessage, Guest guest, Status status) {
		super();
		this.apartment = apartment;
		this.bookingStartDate = bookingStartDate;
		this.numberOfNights = numberOfNights;
		this.totalPrice = totalPrice;
		this.bookingMessage = bookingMessage;
		this.guest = guest;
		this.status = status;
	}
	
	public Reservation(Apartment apartment, String bookingStartDate, String numberOfNights, String totalPrice,
			String bookingMessage, User guest, Status status) {
		super();
		this.apartment = apartment;
		this.bookingStartDate = bookingStartDate;
		this.numberOfNights = Integer.parseInt(numberOfNights);
		this.totalPrice = Integer.parseInt(totalPrice);
		this.bookingMessage = bookingMessage;
		this.guest = guest;
		this.status = status;
	}
	
	public Apartment getApartment() {
		return apartment;
	}
	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
	}
	public String getBookingStartDate() {
		return bookingStartDate;
	}
	public void setBookingStartDate(String bookingStartDate) {
		this.bookingStartDate = bookingStartDate;
	}
	public int getNumberOfNights() {
		return numberOfNights;
	}
	public void setNumberOfNights(int numberOfNights) {
		this.numberOfNights = numberOfNights;
	}
	public int getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}
	public String getBookingMessage() {
		return bookingMessage;
	}
	public void setBookingMessage(String bookingMessage) {
		this.bookingMessage = bookingMessage;
	}
	public User getGuest() {
		return guest;
	}
	public void setGuest(Guest guest) {
		this.guest = guest;
	}
	public String getStatus() {
		if(status.toString().equals("CREATED"))
			return "CREATED";
		else if(status.toString().equals("REJECTED"))
			return "REJECTED";
		else if(status.toString().equals("CANCELED"))
			return "CANCELED";
		else if(status.toString().equals("ACCEPTED"))
			return "ACCEPTED";
		else if(status.toString().equals("COMPLETED"))
			return "COMPLETED";
		else
			return "";
	}
	
	
	public void setStatus(Status status) {
		this.status = status;
	}
	
	public void izmeniStatus(String status) {
		if(status.equals("ACCEPTED")) {
			this.status = Status.ACCEPTED;
		}else if(status.equals("CANCELED")){
			this.status = Status.CANCELED;
		}else if(status.equals("REJECTED")){
			this.status = Status.REJECTED;
		}
	}
	
}
