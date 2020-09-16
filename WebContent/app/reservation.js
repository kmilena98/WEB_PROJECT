Vue.component("reservation", {
	data: function () {
		    return {
		      apartmants: null,
		      user:null
		    }
	},
	mounted(){
        axios
            .get('rest/apartmani/aktivniApartmani')
            .then(response =>{
	        	this.apartmants = response.data;
	        	/*alert("Usao gde treba da udje!");*/
    	    })
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja apartmana");
    	        alert(error.response.data);
    	    });
        axios
        .get('rest/registracija/ulogovani')
        .then(response =>{
        	this.user = response.data;
        	alert("Dobio korisnika : "+this.user.username);
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



		<button type="button" onclick="window.location.href='#/us';" class="button" id="t01">Pretrazi</button>

	  <form accept-charset="UTF-8">
            <table class="bla" id="tabela" style="width:25%;">
                <caption>Rezervacija apartmana</caption>
              
                 <tr v-for="ap in apartmants">
                  <div class="post-media">
                                <a href="#"><img style="width:150px;height:100px;" v-bind:src="ap.image" alt="" class="img-responsive"></a>
                   </div><!-- end media -->
                            
                <td>
                	<tr><td>{{ap.location.address.street}}</td></tr>
					<tr><td>{{ap.location.address.place}}</td>
					<td>{{ap.location.address.zipCode}}</td></tr>
					<tr><td>{{ap.location.latitude}}</td>
					<td>{{ap.location.longitude}}</td></tr>
			
				</td>
                <td>
               
					<button type="button" v-on:click="prikazi(ap)">PrikaziZaRezervaciju</button>
				</tr>
                
						
            </table>            
        </form>
	
	
</div>		  
`
	, 
	methods : {
		prikazi : function(a) {
		    axios.post('rest/apartmani/prikazApartmana',a)
	        .then(function (response) {
				window.location.href = '#/prikazApartmanaZaGosta';
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

Vue.component("prikazRezervacijaDomacin", {
	data: function () {
		    return {
		      reservations: null,
		      user:null
		    }
	},
	mounted(){
        axios
            .get('rest/reservation/rezervacijeDomacin')
            .then(response =>{
	        	this.reservations = response.data;
    	    })
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja rezervacija");
    	        alert(error.response.data);
    	    })
        axios
        .get('rest/registracija/ulogovani')
        .then(response =>{
        	this.user = response.data;
        	
        	/*alert("Usao gde treba da udje!");*/
	    })
        .catch(error => {
	        alert("Doslo je do greske prilikom ucitavanja korisnika");
	        alert(error.response.data);
	    })
	},
	computed(){
		axios
        .get('rest/reservation/rezervacijeDomacin')
        .then(response =>{
        	this.reservations = response.data;
	    })
        .catch(error => {
	        alert("Doslo je do greske prilikom ucitavanja rezervacija");
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

		<button type="button" onclick="window.location.href='#/pretragaRezervacijaDA';" class="button" id="t01">Pretrazi</button>

	  <form accept-charset="UTF-8">
            <table class="t" id="tabela" style="width:80%;height:20%;">
                <caption>Pregled rezervacija</caption>
                
                <tr>
                	<td></td>
                	<td>ID:</td>
                	<td>Pocetak rezervacije</td>
                	<td>Broj nocenja</td>
                	<td>Ukupna cena</td>
                	<td>Ime klijenta</td>
                	<td>Prezime klijenta</td>
                	<td>Status rezervacije</td>
              	</tr>
                 <tr v-for="ap in this.reservations">
                  	<div class="post-media">
                        <a href="#"><img style="width:150px;height:100px;" v-bind:src="ap.apartment.image" alt="" class="img-responsive"></a>
                   </div><!-- end media -->
                            
                
					<td>{{ap.apartment.id}}</td>
                	<td>{{ap.bookingStartDate}}</td>
					<td>{{ap.numberOfNights}}</td>
					<td>{{ap.totalPrice}}</td>
					<td>{{ap.guest.name}}</td>
					<td>{{ap.guest.surname}}</td>
					<td>{{ap.status}}</td>
					
			
				
               <td> 
              
               		<div v-if="ap.status ==='CREATED'">
						<tr><td><button type="button" v-on:click.prevent="odobri(ap)">Odobri</button></td></tr>
						<tr><td><button type="button" v-on:click.prevent="odbi(ap)">Odbi</button></td></tr>
					</div>
					<div v-else-if="ap.status ==='ACCEPTED'">
						<tr><td><button type="button" v-on:click.prevent="prikazi(ap)">Ponisti</button></td></tr>
						<tr><td><button type="button" v-on:click.prevent="prikazi(ap)">Zavrsi</button></td>
					</div>
				</td>
					
      </tr>
                
						
    </table>            
   </form>
	
	
</div>		  
`
	, 
	methods : {
		odbi : function(ap){
			axios.post('rest/reservation/odgovorDomacinaZaRezervacijeReject', ap)
			.then(function (response) {
				window.location.reload();

	        })
	        .catch(function (error) {
	        	alert("usao u exaption!");
	            alert(error.response.data);
		});
		},
		odobri : function(ap){
			axios.post('rest/reservation/odgovorDomacinaZaRezervacije', ap)
			.then(function (response) {
				window.location.reload();

	        })
	        .catch(function (error) {
	        	alert("usao u exaption!");
	            alert(error.response.data);
		});
		},
		prikazi : function(a) {
			/*alert("dosao"+id);*/
		    axios.post('rest/apartmani/prikazApartmana',a)
	    	
	        .then(function (response) {
				/*window.location.href = '#/prikazRezervacijaDomacin';*/

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

Vue.component("prikazRezervacijaGost", {
	data: function () {
		    return {
		      reservations: null,
		      user:null
		    }
	},
	mounted(){
        axios
            .get('rest/reservation/rezervacijeGost')
            .then(response =>{
	        	this.reservations = response.data;
    	    })
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja rezervacija");
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

		<button type="button" onclick="window.location.href='#/pretragaRezervacijaDA';" class="button" id="t01">Pretrazi</button>

	  <form accept-charset="UTF-8">
            <table class="t" id="tabela" style="width:80%;height:20%;">
                <caption>Pregled rezervacija</caption>
                
                <tr>
                	<td></td>
                	<td>ID:</td>
                	<td>Pocetak rezervacije</td>
                	<td>Broj nocenja</td>
                	<td>Ukupna cena</td>
                	<td>Ime klijenta</td>
                	<td>Prezime klijenta</td>
                	<td>Status rezervacije</td>
              	</tr>
                 <tr v-for="ap in this.reservations">
                  	<div class="post-media">
                        <a href="#"><img style="width:150px;height:100px;" v-bind:src="ap.apartment.image" alt="" class="img-responsive"></a>
                   </div><!-- end media -->
                            
                
					<td>{{ap.apartment.id}}</td>
                	<td>{{ap.bookingStartDate}}</td>
					<td>{{ap.numberOfNights}}</td>
					<td>{{ap.totalPrice}}</td>
					<td>{{ap.guest.name}}</td>
					<td>{{ap.guest.surname}}</td>
					<td>{{ap.status}}</td>
					
			
				
               <td> 
              
               		<div v-if="ap.status ==='CREATED'">
						<tr><td><button type="button" v-on:click.prevent="odustani(ap)">Odustani</button></td>
					</div>
					<div v-else-if="ap.status === 'ACCEPTED'">
						<tr><td><button type="button" v-on:click.prevent="odustani(ap)">Odustani</button></td>
					</div>
				</td>
					
      </tr>
                
						
    </table>            
   </form>
	
	
</div>		  
`
	, 
	methods : {
		odustani : function(ap){
			axios.post('rest/reservation/odgovorGostaZaRezervacije', ap)
			.then(function (response) {
				window.location.reload();

	        })
	        .catch(function (error) {
	        	alert("usao u exaption!");
	            alert(error.response.data);
		});
		},
		odobri : function(ap){
			axios.post('rest/reservation/odgovorDomacinaZaRezervacije', ap)
			.then(function (response) {
				window.location.reload();

	        })
	        .catch(function (error) {
	        	alert("usao u exaption!");
	            alert(error.response.data);
		});
		},
		prikazi : function(a) {
			/*alert("dosao"+id);*/
		    axios.post('rest/apartmani/prikazApartmana',a)
	    	
	        .then(function (response) {
				/*window.location.href = '#/prikazRezervacijaDomacin';*/

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


Vue.component("prikazRezervacijaAdministrator", {
	data: function () {
		    return {
		      reservations: null,
		      user:null
		    }
	},
	mounted(){
        axios
            .get('rest/reservation/rezervacijeAdministrator')
            .then(response =>{
	        	this.reservations = response.data;
	        	alert("Preuzeo"+this.reservations);
	        	/*alert("Usao gde treba da udje!");*/
    	    })
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja rezervacija");
    	        alert(error.response.data);
    	    })
        axios
        .get('rest/registracija/ulogovani')
        .then(response =>{
        	this.user = response.data;
        	
        	/*alert("Usao gde treba da udje!");*/
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



		<button type="button" onclick="window.location.href='#/pretragaRezervacijaDA';" class="button" id="t01">Pretrazi</button>

	  <form accept-charset="UTF-8">
            <table class="t" id="tabela" style="width:80%;height:20%;">
                <caption>Pregled rezervacija</caption>
                
                <tr>
                <td></td>
                <td>ID:</td>
                <td>Pocetak rezervacije</td>
                <td>Broj nocenja</td>
                <td>Ukupna cena</td>
                <td>Ime klijenta</td>
                <td>Prezime klijenta</td>
                <td>Status rezervacije</td>
              	</tr>
                 <tr v-for="ap in this.reservations">
                  <div class="post-media">
                                <a href="#"><img style="width:150px;height:100px;" v-bind:src="ap.apartment.image" alt="" class="img-responsive"></a>
                   </div><!-- end media -->
                            
                
					<td>{{ap.apartment.id}}</td>
                	<td>{{ap.bookingStartDate}}</td>
					<td>{{ap.numberOfNights}}</td>
					<td>{{ap.totalPrice}}</td>
					<td>{{ap.guest.name}}</td>
					<td>{{ap.guest.surname}}</td>
					<td>{{ap.status}}</td>
					
					
                </tr>
                
						
            </table>            
        </form>
	
	
</div>		  
`
	, 
	methods : {
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

/*Pretraga rezervacija za domacine i administratore po korisnickom imenu*/

var RESERVATIONS;

Vue.component("pretragaRezervacijaDA", {
	data: function () {
		    return {
		      username: undefined,
		      user: null
		    }
	},
	mounted(){
      /*axios
            .get('rest/reservation/rezervacijeAdministrator')
            .then(response =>{
	        	this.reservations = response.data;
	        	alert("Preuzeo"+this.reservations);
	        	
    	    })
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja rezervacija");
    	        alert(error.response.data);
    	    })*/
        axios
        .get('rest/registracija/ulogovani')
        .then(response =>{
        	alert("Usao kod usera")
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
            <table class="pretraga" style="width:30%;margin-left: auto;margin-right: auto;">
               
                <tr>
                    <td>Korisnicko ime:</td>
                    <td><input type="text" id="username" v-model="username"/></td>
                </tr>
				 
				
                <tr>
             		
					<td>&nbsp;</td>
                    	<td>
                    	<tr>
                    		<td><button v-on:click.prevent="pretrazi(username)">Pretrazi</button></td>
                    		
                 			<td><div v-if="this.user.role==='ADMINISTRATOR'">
								<button onclick="window.location.href='#/prikazRezervacijaAdministrator'">Odustani</button>
							</div>
							<div v-else>
								<button onclick="window.location.href='#/prikazRezervacijaDomacin'">Odustani</button>
							</div>
							</td>
                   			</tr>
                    	</td>
                </tr>
               
						
            </table>            
        </form>
	
	
</div>		  
`
	, 
	methods : {
		
		pretrazi: function(username){
            /*var user = {
                'username': this.username,
                'password': '',
                'name': '',
                'surname': '',
                'role': '',
                'gender': ''
            }*/
			alert(username);
            axios.get('rest/reservation/pretragaRezervacija/' + username)
            .then(function (response) {
            	RESERVATIONS = response.data;
   				window.location.href = '#/prikazPretrageRezervacijaDA';
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

Vue.component("prikazPretrageRezervacijaDA", {
	data: function () {
		    return {
		    	user:null,
		    	reservations: RESERVATIONS
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



		<button type="button" onclick="window.location.href='#/pretragaRezervacijaDA';" class="button" id="t01">Pretrazi</button>

	  <form accept-charset="UTF-8">
            <table class="t" id="tabela" style="width:80%;height:20%;">
                <caption>Pregled rezervacija</caption>
                
                <tr>
                <td></td>
                <td>ID:</td>
                <td>Pocetak rezervacije</td>
                <td>Broj nocenja</td>
                <td>Ukupna cena</td>
                <td>Ime klijenta</td>
                <td>Prezime klijenta</td>
                <td>Status rezervacije</td>
              	</tr>
                 <tr v-for="ap in this.reservations">
                  <div class="post-media">
                                <a href="#"><img style="width:150px;height:100px;" v-bind:src="ap.apartment.image" alt="" class="img-responsive"></a>
                   </div><!-- end media -->
                            
                
					<td>{{ap.apartment.id}}</td>
                	<td>{{ap.bookingStartDate}}</td>
					<td>{{ap.numberOfNights}}</td>
					<td>{{ap.totalPrice}}</td>
					<td>{{ap.guest.name}}</td>
					<td>{{ap.guest.surname}}</td>
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
	        	alert("Dobio korisnika : "+this.user.username);
		    })
	        .catch(error => {
		        alert("Doslo je do greske prilikom ucitavanja korisnika");
		        alert(error.response.data);
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