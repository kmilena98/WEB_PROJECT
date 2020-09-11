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
	<a href="#/pk">Korisnici</a>
	<a href="#/sh">Registracija domacina</a>
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
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
            alert(error.response.data);
	});
	},

		
	},
});

Vue.component("us", {
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
	<a href="#/pk">Korisnici</a>
	<a href="#/sh">Registracija domacina</a>
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
</div>


	  <form accept-charset="UTF-8">
            <table class="pretraga" style="width:80%">
               
                <tr>
                    <td align="right">Korisnicko ime:</td>
                    <td>&nbsp;</td>
                    <td align="left"><input type="password" id="lozinka"/></td>
                    <td>&nbsp;</td>
                </tr>
				 <tr><td>&nbsp;</td><td>&nbsp;</td>
                    <td align="left" style="color: red"></td>
				 </tr>
                <tr>
                    <td align="right">Uloga:</td>
                    <td>&nbsp;</td>
                    <td align="left">
                    	<select class="cb" style="width:208px;height:30px;">
							<option value="volvo">ADMINISTRATOR</option>
							<option value="saab">DOMACIN</option>
							<option value="opel">GOST</option>
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
                    	<select class="cb" style="width:208px;height:30px;">
							<option value="volvo">MUSKO</option>
							<option value="saab">ZENSKO</option>
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
                    	<button >Sacuvaj</button>
                    	
                    	<button onclick="window.location.href='#/pk'">Odustani</button></td>
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
            alert(error.response.data);
	});
	},

		
	},
});