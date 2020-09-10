Vue.component("reg", {
	data: function () {
		    return {
		    	username: undefined,
				name: undefined,
				surname: undefined,
				password: undefined,
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
					'role': "GUEST",
					'gender': this.gender
				};
		    axios.post('rest/registracija/add', u)
        	
            .then(function (response) {
            	alert("Uspesno ste se registrovali.");
				window.location.href = '#/sc';

            })
            .catch(function (error) {
            	alert("usao u exaption!");
                alert(error.response.data);
		});
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