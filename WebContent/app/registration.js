Vue.component("reg", {
	data: function () {
		    return {
		    	username: undefined,
				name: undefined,
				surname: undefined,
				password: undefined,
				potvrda: undefined,
				role: null,
				gender: undefined
		    }
	},
	template: ` 
<div id="user" class="registrationBox">
	<h2>Registracija</h2>
	<form>
		<div class="inputBox">
			<input type="text" v-model="username">
			<p class="message1" style="color:red;font-size:12px">{{korisnickoImeValidacija}}</p>
			<label>Korisnicko ime: </label>
		</div>
		<div class="inputBox">
			<input type="text" v-model="name">
			<p class="message2" style="color:red;font-size:12px">{{imeValidacija}}</p>
			<label>Ime:</label>
		</div>
		<div class="inputBox">
			<input type="text" v-model="surname">
			<p class="message3" style="color:red;font-size:12px">{{prezimeValidacija}}</p>
			<label>Prezime:</label>
		</div>
		<div class="inputBox">
			<input type="password" v-model="password">
			<p class="message4" style="color:red;font-size:12px">{{lozinkaValidacija}}</p>
			<label>Lozinka:</label>
		</div>
		<div class="inputBox">
			<input type="password" v-model="potvrda">
			<p class="message4" style="color:red;font-size:12px">{{lozinkaValidacija2}}</p>
			<label>Potvrdi lozinku:</label>
		</div>
		<div class="radioButton">
			<label class="gender">Pol</label>
			<label class="radio">
				<input type="radio" id = "radio1" name="gender" value="MALE" > Male
  				<span></span>
  			</label>
  			<label class="radio">
  				<input type="radio" name="gender" value="FEMALE"checked="checked" > Female<br>
  				<span></span>
  			</label>
  		</div>
			<input type="reset" name="" value="Potvrdi" v-on:click="registration()">
	</form>	
</div>			  
`
	, 
	computed :{
		korisnickoImeValidacija: function(){
			if(this.username === '') return 'Korisnicko ime je obavezno polje.';
			else return null;
		},
		lozinkaValidacija: function(){
			if(this.password === '') return 'Lozinka je obavezno polje.';
			else return null;
		},
		lozinkaValidacija2: function(){
			if(this.potvrda === '') return 'Niste potvrdili lozinku.';
			if(this.potvrda != this.password) return 'Lozinke se ne podudaraju.';
			else return null;
		},
		imeValidacija: function(){
			if(this.name != undefined && this.name.length > 0){
				let imeMatch = this.name.match('[A-Za-z ]*');
				if(imeMatch != this.name) return 'Ime u sebi moze sadrzati iskljucivo slova.';
				else if(this.name[0].match('[A-Z]') === null) return 'Ime mora pocinjati velikim slovom.'; 
			}
			else if(this.name === '') return 'Ime je obavezno polje.';
			else return null;
		},
		prezimeValidacija: function(){
			if(this.surname != undefined && this.surname.length > 0){
				let prezimeMatch = this.surname.match('[A-Za-z ]*');
				if(prezimeMatch != this.surname) return 'Prezimese u sebi moze sadrzati iskljucivo slova';
				else if(this.surname[0].match('[A-Z]') === null) return 'Prezime mora pocinjati velikim slovom'; 
			}
			else if(this.surname === '') return 'Prezime je obavezno polje.';
			else return null;
		},
	},
	methods : {
		registration : function() {
				if(document.getElementById('radio1').checked){
					this.gender = "MALE";
				}else{
					this.gender = "FEMALE";
				}
			var u = {
					'username': this.username,
					'password': this.password,
					'name': this.name,
					'surname': this.surname,
					'role': "GUEST",
					'gender': this.gender
				};
			if(this.password != this.potvrda){
				alert("Lozinke se ne podudaraju!");
			}else{
		    axios.post('rest/registracija/add', u)
        	
            .then(function (response) {
            	alert("Uspesno ste se registrovali.");
				window.location.href = '#/sc';

            })
            .catch(function (error) {
            	alert("usao u exaption!");
                alert(error.response.data);
		});
			}
		},
	}
});

