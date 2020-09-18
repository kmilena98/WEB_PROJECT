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
					<div v-else-if="ap.status === 'COMPLETED' || ap.status === 'REJECTED'">
						<tr><td><button type="button" v-on:click.prevent="posalji(ap)">Napisi komentar</button></td>
					</div>
				</td>
					
      </tr>
                
						
    </table>            
   </form>
	
	
</div>		  
`
	, 
	methods : {
		posalji : function(ap){
			axios.post('rest/apartmani/prikazApartmana', ap.apartment)
			.then(function (response) {

				
				window.location.href = '#/writeComment';
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

Vue.component("writeComment", {
	data: function () {
		    return {
		      user:null,
		      text: null,
		      grade: null
		      
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

	<div class="sadrzaj">
		<p>Napisi komentar:</p>

		<table class="to">
			<tr><td><label>Sadrzaj:</label></td></tr>
			<tr>
				<td><textarea style="width:400px; height:200px" type="text" v-model="text"/><td>
			</tr>
			<tr style="margin-top: 20px;">
				<td><tr>
				<td><label>Ocena:</label></td>
				<td><select class="c" v-model="grade" style="width:208px;height:30px;">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
					</select></td>
				</td></tr>
			</tr>
			<tr><td>&nbsp;</td>
				 <td align="left" style="color: red;font-size:14px">{{nazivValidacija}}</td>
            </tr>
		</table>
		<div class="b">
		<table>
		<tr>
			<td><input type="button" value="Potvrdi" v-on:click.prevent="posaljiPoruku"><td>
			<td><input type="button" onclick="window.location.href='#/sadrzajApartmanaPrikaz';" value="Odustani"></td>
			
		</tr>
		</div>
	</div>

	
	
</div>		  
`
	, 
	
	computed: {
		/*nazivValidacija: function(){
			if(this.name != undefined && this.name.length > 0){
				let imeMatch = this.name.match('[A-Za-z ]*');
				if(imeMatch != this.name) return 'Ime u sebi moze sadrzati iskljucivo slova.';
				else if(this.name[0].match('[A-Z]') === null) return 'Ime mora pocinjati velikim slovom.'; 
			}
			else if(this.name === '') return 'Ime je obavezno polje.';
			else return null;
		}*/
},
	methods : {
		
		posaljiPoruku(){
			
			var komentar= {
				'guest': this.user,
				'apartmentId' : this.apartman.id,
				'text': this.text,
				'grade': this.grade,
				'dopusti' : "false"
			}
			
            axios.post('rest/apartmani/sendComment', komentar)
            .then(function (response) {
            	alert("Uspesno dodat komentar");
                /*window.location.href = "#/sadrzajApartmanaPrikaz"*/;
            })
            .catch(function (error) {
            	alert("exception");
                alert(error.response.data);
            });
		},
		
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

Vue.component("showComment", {
	data: function () {
		    return {
		      user:null,
		      text: null,
		      grade: null,
		      komentari: null,
		      apartmanA: null,
		      apartmanH: null
		      
		    }
	},
	mounted(){
        axios
            .get('rest/apartmani/prikaz')
            .then(response =>{
	        	this.apartmanA = response.data;

	        	
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

		<p style="text-align:center; margin-bottom:80px;">Prikaz komentara:</p>
		
		<table class="tulum" style="margin-left: auto; margin-right: auto;font-size:18px;">
			<tr v-for="c in apartmanA.coments">
				<td>
				<tr>
					<td>Korisnicko ime gosta:</td>
					<td>{{c.guest.username}}</td>
				</tr>
				<tr>
					<td>Ocena:</td>
					<td>{{c.grade}}</td>
				</tr>
				<tr>
					<td>Sadrzaj:</td>
					<td>{{c.text}}</td>
				</tr>
			   </td>
			</tr>
		</table>
</div>		  
`
	, 
	
	methods : {
		
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


Vue.component("showAllComment", {
	data: function () {
		    return {
		      user:null,
		      text: null,
		      grade: null,
		      dopusteno: null,
		      komentariA: null,
		      komentariH: null
		      
		    }
	},
	mounted(){
        axios
            .get('rest/apartmani/svihKomentara')
            .then(response =>{
	        	this.komentariA = response.data;
	        	
    	    })
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja apartmana");
    	        alert(error.response.data);
    	    });
        
        axios
        .get('rest/apartmani/svihKomentaraZaDomacina')
        .then(response =>{
        	this.komentariH = response.data;
        	
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

		<p style="text-align:center; margin-bottom:80px;">Prikaz komentara:</p>
		
		<div v-if="user.role==='ADMINISTRATOR'" >
		<table class="tulum" style="margin-left: auto; margin-right: auto;font-size:18px;">
			<tr v-for="c in komentariA">
				<td>
				<tr>
					<td>ID apartmana:</td>
					<td>{{c.apartmentId}}</td>
				</tr>
				<tr>
					<td>Korisnicko ime gosta:</td>
					<td>{{c.guest.username}}</td>
				</tr>
				<tr>
					<td>Ocena:</td>
					<td>{{c.grade}}</td>
				</tr>
				<tr>
					<td>Sadrzaj:</td>
					<td>{{c.text}}</td>
				</tr>
			   </td>
			</tr>
		</table>
	</div>
	<div v-else>
	<table class="tulum" style="margin-left: auto; margin-right: auto;font-size:18px;">
			<tr v-for="c in komentariH">
				<td>
				<tr>
					<td>ID apartmana:</td>
					<td>{{c.apartmentId}}</td>
				</tr>
				<tr>
					<td>Korisnicko ime gosta:</td>
					<td>{{c.guest.username}}</td>
				</tr>
				<tr>
					<td>Ocena:</td>
					<td>{{c.grade}}</td>
				</tr>
				<tr>
					<td>Sadrzaj:</td>
					<td>{{c.text}}</td>
				</tr>
				<tr>
					<td>Dopusteno korisniku:</td>
					<td>{{c.dopusti}}</td>
					<td><button v-on:click.prevent="dopusti(c)">Izmeni</button></td>
				</tr>
			   </td>
			</tr>
		</table>
	</div>
</div>		  
`
	, 
	
	methods : {
		dopusti :function(c){
			axios.post('rest/apartmani/dopusti', c)
            .then(function (response) {
      
            	if(c.dopusti == true){
            		c.dopusti = false;
            	}else{
            		c.dopusti = true;
            	}
            	window.location.reload();
            })
            .catch(function (error) {
            	alert("exception");
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


Vue.component("showCommentForGuest", {
	data: function () {
		    return {
		      user:null,
		      text: null,
		      grade: null,
		      komentariA: null
		      
		    }
	},
	mounted(){
        axios
            .get('rest/apartmani/svihKomentaraZaGosta')
            .then(response =>{
	        	this.komentariA = response.data;
	        	
    	    })
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja apartmana");
    	        alert(error.response.data);
    	    });
        
        axios
        .get('rest/apartmani/svihKomentaraZaDomacina')
        .then(response =>{
        	alert("Nasao nasao komentare");
        	this.komentariH = response.data;
        	
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

		<p style="text-align:center; margin-bottom:80px;">Prikaz komentara:</p>
		
		<table class="tulum" style="margin-left: auto; margin-right: auto;font-size:18px;">
			<tr v-for="c in komentariA">
				<td>
				<tr>
					<td>ID apartmana:</td>
					<td>{{c.apartmentId}}</td>
				</tr>
				<tr>
					<td>Korisnicko ime gosta:</td>
					<td>{{c.guest.username}}</td>
				</tr>
				<tr>
					<td>Ocena:</td>
					<td>{{c.grade}}</td>
				</tr>
				<tr>
					<td>Sadrzaj:</td>
					<td>{{c.text}}</td>
				</tr>
			   </td>
			</tr>
		</table>
</div>		  
`
	, 
	
	methods : {
		
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