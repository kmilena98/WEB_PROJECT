Vue.component("pr", {
	data: function () {
		    return {
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
		<img src="app/images/l.jpg"/>
		<h1>Rezervacija apartmana </h1>
		<p>Izaberite svoju najbolju ponudu iz snova!</p>
	</div>

	<div class="topnav">
	<a href="#/sa">Proba</a>
	<a href="#/sb">Apartmani</a>
	<div class="topnav-right">
		<a href="#/sc">Prijava</a>
		<a href="#/ss">Registracija</a>
		<a href="#/sd">Moj profil</a>
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
                    <td align="left"><input type="text" id="korisnickoIme" name="korisnickoIme" v-model="username" /></td>
                     <td>&nbsp;</td>
                </tr>
				<tr><td>&nbsp;</td><td>&nbsp;</td>
				<td align="left" style="color: red"> {{korisnickoImeValidacija}}</td>
				</tr>
                <tr>
                    <td align="right">Lozinka:</td>
                    <td>&nbsp;</td>
                    <td align="left"><input type="password" id="lozinka" name="lozinka" v-model="password" /></td>
                    <td>&nbsp;</td>
                </tr>
				 <tr><td>&nbsp;</td><td>&nbsp;</td>
                    <td align="left" style="color: red"> {{lozinkaValidacija}}</td>
				 </tr>
                <tr>
                    <td align="right">Ime:</td>
                    <td>&nbsp;</td>
                    <td align="left"><input type="text" id="ime" name="ime" v-model="name" /></td>
                    <td>&nbsp;</td>
                </tr>
				 <tr><td>&nbsp;</td><td>&nbsp;</td>
				 <td align="left" style="color: red"> {{imeValidacija}}</td>
                 </tr>
                <tr>
                    <td align="right">Prezime:</td>
                    <td>&nbsp;</td>
                    <td align="left"><input type="text" id="prezime" name="prezime" v-model="surname" /></td>
                    <td>&nbsp;</td>
                </tr> 
				 <tr><td>&nbsp;</td><td>&nbsp;</td>
                    <td align="left" style="color: red"> {{prezimeValidacija}}</td>
				 </tr>
				 <tr class="radioButton">
				 	<td align="right">Pol:</td>
                    <td>&nbsp;</td>
                    <td align="left">
                    <div class="radio">
                    <td>
                    	<label><input type="radio" id="gender" name="gender"  />Musko</label>
                    </td>
                    <td>
                    	<label><input type="radio" id="gender" name="gender"/>Zensko</label>
                    </td>
                    </div>
                    </td>
                    <span></span>

				 </tr>
				
                <tr>
                	<td>&nbsp;</td><td>&nbsp;</td>
                    <td align="right"><button v-on:click.prevent="registracija">Izmeni</button></td>
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
	methods : {
		init : function() {
			this.sc = {};
		}, 
		registration : function(username, name, surname, password) {
			//alert("radi")
		} 
	}
});