Vue.component("pr", {
	data: function () {
		    return {
		    	user: {username:'', name:'', surname: '', password:'', gender:''},
		    	username:'',
		    	name: '',
		    	surname:'',
		    	password:'',
				gender:'',
				role:''
		    }
	},
	mounted(){		
		axios
        .get('rest/registracija/ulogovani')
        .then(response =>{
        	this.user = response.data;
			this.username = this.user.username;
			this.name = this.user.name;
			this.surname = this.user.surname;
			this.password = this.user.password;
			this.gender = this.user.gender;
			this.role = this.user.role;
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
	<a href="#/sa">Proba</a>
	<a href="#/sb">Apartmani</a>
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
</div>
	<div class="l">
		<h2>Licni podaci</h2>
	</div>
	  <form accept-charset="UTF-8">
            <table class="table" id="tabela">
                <tr>
                    <td align="right"><label>Korisnicko ime:</label></td>
                     <td>&nbsp;</td>
                    <td align="left">{{username}}</td>
                     <td>&nbsp;</td>
                </tr>
				<tr><td>&nbsp;</td><td>&nbsp;</td>
				<td align="left" style="color: red"> {{korisnickoImeValidacija}}</td>
				</tr>
                <tr>
                    <td align="right">Lozinka:</td>
                    <td>&nbsp;</td>
                    <td align="left"><input type="password" id="lozinka" v-model="password"/></td>
                    <td>&nbsp;</td>
                </tr>
				 <tr><td>&nbsp;</td><td>&nbsp;</td>
                    <td align="left" style="color: red"> {{lozinkaValidacija}}</td>
				 </tr>
                <tr>
                    <td align="right">Ime:</td>
                    <td>&nbsp;</td>
                    <td align="left"><input type="text" id="ime"  v-model="name" /></td>
                    <td>&nbsp;</td>
                </tr>
				 <tr><td>&nbsp;</td><td>&nbsp;</td>
				 <td align="left" style="color: red"> {{imeValidacija}}</td>
                 </tr>
                <tr>
                    <td align="right">Prezime:</td>
                    <td>&nbsp;</td>
                    <td align="left"><input type="text" id="prezime" name="prezime" v-model="surname"></input></td>
                    <td>&nbsp;</td>
                </tr> 
				 <tr><td>&nbsp;</td><td>&nbsp;</td>
                    <td align="left" style="color: red">{{prezimeValidacija}}</td>
				 </tr>
				 <tr>
                    <td align="right"><label>Uloga:</label></td>
                     <td>&nbsp;</td>
                    <td align="left">{{role}}</td>
                     <td>&nbsp;</td>
                </tr>
				 <tr class="radioButton">
				 	<td align="right">Pol:</td>
                    <td>&nbsp;</td>
                    <td align="left">
                    <div class="radio">
                    <td>
                    	<label><input type="radio" id="gendera" name="gender"  />Musko</label>
                    </td>
                    <td>
                    	<label><input type="radio" id="genderb" name="gender"/>Zensko</label>
                    </td>
                    </div>
                    </td>
                    <span></span>

				 </tr>
				
                <tr>
                	<td>&nbsp;</td><td>&nbsp;</td>
                    <td align="right"><button v-on:click.prevent="izmeni">Sacuvaj</button></td>
                </tr>  			   			
            </table>            
        </form>
       
</div>			  
`
	, 
	computed :{
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
	methods: {
		izmeni: function(){
			//if(this.old != this.uloga){
			if(document.getElementById('gendera').checked){
				this.gender = "MALE";
			}
			if(document.getElementById('genderb').checked){
				this.gender = "FEMALE";
			}
				var user = {
					'username': this.username,
					'name': this.name,
					'surname': this.surname,
					'password': this.password,
					'role': this.role,
					'gender': this.gender,
				};
				alert(user.name);
				axios.post('rest/registracija/izmena', user)
				.then(function (response) {
					window.location.href = "#/pd";
				})
				.catch(function (error) {
					alert(error.response.data);
				});
			//}
		},
		
		/*updateUser : function(user) {
			alert("dada");
			user
			axios
			.post("rest/registracija/izmena", user)
			.then(response => toast('Korisnik ' + user.name + " " + user.surname + " uspešno snimljen."));
			this.mode = 'BROWSE';
		},*/
		/*cancelEditing : function() {
			this.selectedStudent.ime = this.backup[0];
			this.selectedStudent.prezime = this.backup[1];
			this.selectedStudent.brojIndeksa = this.backup[2];
			this.selectedStudent.datumRodjenja = this.backup[3];
			this.mode = 'BROWSE';
		}*/
		
		
			logout : function() {
		    axios.post('rest/registracija/logout')
	    	
	        .then(function (response) {
	        	//alert("dosao do loogouta");
				window.location.href = '#/';

	        })
	        .catch(function (error) {
	        	alert("usao u exaption!");
	            alert(error.response.data);
		});
		},

	},
});



Vue.component("pr1", {
	data: function () {
		    return {
		    	user : undefined,
		    	username: undefined,
				name: undefined,
				surname: undefined,
				password: undefined,
				gender: undefined,
				role: undefined
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
	<a href="#/sa">Proba</a>
	<a href="#/sb">Apartmani</a>
	<div class="topnav-right">
		<a href="#/sd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
</div>
	<div class="l">
		<h2>Licni podaci</h2>
	</div>
	  <form accept-charset="UTF-8">
            <table class="table" id="tabela">
                <tr>
                    <td align="right"><label>Korisnicko ime:</label></td>
                     <td>&nbsp;</td>
                    <td align="left">{{this.user.username}}</td>
                     <td>&nbsp;</td>
                </tr>
				<tr><td>&nbsp;</td><td>&nbsp;</td>
				<td align="left" style="color: red"> {{korisnickoImeValidacija}}</td>
				</tr>
                <tr>
                    <td align="right">Lozinka:</td>
                    <td>&nbsp;</td>
                     <td align="left">{{this.user.password}}</td><td>&nbsp;</td>
                </tr>
				 <tr><td>&nbsp;</td><td>&nbsp;</td>
                    <td align="left" style="color: red"> {{lozinkaValidacija}}</td>
				 </tr>
                <tr>
                    <td align="right">Ime:</td>
                    <td>&nbsp;</td>
                    <td align="left">{{this.user.name}}</td>
                    <td>&nbsp;</td>
                </tr>
				 <tr><td>&nbsp;</td><td>&nbsp;</td>
				 <td align="left" style="color: red"> {{imeValidacija}}</td>
                 </tr>
                <tr>
                    <td align="right">Prezime:</td>
                    <td>&nbsp;</td>
                    <td align="left">{{this.user.surname}}</td>
                    <td>&nbsp;</td>
                </tr> 
				 <tr><td>&nbsp;</td><td>&nbsp;</td>
                    <td align="left" style="color: red">{{prezimeValidacija}}</td>
				 </tr>
				 <tr>
                    <td align="right">Pol:</td>
                    <td>&nbsp;</td>
                    <td align="left">{{this.user.gender}}</td>
                    <td>&nbsp;</td>
                </tr> 
                 <tr><td>&nbsp;</td><td>&nbsp;</td>
                    <td align="left" style="color: red">{{prezimeValidacija}}</td>
				 </tr>
				 <tr>
                    <td align="right">Uloga:</td>
                    <td>&nbsp;</td>
                    <td align="left">{{this.user.role}}</td>
                    <td>&nbsp;</td>
                </tr> 
				
                <tr>
                	<td>&nbsp;</td><td>&nbsp;</td>
                    <td align="right"><button onclick="location.href ='#/sd'">Izmeni</button></td>
                </tr>  			   			
            </table>            
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
	
	mounted(){
        axios
            .get('rest/registracija/ulogovani')
            .then(response =>{
	        	this.user = response.data;
    	    })
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja prijavljenog");
    	    })
	},
	
	methods : {
		logout : function() {
	    axios.post('rest/registracija/logout')
    	
        .then(function (response) {
        	//alert("dosao do loogouta");
			window.location.href = '#/';

        })
        .catch(function (error) {
        	alert("usao u exaption!");
            alert(error.response.data);
        });
	},
		
	},

});