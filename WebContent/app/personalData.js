Vue.component("pr", {
	data: function () {
		    return {
		    	user : undefined,
		    	username: undefined,
				name: undefined,
				surname: undefined,
				password: undefined,
				gender: undefined	
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
		<a href="#/">Odjava</a>
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
                    <td align="left"><input type="password" id="lozinka" name="lozinka" v-model="password" v-model="this.user.password"/></td>
                    <td>&nbsp;</td>
                </tr>
				 <tr><td>&nbsp;</td><td>&nbsp;</td>
                    <td align="left" style="color: red"> {{lozinkaValidacija}}</td>
				 </tr>
                <tr>
                    <td align="right">Ime:</td>
                    <td>&nbsp;</td>
                    <td align="left"><input type="text" id="ime" name="ime" v-model="name" v-model="this.user.name" /></td>
                    <td>&nbsp;</td>
                </tr>
				 <tr><td>&nbsp;</td><td>&nbsp;</td>
				 <td align="left" style="color: red"> {{imeValidacija}}</td>
                 </tr>
                <tr>
                    <td align="right">Prezime:</td>
                    <td>&nbsp;</td>
                    <td align="left"><input type="text" id="prezime" name="prezime" v-model="surname" v-model="this.user.surname"></input></td>
                    <td>&nbsp;</td>
                </tr> 
				 <tr><td>&nbsp;</td><td>&nbsp;</td>
                    <td align="left" style="color: red">{{prezimeValidacija}}</td>
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
                    <td align="right"><button v-on:click.prevent="registracija">Sacuvaj</button></td>
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
	created : {
		init : function() {
			this.sc = {};
		}, 
		registration : function(username, name, surname, password) {
		} 
	},
	mounted(){
		
        alert("Pozvao mounted");
        axios
            .get('rest/registracija/ulogovani')
            .then(response =>{
	        	this.user = response.data;
    	    })
    	    
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja prijavljenog");
    	    })
        if(this.user.gender=="MALE"){
			document.getElementByID("gendera").checked= true;
		}else{
			document.getElementByID("gendera").checked= true;
		}
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
				gender: undefined	
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
		<a href="#/">Odjava</a>
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
	created : {
		init : function() {
			this.sc = {};
		}, 
		registracija : function(username, name, surname, password) {
			
		} 
	},
	mounted(){

        alert("Pozvao mounted");
        axios
            .get('rest/registracija/ulogovani')
            .then(response =>{
	        	this.user = response.data;
    	    })
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja prijavljenog");
    	    })
	},
});