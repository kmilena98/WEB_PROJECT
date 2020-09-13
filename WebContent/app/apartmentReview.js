Vue.component("ar", {
	data: function () {
		    return {
		      apartmants: null
		    }
	},
	mounted(){
        axios
            .get('rest/apartmani/ap')
            .then(response =>{
	        	this.apartmants = response.data;
	        	alert("Usao gde treba da udje!");
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
	<div class="topnav-right">
		<a href="#/pd">Moj profil</a>
		<a href="#/" v-on:click.prevent="logout">Odjava</a>
	</div>
</div>

		<button type="button" onclick="window.location.href='#/us';" type="button" class="button" id="t01">Pretrazi</button>

	  <form accept-charset="UTF-8">
            <table class="t" id="tabela" style="width:80%;">
                <caption>Pregled apartmana</caption>
                <tr>
                	 <td align="right">Slika</td>   
                 	 <td align="right">Lokacija </td>                    
                     <td align="right">Domacin</td>
                     <td align="right">Cena nocenja</td>
                     <td align="right">Tip apartmana</td>
                      <td align="right">ID</td>   
                </tr>
                 <tr v-for="ap in apartmants">
                  <div class="post-media">
                                <a href="#"><img style="width:150px;height:100px;" v-bind:src="ap.image" alt="" class="img-responsive"></a>
                            </div><!-- end media -->
                            
                <td>
					<table class = "granica">
					<tr>
					<td>{{ap.location.address.place}}</td>
					<td>{{ap.location.address.street}}</td>
					<td>{{ap.location.address.place}}</td>
					</tr>
					</table>
				</td>
                <td>{{ap.host}}</td>
                <td>{{ap.pracePerNight}}</td>
                <td>{{ap.roomType}}</td>
                 <td>{{ap.id}}</td>
                <td>
					<button type="button" v-on:click.prevent="prikazi(ap.id)">Prikazi</button>
					</td>
                </tr>
                
						
            </table>            
        </form>
	
	
</div>		  
`
	, 
	methods : {
		prikazi : function(id) {
			alert("dosao"+id);
		    axios.post('rest/registracija/logout')
	    	
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

