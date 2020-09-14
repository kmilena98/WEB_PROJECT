package model;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import org.omg.PortableInterceptor.ACTIVE;

enum RoomType{ROOM, WHOLE_APPARTMENT}
//enum Statuss{ACTIVE, INACTIVE}

public class Apartment {

	private String id;
	private RoomType roomType;
	private int roomNumber;
	private int guestNumber;
	private Location location;
	private ArrayList<String> datesForRenting;
	private ArrayList<String> freeDatesForRenting;
	private String hostName;
	private String image;
	private double pracePerNight;
	private String checkinTime;
	private String checkoutTime;
	private boolean status;
	//private ArrayList<Comment> coments;
	private ArrayList<Amenities> amenities = new ArrayList<Amenities>();
//	private ArrayList<Reservation> bookingList;
	
	public Apartment() {
//		id = "";
//		roomNumber = 0;
//		guestNumber = 0;
//		location = "";
//		dateOfRentingStart = "";
//		dateOfRentingEnd = "";
//		hostName = "";
//		image = "";
//		pracePerNight = 0;
//		checkinTime = "";
//		checkoutTime = "";
//		status = false;
	}
	
	public Apartment(String id, RoomType roomType, int roomNumber, int guestNumber, Location location, String hostName, String image, int pracePerNight, String checkinTime, String checkoutTime,
			boolean status, ArrayList<Amenities> amenities,ArrayList<String> datesForRenting) {
		super();
		System.out.println("Konstruktor apartmana "+ id);
		this.id = id;
		this.roomType = roomType;
		this.roomNumber = roomNumber;
		this.guestNumber = guestNumber;
		this.location = location;
		this.datesForRenting = datesForRenting;
		this.hostName = hostName;
		this.image = image;
		this.pracePerNight = pracePerNight;
		this.checkinTime = checkinTime;
		this.checkoutTime = checkoutTime;
		this.status = status;
		this.amenities = amenities;
		/*this.coments = new ArrayList<Comment>();
		
		this.bookingList = new ArrayList<Reservation>();*/
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	

	public String getRoomType() {
		if(roomType.toString().equals("ROOM"))
			return "ROOM";
		else
			return "WHOLE_APPARTMENT";
	}

	public void setRoomType(RoomType roomType) {
		this.roomType = roomType;
	}

	public int getRoomNumber() {
		return roomNumber;
	}

	public void setRoomNumber(int roomNumber) {
		this.roomNumber = roomNumber;
	}

	public int getGuestNumber() {
		return guestNumber;
	}

	public void setGuestNumber(int guestNumber) {
		this.guestNumber = guestNumber;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public ArrayList<String> getDatesForRenting() {
		return datesForRenting;
	}

	public void setDatesForRenting(ArrayList<String> dateOfRentingStart) {
		this.datesForRenting = dateOfRentingStart;
	}

	public ArrayList<String> getFreeDatesForRenting() {
		return freeDatesForRenting;
	}

	public void setFreeDatesForRenting(ArrayList<String> dateOfRentingEnd) {
		this.freeDatesForRenting = dateOfRentingEnd;
	}

	public String getHost() {
		return hostName;
	}

	public void setHost(String hostName) {
		this.hostName = hostName;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public double getPracePerNight() {
		return pracePerNight;
	}

	public void setPracePerNight(double pracePerNight) {
		this.pracePerNight = pracePerNight;
	}

	public String getCheckinTime() {
		return checkinTime;
	}

	public void setCheckinTime(String checkinTime) {
		this.checkinTime = checkinTime;
	}

	public String getCheckoutTime() {
		return checkoutTime;
	}

	public void setCheckoutTime(String checkoutTime) {
		this.checkoutTime = checkoutTime;
	}

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
	public  ArrayList<Amenities> getAmenities() {
		return amenities;
	}

	public void setAmenities( ArrayList<Amenities> amenities) {
		this.amenities = amenities;
	}

	/*public ArrayList<Comment> getComents() {
		return coments;
	}

	public void setComents(ArrayList<Comment> coments) {
		this.coments = coments;
	}

	

	public ArrayList<Reservation> getBookingList() {
		return bookingList;
	}

	public void setBookingList(ArrayList<Reservation> bookingList) {
		this.bookingList = bookingList;
	}*/
	
}
