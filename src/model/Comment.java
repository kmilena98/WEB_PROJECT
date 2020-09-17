package model;

public class Comment {

	private Guest guest;
	private String apartmentId;
	private String text;
	private int grade;
	private boolean dopusti;

	public Comment() {}
	
	public Comment(Guest guest, String apartmentId, String text, int grade, boolean dopusti) {
		super();
		this.guest = guest;
		this.apartmentId = apartmentId;
		this.text = text;
		this.grade = grade;
		this.dopusti = dopusti;
		
	}
	public Guest getGuest() {
		return guest;
	}
	public void setGuest(Guest guest) {
		this.guest = guest;
	}
	public String getApartmentId() {
		return apartmentId;
	}
	public void setApartmentId(String apartmentId) {
		this.apartmentId = apartmentId;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public int getGrade() {
		return grade;
	}
	public void setGrade(int grade) {
		this.grade = grade;
	}

	public boolean isDopusti() {
		return dopusti;
	}

	public void setDopusti(boolean dopusti) {
		this.dopusti = dopusti;
	}
	
	
}
