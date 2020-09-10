Vue.component("pk", {
	data: function () {
		    return {
		      users: null
		    }
	},
	mounted(){
        axios
            .get('rest/registracija/korisnici')
            .then(response =>{
	        	this.users = response.data;
    	    })
	        .catch(error => {
    	        alert("Doslo je do greske prilikom ucitavanja prijavljenog");
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
	<a href="#/sb">Apartmani</a>
	<a href="#/pk">Pregled korisnika</a>
	<a href="#/sh">Registracija domacina</a>
	<div class="topnav-right">
		<a href="#/sc">Prijava</a>
		<a href="#/ss">Registracija</a>
	</div>
</div>

		<button type="button" class="button" id="t01">Pretrazi</button>

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
		
	},
});