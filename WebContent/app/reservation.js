Vue.component("reservation", {
	data: function () {
		    return {
		      apartmants: null
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
	<a href="#/reservation">Apartmani</a>
	<a href="#/pk">Korisnici</a>
	<a href="#/sh">Registracija domacina</a>
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
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
			/*alert("dosao"+id);*/
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
	<a href="#/ar">Apartmani</a>
	<a href="#/pk">Korisnici</a>
	<a href="#/sh">Registracija domacina</a>
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
</div>

		<button type="button" onclick="window.location.href='#/us';" class="button" id="t01">Pretrazi</button>

	  <form accept-charset="UTF-8">
            <table class="t" id="tabela" style="width:25%;">
                <caption>Pregled rezervacija</caption>
                
                <tr>
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
                            
                <td>
					<tr><td>{{ap.apartment.id}}</td></tr>
                	<tr><td>{{ap.bookingStartDate}}</td></tr>
					<td>{{ap.numberOfNights}}</td></tr>
					<td>{{ap.totalPrice}}</td></tr>
					
					
			
				</td>
                <td>
               
					<td><button type="button" v-on:click.prevent="prikazi(ap)">Odobri</button></td>
					<td><button type="button" v-on:click.prevent="prikazi(ap)">Ponisti</button></td>
					<td><button type="button" v-on:click.prevent="prikazi(ap)">Zavrsi</button></td>
				
					</td>
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