Vue.component("reghost", {
	data: function () {
		    return {
		    	username: undefined,
				name: undefined,
				surname: undefined,
				password: undefined,
				gender: undefined,
				role:undefined
		    }
	},
	template: ` 
<div id="user" class="registrationBox">
	<h2>Registracija</h2>
	<form>
		<div class="inputBox">
			<input type="text" v-model="username">
			<p class="message1" style="color:red;font-size:12px">{{korisnickoImeValidacija}}</p>
			<label>Korisnicko ime: </label>
		</div>
		<div class="inputBox">
			<input type="text" v-model="name">
			<p class="message2" style="color:red;font-size:12px">{{imeValidacija}}</p>
			<label>Ime:</label>
		</div>
		<div class="inputBox">
			<input type="text" v-model="surname">
			<p class="message3" style="color:red;font-size:12px">{{prezimeValidacija}}</p>
			<label>Prezime:</label>
		</div>
		<div class="inputBox">
			<input type="password" v-model="password">
			<p class="message4" style="color:red;font-size:12px">{{lozinkaValidacija}}</p>
			<label>Lozinka:</label>
		</div>
		<div class="radioButton">
			<label class="gender">Pol</label>
			<label class="radio">
				<input type="radio" id = "radio1" name="gender" value="MALE" > Male
  				<span></span>
  			</label>
  			<label class="radio">
  				<input type="radio" name="gender" value="FEMALE"checked="checked" > Female<br>
  				<span></span>
  			</label>
  		</div>
			<input type="reset" name="" value="Potvrdi" v-on:click="registration()">
	</form>	
</div>			  
`
	, 
	computed :{
		korisnickoImeValidacija: function(){
			if(this.username === '') return 'Korisnicko ime je obavezno polje.';
			else return null;
		},
		lozinkaValidacija: function(){
			if(this.password === '') return 'Lozinka je obavezno polje.';
			else return null;
		},
		imeValidacija: function(){
			if(this.name != undefined && this.name.length > 0){
				let imeMatch = this.name.match('[A-Za-z ]*');
				if(imeMatch != this.name) return 'Ime u sebi moze sadrzati iskljucivo slova.';
				else if(this.name[0].match('[A-Z]') === null) return 'Ime mora pocinjati velikim slovom.'; 
			}
			else if(this.name === '') return 'Ime je obavezno polje.';
			else return null;
		},
		prezimeValidacija: function(){
			if(this.surname != undefined && this.surname.length > 0){
				let prezimeMatch = this.surname.match('[A-Za-z ]*');
				if(prezimeMatch != this.surname) return 'Prezimese u sebi moze sadrzati iskljucivo slova';
				else if(this.surname[0].match('[A-Z]') === null) return 'Prezime mora pocinjati velikim slovom'; 
			}
			else if(this.surname === '') return 'Prezime je obavezno polje.';
			else return null;
		},
	},
	methods : {
		init : function() {
			this.sc = {};
		}, 
		registration : function() {
				if(document.getElementById('radio1').checked){
					this.gender = "MALE";
				}else{
					this.gender = "FEMALE";
				}
			var u = {
					'username': this.username,
					'password': this.password,
					'name': this.name,
					'surname': this.surname,
					'role':"HOST",
					'gender' : this.gender
				};
		    axios.post('rest/registracija/add', u)
        	
            .then(function (response) {
            	alert("Registracija uspesno obavljena");
				window.location.href = '#/a';

            })
            .catch(function (error) {
            	alert("usao u exaption!");
                alert(error.response.data);
		});
		},
	}
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
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
	</div>
</div>


		<button type="button" onclick="window.location.href='#/us';" type="button" class="button" id="t01">Pretrazi</button>

	  <form accept-charset="UTF-8">
            <table class="bla" id="tabela" style="width:25%;">
                <caption>Pregled apartmana</caption>
              
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
               
					<button type="button" v-on:click.prevent="prikazi(ap)">Prikazi</button>
				
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

