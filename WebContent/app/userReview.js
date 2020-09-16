Vue.component("pk", {
	data: function () {
		    return {
		      users: null,
		      user:null
		    }
	},
	mounted(){
        axios
            .get('rest/registracija/korisnici')
            .then(response =>{
	        	this.users = response.data;
    	    })
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja korisnika");
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
});

var USERS;

Vue.component("us", {
	data: function () {
		    return {
		      username: undefined,
		      role: undefined,
		      gender: undefined,
		      user:undefined
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
	        	alert("Dobio korisnika : "+this.user.username);
		    })
	        .catch(error => {
		        alert("Doslo je do greske prilikom ucitavanja korisnika");
		        alert(error.response.data);
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
		    	users: USERS
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