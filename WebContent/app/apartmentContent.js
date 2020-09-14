Vue.component("sadrzajApartmanaPrikaz", {
	data: function () {
		    return {
		      sadrzajiApartmana: undefined,
		      
		    }
	},
	mounted(){
		alert("Pozvao je dobar prozor");
        axios
            .get('rest/sadrzaj/prikazSadrzaja')
            .then(response =>{
	        	this.sadrzajiApartmana = response.data;
    	    })
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja sadrzaja");
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
	<a href="#/sadrzajApartmanaPrikaz">SadrzajApartmana</a>
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
</div>

		<button type="button" onclick="window.location.href='#/dodajsadrzajApartmana';"class="button" id="t01">Dodaj</button>
		
		<div class="sadrzaj">
		<p>Sadrzaj apartmana</p>

		<table class="tt">
			<tr>
				<td><label>ID</label></td>
				<td><label>Ime</label></td>
			</tr>
			
			<tr v-for="s in sadrzajiApartmana">
				<td><label>{{s.id}}</label></td>
				<td><label>{{s.name}}</label></td>
			</tr>
		</table>
		</div>
	
</div>		  
`
	, 
	
	methods : {
		prikazi : function(id) {
			/*alert("dosao"+id);*/
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

Vue.component("dodajsadrzajApartmana", {
	data: function () {
		    return {
		      id:undefined,
		      name: undefined
		      
		    }
	},
	mounted(){
        axios
            .get('rest/apartmani/prikaz')
            .then(response =>{
	        	this.apartman = response.data;
	        	alert("Dobio trazeni apartman"+this.apartman.id);
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
	<a href="#/ar">Apartmani</a>
	<a href="#/pk">Korisnici</a>
	<a href="#/sh">Registracija domacina</a>
	<a href="#/sadrzajApartmanaPrikaz">SadrzajApartmana</a>
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
</div>
	<div class="sadrzaj">
		<p>Sadrzaj:</p>

		<table class="to">
			<tr>
				<td><label>ID:</label></td>
				<td><input type="text" v-model="id"/><td>
			</tr>
			<tr>
				<td><label>Ime:</label></td>
				<td><input type="text" v-model="name"/><td>
			</tr>
			<tr><td>&nbsp;</td>
				 <td align="left" style="color: red;font-size:14px">{{nazivValidacija}}</td>
            </tr>
		</table>
		<div class="b">
		<table>
		<tr>
			<td><input type="button" value="Potvrdi" v-on:click.prevent="dodajSadrzaj"><td>
			<td><input type="button" onclick="window.location.href='#/sadrzajApartmanaPrikaz';" value="Odustani"></td>
			
		</tr>
		</div>
	</div>

	
	
</div>		  
`
	, 
	
	computed: {
		nazivValidacija: function(){
			if(this.name != undefined && this.name.length > 0){
				let imeMatch = this.name.match('[A-Za-z ]*');
				if(imeMatch != this.name) return 'Ime u sebi moze sadrzati iskljucivo slova.';
				else if(this.name[0].match('[A-Z]') === null) return 'Ime mora pocinjati velikim slovom.'; 
			}
			else if(this.name === '') return 'Ime je obavezno polje.';
			else return null;
		}
},
	methods : {
		
		dodajSadrzaj(){
			
			var sadrzaj= {
				'id': this.id,
				'name': this.name,
			}
			
			alert("aaaaaaaa");
            axios.post('rest/sadrzaj/add', sadrzaj)
            .then(function (response) {
            	alert("dovdexxxxxxx");
                window.location.href = "#/sadrzajApartmanaPrikaz";
            })
            .catch(function (error) {
            	alert("exception");
                alert(error.response.data);
            });
		},
		
		prikazi : function(id) {
			/*alert("dosao"+id);*/
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
