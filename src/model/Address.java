package model;

public class Address {

	private String street;
	private String place;
	private  int zipCode;
	
	public Address(String street, String place, int zipCode) {
		super();
		this.street = street;
		this.place = place;
		this.zipCode = zipCode;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public int getZipCode() {
		return zipCode;
	}

	public void setZipCode(int zipCode) {
		this.zipCode = zipCode;
	}
	
	
	
}
