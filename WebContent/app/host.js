Vue.component("da", {
	data: function () {
		    return {
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
	<div class="topnav-right">
		<a href="#/pr">Moj profil</a>
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
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
	</div>
</div>


<div class="row">
  <div class="column side">
    <h2>Side</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
  </div>
  
  <div class="column middle">
    <h2>Main Content</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet pretium urna. Vivamus venenatis velit nec neque ultricies, eget elementum magna tristiq.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet pretium urna. Vivamus venenatis velit nec neque ultricies, eget elementum magna tristi.</p>
  </div>
  
  <div class="column side">
    <h2>Side</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
  </div>
</div>
<div class="footer">
  <p>Footer</p>
</div>
	
	
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
        	alert("usao u exaption!");
	});
	},

		
	},
	mounted () {
        
    },
});