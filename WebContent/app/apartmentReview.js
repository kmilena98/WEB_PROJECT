
Vue.component("ar", {
	data: function () {
		    return {
		      apartmants: null,
		      user:null,
		      opt:""
		    }
	},
	mounted(){
		opt="RASTUCE";
        axios
            .get('rest/apartmani/ap')
            .then(response =>{
	        	this.apartmants = response.data;
	        	/*alert("Usao gde treba da udje!");*/
    	    })
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja apartmana");
    	        alert(error.response.data);
    	    })
        axios
        .get('rest/registracija/ulogovani')
        .then(response =>{
        	this.user = response.data;
        	/*alert("Usao gde treba da udje!");*/
	    })
        .catch(error => {
	        alert("Doslo je do greske prilikom ucitavanja apartmana");
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
		
		<button type="button" onclick="window.location.href='#/us';" type="button" class="button" id="t01">Pretrazi</button>
		 
		 <select  v-model="opt" v-on:click="sortiraj(opt)">
				    <option>OPADAJUCE</option>
				    <option>RASTUCE</option>
				    </select>
	  <form accept-charset="UTF-8">
            <table class="bla" id="tabela" style="width:50%;">
                <caption>Pregled apartmana</caption>
              
                 <tr v-for="ap in apartmants">
                  <div class="post-media">
                                <a href="#"><img style="width:250px;height:200px;" v-bind:src="ap.image" alt="" class="img-responsive"></a>
                   </div><!-- end media -->
                            
                <td>
                	<tr><td>Ulica : {{ap.location.address.street}}</td></tr>
					<tr><td>Grad :{{ap.location.address.place}}</td></tr>
					<tr><td>Zip kod :{{ap.location.address.zipCode}}</td></tr>
					<tr><td>Cena :{{ap.pracePerNight}}</td>
				</td>
				<br></br>
                <td>
               
					<button type="button" v-on:click.prevent="prikazi(ap)">Prikazi</button>
				   
					</td>
                </tr>
                
						
            </table>            
        </form>
	
	
</div>		  
`
	, 
	methods : {
		sortiraj: function(m) {
			alert("Usao!");
		    function compare(a, b) {
		  if(m=="RASTUCE"){
		      if (a.pracePerNight < b.pracePerNight)
		        return -1;
		      if (a.pracePerNight > b.pracePerNight)
		        return 1;
		      return 0;
		    }
		  else{
			      if (a.pracePerNight < b.pracePerNight)
			        return 1;
			      if (a.pracePerNight > b.pracePerNight)
			        return -1;
			      return 0;
			    }
		  }
		    return this.apartmants.sort(compare);

	  },
			
		
		prikazi : function(a) {
		    axios.post('rest/apartmani/prikazApartmana',a)
	    	
	        .then(function (response) {
				window.location.href = '#/prikazApartmana';

	        })
	        .catch(function (error) {
	            alert(error.response.data);
		});
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


Vue.component("prikazApartmana", {
	data: function () {
		    return {
		      apartman: null,
		      user:null
		    }
	},
	mounted(){
        axios
            .get('rest/apartmani/prikaz')
            .then(response =>{
	        	this.apartman = response.data;
    	    })
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja apartmana");
    	    })
        axios
        .get('rest/registracija/ulogovani')
        .then(response =>{
        	this.user = response.data;
	    })
        .catch(error => {
	        alert("Doslo je do greske prilikom ucitavanja korisnika");
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
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
	</div>
</div>
		<div v-if="this.user.role==='GUEST'">
		<button type="button" onclick="window.location.href='#/izmenaApartmana';" class="button" id="t01">Rezervisi</button>
		</div>
		<div v-else-if="this.user.role==='ADMINISTRATOR'">
		<button type="button" onclick="window.location.href='#/izmenaApartmana';" class="button" id="t01">Izmeni</button>
		<button type="button" 	v-on:click.prevent="obrisi" class="button" id="t01">Obrisi</button>
		<button type="button" v-on:click.prevent="posalji(apartman)" class="button" id="t01" style="width:120px;height:60px;">Prikaz komentar</button>
		</div>
		<div v-else>
		<button type="button" onclick="window.location.href='#/izmenaApartmana';" class="button" id="t01">Izmeni</button>
		<button type="button" v-on:click.prevent="posalji(apartman)" class="button" id="t01" style="width:120px;height:60px;">Prikaz komentar</button>
		</div>
	  <form accept-charset="UTF-8">
            <table class="bla" id="tabela" style="width:100%;">
                <caption>Pregled izabranog apartmana</caption>
              
         <tr>
                 <td>
                 
                  <div class="post-media">
                                <a href="#"><img style="width:350px;height:200px;" v-bind:src="this.apartman.image" alt="" class="img-responsive"></a>
                   </div><!-- end media -->
                 </td>        
             <td >
               
                <tr>
                	<div >
		    		
                            <tr>
                            	
                                <td align="left">ID:</td>
                                <td align="left">{{this.apartman.id}}</td>
                                &nbsp;&nbsp;
                            </tr>
                            <tr>
                                <td align="left">Tip apartmana:</td>
                                <td align="left">{{this.apartman.roomType}}</td>
                                  <td>&nbsp;&nbsp;</td>
							</tr>	
							 <tr>
                                <td align="left">Broj soba:</td>
                                <td align="left">{{this.apartman.roomNumber}}</td>
                                  <td>&nbsp;&nbsp;</td>
							</tr>
							<tr>
                                <td align="left">Broj gostiju:</td>
                                <td align="left">{{this.apartman.guestNumber}}</td>
                                  <td>&nbsp;&nbsp;</td>
							</tr>
							<br></br>
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
                               <br></br>
                            <tr>
                            	<td>Datumi za izdavanje od:</td>
                            	<td>  <tr v-for="d in this.apartman.datesForRenting">
									<label> {{d | dateFormat('DD.MM>YYYY')}}</label><br>
    							
    							</td>
                            	
                            </tr>
                            <br></br>
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
               </tr>
                
						
            </table>            
        </form>
	
	
</div>		  
`
	,
	methods : {
		posalji : function(apartman){
			axios.post('rest/apartmani/prikazApartmana', apartman)
			.then(function (response) {
				window.location.href = '#/showComment';
	        })
	        .catch(function (error) {
	        	alert("usao u exaption!");
		});
		},
		prikazi : function(id) {
			/*alert("dosao"+id);*/
		    axios.post('rest/apartmani/prikazApartmana')
	    	
	        .then(function (response) {
				window.location.href = '#/';

	        })
	        .catch(function (error) {
	        	alert("usao u exaption!");
		});
		},
		obrisi : function() {
		    axios.post('rest/apartmani/obrisi',this.apartman)
	    	
	        .then(function (response) {
				window.location.href = '#/ar';

	        })
	        .catch(function (error) {
	        	alert("usao u exaption!");
	            alert(error.response.data);
		});
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

Vue.component("izmenaApartmana", {
	data: function(){
		return {
		user:null,
		amenities: null,
		apartman: undefined,
		id: undefined,
		roomType: undefined,
        roomNumber: undefined,
        guestNumber: undefined,
        location: undefined,
        latitude: undefined,
        address: undefined,
        longitude: undefined,
        street: undefined,
        place: undefined,
        zipCode: undefined,
        datesForRenting: undefined,
        host: undefined,
        previewImage: undefined,
        pracePerNight: undefined,
        checkinTime: undefined,
        checkoutTime: undefined,
        allAmenities : undefined,
        status: undefined,
        dateForRenting: undefined
        /*comments: null*/
    }},
    mounted(){
    	 axios
         .get('rest/apartmani/prikaz')
         .then(response =>{
	        	this.apartman = response.data;
	        	this.id= this.apartman.id,
	        	this.roomType= this.apartman.roomType,
	            this.roomNumber= this.apartman.roomNumber,
	            this.guestNumber= this.apartman.guestNumber,
	            this.latitude= this.apartman.location.latitude,
	            this.longitude=this.apartman.location.longitude,
	            this.street= this.apartman.location.address.street,
	            this.place= this.apartman.location.address.place,
	            this.zipCode =this.apartman.location.address.zipCode,
	            this.datesForRenting = this.apartman.datesForRenting,
	            this.host= this.apartman.host,
	            this.pracePerNight= this.apartman.pracePerNight,
	            this.checkinTime= this.apartman.checkinTime,
	            this.checkoutTime =this.apartman.checkoutTime,
	            this.status= this.apartman.status,
	            this.previewImage =this.apartman.image,
	            this.selectedAmenities = this.apartman.amenities,
	            this.status = this.apartman.status
 	    })
	        .catch(error => {
 	        alert("Doslo je do greske prilikom ucitavanja apartmana");
 	        alert(error.response.data);
 	    })
    	 axios
         .get('rest/sadrzaj/prikazSadrzaja')
         .then(response =>{
         	this.allAmenities = response.data;
         })
         .catch(error => {
             alert("Doslo je do greske prilikom ucitavanja kategorija");
         });
    	 axios
         .get('rest/registracija/ulogovani')
         .then(response =>{
         	this.user = response.data;
 	    })
         .catch(error => {
 	        alert("Doslo je do greske prilikom ucitavanja korisnika");
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
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
	</div>
</div>

    <div class="naslov">
    	<h2>Dodaj apartman</h2>
    </div>

		    	<div id="forme" class="dodavanjeApartmana">
		    		<form accept-charset="UTF-8">
            		    <table align="center">
                            <tr>
                            	 <tr>
                                <td align="left">ID:</td>
                                <td align="left">{{this.id}}</td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                                <td align="left">Tip apartmana:</td>
                                <td align="left">
                                <select class="cb" v-model="roomType"  style="width:208px;height:25px;">
									<option selected="selected">ROOM</option>
									<option>WHOLE_APPARTMENT</option>
								</select>
								</td>
							</tr>	
							 <tr>
                                <td align="left">Broj soba:</td>
                                <td align="left">
                                	<select class="cb" v-model="roomNumber" style="width:208px;height:25px;">
										<option selected="selected">1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</select>
								</td>
							</tr>
							<tr>
                                <td align="left">Broj gostiju:</td>
                                <td align="left">
                                	<select class="cb" v-model="guestNumber" style="width:208px;height:25px;">
										<option selected="selected">1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</select>
								</td>
							</tr>
                            <tr>
                                <td align="left">Lokacija:</td>
                                <td align="left">
                                	<tr>
                                		<td>Geografska sirina:</td>
                                		<td><input type="text" v-model="latitude" style="width:208px;height:25px;"/></td>
                                	</tr>
                                	<tr><td>&nbsp;</td>
				 						<td align="left" style="color: red;font-size:12px">{{cenaValidacija}}</td>
                 					</tr>
                                	<tr>
                                		<td>Geografska duzina:</td>
                                		<td><input type="text" v-model="longitude" style="width:208px;height:25px;"/></td>
                                	</tr>
                                	<tr><td>&nbsp;</td>
				 						<td align="left" style="color: red;font-size:12px">{{cenaValidacija}}</td>
                 					</tr>
                                	<tr>
                                		<td>Ulica:</td>
                                		<td><input type="text" v-model="street" style="width:208px;height:25px;"/></td>
                                	</tr>
                                	<tr><td>&nbsp;</td>
				 						<td align="left" style="color: red;font-size:12px">{{cenaValidacija}}</td>
                 					</tr>
                                	<tr>
                                		<td>Grad:</td>
                                		<td><input type="text" v-model="place" style="width:208px;height:25px;"/></td>
                                	</tr>
                                	<tr><td>&nbsp;</td>
				 						<td align="left" style="color: red;font-size:12px">{{cenaValidacija}}</td>
                 					</tr>
                                	<tr>
                                		<td>Postanski broj:</td>
                                		<td><input type="text" v-model="zipCode" style="width:208px;height:25px;"/></td>
                                	</tr>
                                	<tr><td>&nbsp;</td>
				 						<td align="left" style="color: red;font-size:12px">{{cenaValidacija}}</td>
                 					</tr>
                                </td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                             <tr>
                            	<td>Sadrzaj apartmana:</td>
                            </tr>
                            <tr>
                           
                            	<td>Datum za izdavanje od:</td>
                            	<td><tr><td><input type="date" id="start" name="trip-start"
    								value="2018-07-22"
    								min="2018-01-01" max="2040-12-31" v-model="dateForRenting" style="width:208px;height:25px;"/>
    							</td>
    							<td><button v-on:click.prevent="dodajDatum(dateForRenting)">Dodaj</button></td></tr>
    							
    						</tr>
    						<tr>	
    							
    								<td>Izbrisi vec postojece:</td>
    							<td>
                            		<tr v-for="a in  this.datesForRenting">
									<input type="checkbox" id="s" name="vehicle1" :value="a" v-model="datesForRenting">
									
									<span>{{a}}</span><br>
    								
    								</tr>
   
    						
    							</td>
                            </tr>
                           
                            <tr>
                                <td align="left">Cena:</td>
                                <td align="left"><input type="text" v-model="pracePerNight" style="width:208px;height:25px;"/></td>
                                <td>&nbsp;&nbsp;</td>
                                </tr>
				 			<tr><td>&nbsp;</td>
				 				<td align="left" style="color: red;font-size:12px">{{cenaValidacija}}</td>
                 			</tr>
                            </tr>
                            <tr>
                                <td align="left">Vreme za prijavu:</td>
                                <td align="left"><input type="time" v-model="checkinTime" style="width:208px;height:25px;"/></td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                             <tr>
                                <td align="left">Vreme za odjavu:</td>
                                <td align="left"><input type="time" v-model="checkoutTime" style="width:208px;height:25px;"/></td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                             
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                             	<td></td>
                                <td align="left"><input type="file" accept="image/*" @change=uploadImage></td>
                            </tr>
                            <td align="left">Slika:</td>
                            <td><img  :src = "previewImage" style = "display:flex" width="150" heigh="100" /></td>
                            <tr>
                            </tr>
                            <tr>
                                <td align="left">Status apartmana:</td>
                                <td align="left">
                                <select class="cb" v-model="status"  style="width:208px;height:25px;">
									<option selected="selected">ACTIVE</option>
									<option>INACTIVE</option>
								</select>
								</td>
							</tr>	
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                            
                            <tr>
                            	<td>Sadrzaj apartmana:</td>
                            </tr>
                            <tr>
                            	<td>
                            		<tr v-for="s in this.allAmenities">
									<input type="checkbox" id="s.name" name="vehicle1" :value="{id : s.id,
																								name : s.name}" v-model="selectedAmenities">
									
									<span>{{s.name}}</span><br>
    								
    								</tr>
    							</td>
							</tr>
                                   
                          
                            <tr>
                                <td align="right" >
                                <button v-on:click.prevent="dodajApartman">Potvrdi</button>
                                <button onclick="window.location.href='#/prikazApartmana'">Odustani</button></td>
                            </tr>		   			
                        </table>            
                    </form> 
			</div>
    </div>`,
	computed: {
		 cenaValidacija: function(){
				if(this.id === null || this.pracePerNight === '') return 'Cena je je obavezno polje.';
				else if(Number(this.id) < 0) return 'Cena ne moze biti negativan broj.'; 
				else return null;
     },
		geografskaSirinaValidacija: function(){
			if(this.latitude === '') return 'Niste unijeli geografsku sirinu.';
			else return null;
		},
		geografskaDuzinaValidacija: function(){
			if(this.longitude === '') return 'Niste unijeli geografsku duzinu.';
			else return null;
		},
		ulicaValidacija: function(){
			if(this.street === '') return 'Niste unijeli ulicu.';
			else return null;
		},
		gradValidacija: function(){
			if(this.place != undefined && this.place.length > 0){
				let placeMatch = this.place.match('[A-Za-z ]*');
				if(placeMatch != this.place) return 'Grad se mora sastojati samo od slova';
				else if(this.place[0].match('[A-Z]') === null) return 'Grad mora pocinjati velikim slovom'; 
			}
			else if(this.place === '') return 'Niste unijeli grad.';
			else return null;
		},
		postanskiBrojValidacija: function(){
			if(this.zipCode === '') return 'Niste unijeli postanski broj.';
			else return null;
		},
        cenaValidacija: function(){
				if(this.pracePerNight === null || this.pracePerNight === '') return 'Cena je je obavezno polje.';
				else if(Number(this.pracePerNight) < 0) return 'Cena ne moze biti negativan broj.'; 
				else return null;
        },
        datumValidacija1: function(){
				if(this.dateOfRentingStart === '') return 'Datum je obavezno polje.';
				else if(this.manji1(this.dateOfRentingStart)) return 'Datum  ne moze biti manji od danasnjeg';
				else return null;
        },
        datumValidacija2: function(){
			if(this.dateOfRentingEnd === '') return 'Datum je obavezno polje.';
			else if(this.manji2(this.dateOfRentingStart, this.dateOfRentingEnd)) return 'Ovaj datum ne moze biti manji od datuma pocetka';
			else return null;
    },
        
        slikaValidacija: function(){
            if(this.previewImage === '') return 'Slika je obavezno polje.';
            else return null;
        },
    },
    methods: {
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
		manji1: function(datum){
            var date = new Date();
			var month = ('0' + (date.getMonth() + 1)).slice(-2);
			var day = ('0' + date.getDate()).slice(-2);
			var year = date.getFullYear();
			if(datum != undefined){
				datum = datum.split('-');
				if(datum[0] < godina) return true;
				if(datum[0] > godina) return false;
				if(datum[1] < mjesec) return true;
				if(datum[1] > mjesec) return false;
				if(datum[2] <= dan) return true;
				return false;
			}
			return false;
		},
		manji2: function(datum1, datum2){
           /* var date = new Date();
			var month = ('0' + (date.getMonth() + 1)).slice(-2);
			var day = ('0' + date.getDate()).slice(-2);
			var year = date.getFullYear();*/
			if(datum1 != undefined && datum2 != undefined){
				datum1 = datum.split('-');
				datum2 = datum.split('-');
				if(datum2[0] < datum1[0]) return true;
				if(datum2[0] > datum1[0]) return false;
				if(datum2[1] < datum1[1]) return true;
				if(datum2[1] > datum1[1]) return false;
				if(datum2[2] <= datum1[2]) return true;
				return false;
			}
			return false;
		},
		dodajDatum(dateForRenting){
			this.datesForRenting.push(dateForRenting);

		},
        uploadImage(e){
            const im = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(im);
            reader.onload = e =>{
            this.previewImage = e.target.result;
            };
        },
        odustani: function(){
            window.location.href = "#/";
        },
        
    	dodajApartman(){
            /*var date = new Date();
			var month = ('0' + (date.getMonth() + 1)).slice(-2);
			var day = ('0' + date.getDate()).slice(-2);
			var year = date.getFullYear();
			var datum = year + '-' + month + '-' + day;*/

           /* var ok = true;
				
                let hostMatch = '';
                                      
                if(this.lokacija != undefined) this.lokacija.trim();
                else this.lokacija = '';

				if(this.hostName != undefined) {
					this.hostName.trim();
					hostMatch = this.hostName.match('[A-Za-z ]*');
				}
                else this.hostName = '';*/
                
               /* if(this.kat === undefined){
                    this.kat = '';
                }*/
                /*if(this.opis === undefined){
                    this.opis = '';
                }
                else this.opis.trim();*/

               /* if(this.pracePerNight === undefined){
                    this.pracePerNight = null;
                }

                if(this.dateOfRentingStart === undefined){
                    this.dateOfRentingStart = '';
                }
                if(this.dateOfRentingEnd === undefined){
                    this.dateOfRentingEnd = '';
                }

                if(this.previewImage === null){
                    this.previewImage = '';
                }
		
				if(this.location === undefined || this.location === '' ||
				   this.pracePerNight === undefined || this.pracePerNight === '' || this.dateOfRentingStart === undefined || this.dateOfRentingStart === '' ||
				   this.dateOfRentingEnd === undefined || this.dateOfRentingEnd === '' || this.hostName === undefined || this.hostName === '' || this.previewImage ===''){
					ok = false;
				}
				else if((hostMatch != this.host) || (this.hostName[0].match('[A-Z]') === null)){
					ok = false;
				}
				else if(this.manji(this.dateOfRentingStart, this.dateOfRentingEnd) || (Number(this.pracePerNight) < 0)){
					ok = false;
				}*/
				
				/*if(ok){*/
        	
        			var adresa = {
        					 'street': this.street,
                             'place': this.place,
                             'zipCode': this.zipCode,	
        			}
        			var lokacija = {
        					
        					'latitude': this.latitude,
                            'longitude': this.longitude,
                            'address': adresa,
        			}
        			
                     var ap = {
                    	'id' : this.id,
                        'roomType': this.roomType,
                        'roomNumber': this.roomNumber,
                        'guestNumber': this.guestNumber,
                        'location' : lokacija,
                        'datesForRenting' : this.datesForRenting,
                        'host' : this.host,
                        'image' : this.previewImage,
                        'pracePerNight' : this.pracePerNight,
                        'checkinTime' : this.checkinTime,
                        'checkoutTime' : this.checkoutTime,
                        'status' : this.status,
                        'amenities' : this.selectedAmenities,
                        
                    };
		            axios.post('rest/apartmani/edit', ap)
                    .then(function (response) {
                    	alert("Apartman je uspesno editovan!");
                        window.location.href = "#/prikazApartmana";
                    })
                    .catch(function (error) {
                    	alert("exception");
                        alert(error.response.data);
                    });
				/*}*/
			}
		}
	});

Vue.component("prikazApartmanaZaDomacina", {
	data: function () {
		    return {
		      aktivniApartmani: null,
		      neaktivniApartmani:null,
		      user:null,
		      opt:''
		      
		    }
	},
	mounted(){
		this.opt="OPADAJUCE";
        axios
            .get('rest/apartmani/prikazZaDomacinaAktivni')
            .then(response =>{
	        	this.aktivniApartmani = response.data;
    	    })
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja apartmana");
    	        alert(error.response.data);
    	    });
        
        axios
        .get('rest/apartmani/prikazZaDomacinaNeaktivni')
        .then(response =>{
        	this.neaktivniApartmani = response.data;
	    })
        .catch(error => {
	        alert("Doslo je do greske prilikom ucitavanja apartmana");
	        alert(error.response.data);
	    });
        axios
        .get('rest/registracija/ulogovani')
        .then(response =>{
        	this.user = response.data;
	    })
        .catch(error => {
	        alert("Doslo je do greske prilikom ucitavanja korisnika");
	    })
	},
	template: ` 
<div>
	
	<div class="header">
		<img class="image" src="images/l.jpg" style="width:350px;height:200px;">
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
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
	</div>
</div>

		<button type="button" onclick="window.location.href='#/izmenaApartmana';" class="button" id="t01">Izmeni</button>
		
	   <form accept-charset="UTF-8">
            <table class="bla" id="tabela" style="width:50%;">
                <caption>Pregled apartmana</caption>
              <br></br>
                <p>Aktivni apartmani :</p>
                <br></br>
                <select  v-model="opt" v-on:click="sortiraj(opt)">
				    <option>OPADAJUCE</option>
				    <option>RASTUCE</option>
				    </select>
				    <br></br>
                 <tr v-for="ap in aktivniApartmani">
                  
                  <div class="post-media">
                                <a href="#"><img style="width:400px;height:250px;" v-bind:src="ap.image" alt="" class="img-responsive"></a>
                   </div><!-- end media -->
                            
                <td>
                	<tr><td>Ulica : {{ap.location.address.street}}</td></tr>
					<tr><td>Grad : {{ap.location.address.place}}</td></tr>
					<tr><td>Postanski broj : {{ap.location.address.zipCode}}</td></tr>
					<tr><td>Cena : {{ap.pracePerNight}} $</td>
			
				</td>
                <td>
					<button type="button" v-on:click.prevent="prikazi(ap)">Prikazi</button>
				</td>
                </tr>
                <br></br>
                <p>Neaktivni apartmani :</p>
                <br></br>
                <tr v-for="ap in neaktivniApartmani">
                  <div class="post-media">
                                <a href="#"><img style="width:400px;height:250px;" v-bind:src="ap.image" alt="" class="img-responsive"></a>
                   </div><!-- end media -->
                            
                <td>
                	<tr><td>Ulica : {{ap.location.address.street}}</td></tr>
					<tr><td>Grad : {{ap.location.address.place}}</td></tr>
					<tr><td>Postanski broj :{{ap.location.address.zipCode}}</td></tr>
					<tr><td>Cena : {{ap.pracePerNight}} $</td>
			
				</td>
                <td>
					<button type="button" v-on:click.prevent="prikazi(ap)">Prikazi</button>
				</td>
                </tr>
                
						
            </table>            
        </form>
	
	
</div>		  
`
	, 
	methods : {
		sortiraj: function(m) {
		    function compare(a, b) {
				  if(m=="RASTUCE"){
				      if (a.pracePerNight < b.pracePerNight)
				        return -1;
				      if (a.pracePerNight > b.pracePerNight)
				        return 1;
				      return 0;
				    }
				  else{
					      if (a.pracePerNight < b.pracePerNight)
					        return 1;
					      if (a.pracePerNight > b.pracePerNight)
					        return -1;
					      return 0;
					    }
				  }
				    return this.aktivniApartmani.sort(compare);

			  },
		prikazi : function(a) {
			/*alert("dosao"+id);*/
		    axios.post('rest/apartmani/prikazApartmana',a)
	    	
	        .then(function (response) {
				window.location.href = '#/prikazApartmana';

	        })
	        .catch(function (error) {
	        	alert("usao u exaption!");
	            alert(error.response.data);
		});
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





/*Pretraga apartmana  za sve uloge*/

var USERS;

Vue.component("us", {
	data: function () {
		    return {
		      username: undefined,
		      role: undefined,
		      gender: undefined,
		      user:null
		    }
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
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
	</div>
</div>


	  <form accept-charset="UTF-8">
            <table class="pretraga" style="width:80%">
               
                <tr>
                    <td align="right">Korisnicko ime:</td>
                    <td>&nbsp;</td>
                    <td align="left"><input type="text" id="lozinka" v-model="username"/></td>
                    <td>&nbsp;</td>
                </tr>
				 <tr><td>&nbsp;</td><td>&nbsp;</td>
                    <td align="left" style="color: red"></td>
				 </tr>
                <tr>
                    <td align="right">Uloga:</td>
                    <td>&nbsp;</td>
                    <td align="left">
                    	<select class="cb" v-model="role" style="width:208px;height:30px;">
							<option>ADMINISTRATOR</option>
							<option>HOST</option>
							<option>GUEST</option>
						</select></td>
                    <td>&nbsp;</td>
                </tr>
				 	<tr><td>&nbsp;</td><td>&nbsp;</td>
				 	<td align="left" style="color: red"></td>
                 </tr>
                <tr>
                    <td align="right">Pol:</td>
                    <td>&nbsp;</td>
                    <td align="left">
                    	<select class="cb" v-model="gender" style="width:208px;height:30px;">
							<option>MALE</option>
							<option>FEMALE</option>
						</select></td>
                    </td>
                    <td>&nbsp;</td>
                </tr> 
                <tr>
                	<td>&nbsp;</td><td>&nbsp;</td>
				 	<td align="left" style="color: red"></td>
                </tr>
				
                <tr>
             
                	<td></td>
					<td>&nbsp;</td>
                    	<td align="left">
                    	<button v-on:click.prevent="pretrazi">Pretrazi</button>
                    	
                    	<button onclick="window.location.href='#/pk'">Odustani</button></td>
                </tr>
               
						
            </table>            
        </form>
	
	
</div>		  
`
	, 
	mounted(){
		axios
        .get('rest/registracija/ulogovani')
        .then(response =>{
        	this.user = response.data;
	    })
        .catch(error => {
	        alert("Doslo je do greske prilikom ucitavanja korisnika");
	    })
	},
	methods : {
		
		pretrazi: function(){
            var user = {
                'username': this.username,
                'password': '',
                'name': '',
                'surname': '',
                'role': this.role,
                'gender': this.gender
            }
            axios.post('rest/registracija/pretraga', user)
            .then(function (response) {
            	USERS = response.data;
   				window.location.href = '#/ush';
            })
            .catch(function (error) {
                  alert("Doslo je do greske prilikom pretrage");
                  alert(error.response.data);
            });
        },
		
		logout : function() {
	    axios.post('rest/registracija/logout')
    	
        .then(function (response) {
			window.location.href = '#/';

        })
        .catch(function (error) {
            alert(error.response.data);
	});
	},

		
	},
});

Vue.component("ush", {
	data: function () {
		    return {
		    	users: USERS,
		    	user:null
		    }
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
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
	</div>
</div>

		<button type="button" onclick="window.location.href='#/us';" type="button" class="button" id="t01">Pretrazi</button>

	  <form accept-charset="UTF-8">
            <table class="t" id="tabela" style="width:80%">
                <caption>Pregled korisnika</caption>
                <tr>
                    <td>Korisnicko ime</td>
                 	<td align="right">Ime</td>                    
                     <td align="right">Prezime</td>
                     <td align="right">Uloga</td>
                     <td align="right">Pol</td>
                </tr>
                
                <tr v-for="u in users">
                <td>{{u.username}}</td>
                <td>{{u.name}}</td>
                <td>{{u.surname}}</td>
                <td>{{u.role}}</td>
                <td>{{u.gender}}</td>
                </tr>
						
            </table>            
        </form>
	
	
</div>		  
`
	, 
	mounted(){
		axios
        .get('rest/registracija/ulogovani')
        .then(response =>{
        	this.user = response.data;
	    })
        .catch(error => {
	        alert("Doslo je do greske prilikom ucitavanja korisnika");
	    })
	},
	methods : {
		
		logout : function() {
	    axios.post('rest/registracija/logout')
    	
        .then(function (response) {
			window.location.href = '#/';

        })
        .catch(function (error) {
            alert(error.response.data);
	});
	},

		
	},
});

/*Pretraga apartmana  za sve uloge*/

var APARTMANI;

Vue.component("pretragaApartmana", {
	data: function () {
		    return {
		      username: undefined,
		      role: undefined,
		      gender: undefined,
		      user:null,
		      
		      datumOd:null,
		      datumDo:null,
		      grad:null,
		      cenaOd:null,
		      cenaDo:null,
		      brojSobaOd:null,
		      brojSobaDo:null,
		      brojOsoba:null
		      
		      
		    }
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
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
	</div>
</div>


	  <form accept-charset="UTF-8">
	  <p style=" text-align:center;">Pretraga apartmana</p>
            <table class="pretraga" style="margin-left:auto;margin-right:auto;width:40%">
               
                <tr>
                    <td align="right">Datum dolaska:</td>
                    <td>&nbsp;</td>
                    <td><input type="date" id="start" name="trip-start"
    										value="2018-07-22"
    										min="2018-01-01" max="2040-12-31" v-model="datumOd" style="width:208px;height:25px;"/></td>
                    <td>&nbsp;</td>
                    <td align="right">Datum odlaska:</td>
                    <td>&nbsp;</td>
                    <td><input type="date" id="start" name="trip-start"
    										value="2018-07-22"
    										min="2018-01-01" max="2040-12-31" v-model="datumDo" style="width:208px;height:25px;"/></td>

                    <td>&nbsp;</td>
                </tr>
                <tr>
                 	<td align="right">Grad:</td>
                    <td>&nbsp;</td>
                    <td align="left"><input type="text" id="lozinka" v-model="grad"/></td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                 	<td align="right">Cena od:</td>
                    <td>&nbsp;</td>
                    <td align="left"><input type="number" id="lozinka" v-model="cenaOd"/></td>
                    <td>&nbsp;</td>
                    <td align="right">Cena do:</td>
                    <td>&nbsp;</td>
                    <td align="left"><input type="number" id="lozinka" v-model="cenaDo"/></td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                 	<td align="right">Broj soba od:</td>
                    <td>&nbsp;</td>
                    <td align="left"><input type="number" id="lozinka" v-model="brojSobaOd"/></td>
                    <td>&nbsp;</td>
                    <td align="right">Broj soba do:</td>
                    <td>&nbsp;</td>
                    <td align="left"><input type="number" id="lozinka" v-model="brojSobaDo"/></td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                 	<td align="right">Broj osoba u apartmanu:</td>
                    <td>&nbsp;</td>
                    <td align="left"><input type="number" id="lozinka" v-model="brojOsoba"/></td>
                    <td>&nbsp;</td>
                </tr>
				 <tr><td>&nbsp;</td><td>&nbsp;</td>
                  
                <tr>
             
                	<td></td>
					<td>&nbsp;</td>
                    	<td align="left">
                    	<button v-on:click.prevent="pretrazi">Pretrazi</button>
                    	
                    	<button onclick="window.location.href='#/pk'">Odustani</button></td>
                </tr>
               
						
            </table>            
        </form>
	
	
</div>		  
`
	, 
	mounted(){
		axios
        .get('rest/registracija/ulogovani')
        .then(response =>{
        	this.user = response.data;
	    })
        .catch(error => {
	        alert("Doslo je do greske prilikom ucitavanja korisnika");
	    })
	},
	methods : {
		
		pretrazi: function(){
           
            
            var paramentri = this.datumOd + ";" + this.datumDo + ";" + this.grad + ";" + this.cenaOd + ";" + this.cenaDo + ";" + this.brojSobaOd + ";" + this.brojSobaDo + ";" + this.brojOsoba;
            
            if(this.user.role == "ADMINISTRATOR"){
            	axios.get('rest/apartmani/pretragaApartmana', {params:{naziv:paramentri}})
            	.then(function (response) {
            		APARTMANI = response.data;
            		window.location.href = '#/prikazPretrageApartmana';
            	})
            	.catch(function (error) {
            		alert("Doslo je do greske prilikom pretrage");
            		alert(error.response.data);
            	});
            }else{
            	axios.get('rest/apartmani/pretragaApartmanaZaDomacina', {params:{naziv:paramentri}})
            	.then(function (response) {
            		APARTMANI = response.data;
            		window.location.href = '#/prikazPretrageApartmana';
            	})
            	.catch(function (error) {
            		alert("Doslo je do greske prilikom pretrage");
            		alert(error.response.data);
            	});
            }
        },
		
		logout : function() {
	    axios.post('rest/registracija/logout')
    	
        .then(function (response) {
			window.location.href = '#/';

        })
        .catch(function (error) {
            alert(error.response.data);
	});
	},

		
	},
});

Vue.component("prikazPretrageApartmana", {
	data: function () {
		    return {
		    	user:null,
		    	id:null,
		    	imeHost:null,
		    	cena:null,
		    	brojSobe:null,
		    	brojGostiju:null,
		    	status:null,
		    	apartmani: APARTMANI
		    }
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
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
	</div>
</div>

		<button type="button" onclick="window.location.href='#/pretragaApartmana';" type="button" class="button" id="t01">Pretrazi</button>

	  <form accept-charset="UTF-8">
            <table class="t" id="tabela" style="width:80%">
                <caption>Pregled korisnika</caption>
                <tr>
                	<td></td>
                    <td>ID:</td>
                 	<td align="right">Ime domacina</td>                    
                     <td align="right">Cena</td>
                     <td align="right">Broj soba</td>
                     <td align="right">Broj gostiju</td>
                     <td align="right">Status</td>
                </tr>
                
                <tr v-for="ap in apartmani">
                
                <div class="post-media">
                                <a href="#"><img style="width:150px;height:100px;" v-bind:src="ap.image" alt="" class="img-responsive"></a>
                   </div><!-- end media -->
                
                <td>{{ap.id}}</td>
                <td>{{ap.host}}</td>
                <td>{{ap.pracePerNight}}</td>
                <td>{{ap.roomNumber}}</td>
                <td>{{ap.guestNumber}}</td>
                <td>{{ap.status}}</td>
                </tr>
						
            </table>            
        </form>
	
	
</div>		  
`
	, 
	mounted(){	
		axios
        .get('rest/registracija/ulogovani')
        .then(response =>{
        	this.user = response.data;
      	    })
        .catch(error => {
	        alert("Doslo je do greske prilikom ucitavanja korisnika");
	    })
	},
	methods : {
		
		logout : function() {
	    axios.post('rest/registracija/logout')
    	
        .then(function (response) {
			window.location.href = '#/';

        })
        .catch(function (error) {
            alert(error.response.data);
	});
	},

		
	},
});
