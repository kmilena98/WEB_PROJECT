Vue.component("prikazApartmanaZaGosta", {
	data: function () {
		    return {
		      apartman: null,
		      rezervacija: null,
		      user:null,
		      pocetniDatumRezervacije:null,
		      brojNocenja:null,
		      ukupnaCena : null,
		      poruka:null
		    }
	},
	mounted(){
		this.brojNocenja=1;
        axios
            .get('rest/apartmani/prikaz')
            .then(response =>{
	        	this.apartman = response.data;

	        	
    	    })
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja apartmana");
    	        alert(error.response.data);
    	    })
        axios
        .get('rest/registracija/ulogovani')
        .then(response =>{
        	this.user = response.data;

	    })
        .catch(error => {
	        alert("Doslo je do greske prilikom ucitavanja korisnika");
	        alert(error.response.data);
	    })
      
	},
	template: ` 
<div>
	
	<div class="header">
		<img class="image" src="images/l.jpg" style="width:150px;height:100px;">
		<h1>Rezervacija apartmana </h1>
		<p>Izaberite svoju najbolju ponudu iz snova!</p>
	</div>

<div class="topnav">
	<div v-if="user.role==='HOST'" >
	<a href="#/prikazApartmanaDomacin">Apartmani</a>
	<a href="#/pk">Korisnici</a>
	<a href="#/prikazRezervacijaDomacin">Rezervacije korisnika</a>
	<a href="#/aa">Dodavanje apartmana</a>
	<a href="#/showAllComment">Komentari</a>
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
	</div>
	<div v-else-if="user.role==='ADMINISTRATOR'" >
	<a href="#/ar">Apartmani</a>
	<a href="#/pk">Korisnici</a>
	<a href="#/sh">Registracija domacina</a>
	<a href="#/prikazRezervacijaAdministrator">Rezervacije korisnika</a>
	<a href="#/sadrzajApartmanaPrikaz">SadrzajApartmana</a>
	<a href="#/showAllComment">Komentari</a>
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
	</div>
	<div v-else>
	<a href="#/reservation">Apartmani</a>
	<a href="#/prikazRezervacijaGost">Moje rezervacije</a>
	<a href="#/showCommentForGuest">Komentari</a>
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
	</div>
</div>
			
	  <form accept-charset="UTF-8">
            <table class="bu" id="tabela" style="width:100%;margin-left: 100px;">
                <caption  style="font-size:25px;font-family: serif;">Pregled izabranog apartmana</caption>
              
                <tr>
                 <td>
                  <div class="post-media">
                                <a href="#"><img style="width:150px;height:100px;" v-bind:src="this.apartman.image" alt="" class="img-responsive"></a>
                   </div><!-- end media -->
                 </td> 
                    
                        
                        
                 <td>&nbsp;</td>
                        
                        
             	<td>
                <tr>
                	<div id="forme" class="dodavanjeApartmana">
		    		
                            <tr>
                            	 <tr>
                                <td align="left">ID:</td>
                                <td align="left">{{this.apartman.id}}</td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                                <td align="left">Tip apartmana:</td>
                                <td align="left">{{this.apartman.roomType}}</td>
							</tr>	
							 <tr>
                                <td align="left">Broj soba:</td>
                                <td align="left">{{this.apartman.roomNumber}}</td>
							</tr>
							<tr>
                                <td align="left">Broj gostiju:</td>
                                <td align="left">{{this.apartman.guestNumber}}</td>
							</tr>
                            <tr>
                                <td align="left">Lokacija:</td>
                                <td align="left">
                                	<tr>
                                		<td>Geografska sirina:</td>
                                		<td>{{this.apartman.location.latitude}}</td>
                                	</tr>
                                	<tr>
                                		<td>Geografska duzina:</td>
                                		<td>{{this.apartman.location.longitude}}</td>
                                	</tr>
                                	<tr>
                                		<td>Ulica:</td>
                                		<td>{{this.apartman.location.address.street}}</td>
                                	</tr>
                                	<tr>
                                		<td>Grad:</td>
                                		<td>{{this.apartman.location.address.place}}</td>
                                	</tr>
                                	<tr>
                                		<td>Postanski broj:</td>
                                		<td>{{this.apartman.location.address.zipCode}}</td>
                                	</tr>
                                </td>
                               </tr>
                            <tr>
                            	<td>Datumi za izdavanje od:</td>
                            	<td>  <tr v-for="d in this.apartman.datesForRenting">
									<label> {{d}}</label><br>
    								</tr>
    							</td>
                            	
                            </tr>
                            <tr>
                                <td align="left">Cena:</td>
                                <td align="left">{{this.apartman.pracePerNight}}</td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                                <td align="left">Vreme za prijavu:</td>
                                <td align="left">{{this.apartman.checkinTime}}</td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                             <tr>
                                <td align="left">Vreme za odjavu:</td>
                               <td align="left">{{this.apartman.checkoutTime}}</td>
                               <td>&nbsp;&nbsp;</td>
                            </tr>
                           
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                            	<td>Sadrzaj apartmana:</td>
                            </tr>
                            <tr>
                            <td>
                            <tr v-for="s in this.apartman.amenities">
									<label> {{s.name}}</label><br>
    						</tr>
                            </td>
							</tr>
                          	   			
                      </div>
					</tr>
				</td>
				
			
				
				
				<td>
					<tr>
						<td>
						 <tr>
						 <td>
                            	<tr>
                            	<td>&nbsp;</td>
                            		<td style="font-size:18px;font-family:serif;">Rezervisi:</td>
                            	</tr>
                            		<tr>
                            			<td>&nbsp;</td>
                            			<td>Pocetni datum rezervacije:</td>
                            			<td><input type="date" id="start" name="trip-start"
    										value="2018-07-22"
    										min="2018-01-01" max="2040-12-31" v-model="pocetniDatumRezervacije" style="width:208px;height:25px;"/></td>
    										<p class="message4" style="color:red;font-size:12px">{{validacijaDatuma}}</p>
    								</tr>
				 					
                           
									<tr>
										<td>&nbsp;</td>
                                		<td align="left">Broj nocenja :</td>
										 <td align="left"><input type="number"  v-model="brojNocenja"  value="1"/></td>
                                      	 <p class="message4" style="color:red;font-size:12px">{{validacijaNocenja}}</p>
									</tr>
									<tr>
								
									</tr>
									<tr>
										<td>&nbsp;</td>
										<td align="left">Poruka :</td>
										<td align="left"><input  v-model="poruka" style="width:208px;height:25px;"/></td>
                            		</tr>
                            		<tr>
                            			<td>&nbsp;</td>
										<td> <button v-on:click="rezervisi">Rezervisi</button></td>
										
                            		</tr>
									
							
						</td>
					<tr>
				</td>
               </tr>	
            </table>
               
        </form>
	
	
</div>		  
`
	,
	computed:{
		validacijaDatuma: function(){
			if(this.pocetniDatumRezervacije === '') return 'Niste uneli pocetni datum rezervacije.';
			else return null;
		},
		validacijaNocenja: function(){
			if(this.brojNocenja === '') return 'Niste uneli pocetni broj nocenja.';
			else return null;
		},
		
		
	},
	methods : {
		prikazi : function(id) {
		    axios.post('rest/apartmani/prikazApartmana')
	    	
	        .then(function (response) {
				window.location.href = '#/';

	        })
	        .catch(function (error) {
	        	alert("usao u exaption!");
	            alert(error.response.data);
		});
		},
		rezervisi : function(){
			if(this.brojNocenja>="1" && this.pocetniDatumRezervacije){
			this.ukupnaCena = this.brojNocenja*this.apartman.pracePerNight;
			
			var rezervacija = {
                	'apartment' : this.apartman,
                	'bookingStartDate':this.pocetniDatumRezervacije,
                	'numberOfNights':this.brojNocenja,
                	'totalPrice': this.ukupnaCena,
                	'bookingMessage': this.poruka,
                    'guest': this.user,
                    'status' : "CREATED",
                    
                };
			
			
			alert("Malo pre poziva");
	            axios.post('rest/reservation/addReservation',rezervacija)
                .then(function (response) {
                	alert("Uspesno ste izvrsili rezervaciju.");
                    window.location.href = "#/prikazApartmanaZaGosta";
                })
                .catch(function (error) {
                	alert("exception");
                    alert(error.response.data);
                });
			
			}else{
				alert("Niste uneli sve neophodne podatke!");
			}
		},
		logout : function() {
	    axios.post('rest/registracija/logout')
    	
        .then(function (response) {
			window.location.href = '#/';

        })
        .catch(function (error) {
        	alert("usao u exaption!");
            alert(error.response.data);
	});
	},

		
	},
});