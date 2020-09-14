package model;

import java.util.ArrayList;



public class Host extends User {

	private ArrayList<Apartment> apartmentsForRent = new ArrayList<Apartment>();
	
	public Host() {
		
	}

	public Host(String username, String password, String name, String surname, Gender gender, Role role) {
		super(username, password, name, surname, gender, role);
	}
	

	public void addAppartment(Apartment a) {
		this.apartmentsForRent.add(a);
	}
	
	public void removeApartment(Apartment a) {
		
		for(Apartment ap : apartmentsForRent) {
			if(ap.getId().equals(a.getId())) {
				System.out.println("Objekat je uklonjen! "+ap.getId()+" drugi "+a.getId());
				this.apartmentsForRent.remove(ap);
				System.out.println("prosao!");
				break;
			}
		}
		System.out.println("Apartment je dodat u listu i sada ih ima : "+this.apartmentsForRent.size());
	}

	public ArrayList<Apartment> getApartmentsForRent() {
		return apartmentsForRent;
	}

	public void setApartmentsForRent(ArrayList<Apartment> apartmentsForRent) {
		this.apartmentsForRent = apartmentsForRent;
	}

}


