package model;

import java.util.ArrayList;
import java.util.Date;

enum RoomType{ROOM, WHOLE_APPARTMENT}

public class Apartment {

	private RoomType roomType;
	private int roomNumber;
	private int guestNumber;
	private Location location;
	private Date dateOfRenting;
	//private availability by dates
	private Host host;
	private ArrayList<Comment> coments;
	//private pictures
	private int pracePerNight;
	private int checkinTime;
	private int checkoutTime;
	private boolean active;
	private ArrayList<Amenities> amenities;
	private ArrayList<Reservation> bookingList;
	
}
