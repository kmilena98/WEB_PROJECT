Vue.component("pk", {
	data: function () {
		    return {
		      users: null
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
	<a href="#/sb">Apartmani</a>
	<a href="#/pk">Pregled korisnika</a>
	<a href="#/sh">Registracija domacina</a>
	<div class="topnav-right">
		<a href="#/sc">Prijava</a>
		<a href="#/ss">Registracija</a>
	</div>
</div>


<div class="footer">
  <p>Footer</p>
</div>
	
	
</div>		  
`
	, 
	methods : {
		
	},
	mounted () {
        
    },
});