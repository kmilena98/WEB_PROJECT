Vue.component("ap", {
	data: function () {
		    return {
		      sc: null,
		      user: null,
		      username: null,
		      password: null
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
		<a href="#/sc">Prijava</a>
		<a href="#/ss">Registracija</a>
		<a href="#/sd">Moj profil</a>
	</div>
</div>

	<div class="main" id="main">
		<div class="w3layouts_main_grid">
		<div class="booking-form-head-agile">
		<h3>Forma rezervacije smestaja</h3>
		</div>
			<form action="#" method="post" class="w3_form_post">
				
				<div class="agileits_main_grid w3_agileits_main_grid">
					<div class="wthree_grid">
						<h5>Room Type</h5>
						<select id="category" name="category" required="">
							<option value=" ">None</option>
							<option value="category1">Soba</option>
							<option value="category2">Ceo apartman</option>
							
						</select>
					</div>
				</div>
				<div class="agileits_w3layouts_main_grid w3ls_main_grid">
					<div class="agileinfo_grid">
					<h5>Check In & Time *</h5>
						
						<div class="agileits_w3layouts_main_gridl">
							<input class="date" id="datepicker" name="Text" type="date" value="mm/dd/yyyy" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '08/13/2016';}" required="">
						</div>
						<div class="agileits_w3layouts_main_gridr">
							<input type="time" name="Time" required="">
						</div>
						<div class="clearfix"> </div>
					</div>
				</div>
				<div class="agileits_w3layouts_main_grid w3ls_main_grid">
					<div class="agileinfo_grid">
					<h5>Check Out & Time *</h5>
						
						<div class="agileits_w3layouts_main_gridl">
							<input class="date" id="datepicker1" name="Text" type="date" value="mm/dd/yyyy" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '08/13/2016';}" required="">
						</div>
						<div class="agileits_w3layouts_main_gridr">
							<input type="time" name="Time" required="">
						</div>
						<div class="clearfix"> </div>
					</div>
				</div>
				<div class="agileinfo_main_grid">
					<div class="agileits_w3layouts_grid">
						<h5>Number of Guests *</h5>
						<select id="category1" name="category1" required="">
							<option value=" ">01</option>
							<option value="category2">02</option>
							<option value="category3">03</option>
							<option value="category4">04</option>
							<option value="category2">05</option>
							<option value="category3">06</option>
						</select>
					</div>
				</div>
				<div class="w3_main_grid">
					
					<div class="w3_main_grid_right">
						<input type="submit" value="Book Now">
					</div>
					<div class="clearfix"> </div>
				</div>
			</form>
		</div>

</div>
	
</div>		  
`
	,
	computed: {
		korisnickoImeValidacija: function(){
			if(this.username === '') return 'Korisnicko ime je obavezno polje 1!';
			else return null;
		},passwordValidacija: function(){
			if(this.password === '') return 'Lozinka je obavezno polje!';
			else return null;
		},
		
	},
	methods : {
		init : function() {
			this.sc = {};
		}, 
		 login(){
			//alert("Hello! !");
            var user = {
                'korisnickoIme': this.username,
                'lozinka': this.password,
                'ime': '',
				'prezime': '',
				'uloga': 'GUEST',
				'gender':'MALE',
            };
            
            var ok = true;
            
            if(this.username != undefined) this.username.trim();
			else this.username = '';

            if(this.password != undefined) this.password.trim();
			else this.password = '';
           
			if(this.username === undefined || this.username === '' || this.password === undefined || this.password === ''){
				ok = false;
			}
			else{
				ok = true;
			}
			if(ok){
				axios.post('rest/registracija/login', user)
                .then(function (response) {
						window.location.href = "pr.html";
                })
                .catch(function (error) {
                    alert(error.response.data);
                });
			}
        }        
	}
});

Vue.component("aa", {
	data: function(){
		return {
		roomType: undefined,
        roomNumber: undefined,
        guestNumber: undefined,
        location: undefined,
        dateOfRentingStart: undefined,
        dateOfRentingEnd: undefined,
        host: undefined,
        slika: undefined,
        pracePerNight: undefined,
        checkinTime: undefined,
        checkoutTime: undefined,
        status: undefined,
        previewImage: null,
        comments: null
    }},
   /* mounted(){
		axios
        .get('rest/kategorije')
        .then(response =>{
        	this.kategorije = response.data;
        })
        .catch(error => {
            alert("Doslo je do greske prilikom ucitavanja kategorija");
        })
    },*/
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
    <div class="naslov">
    	<h2>Dodaj apartmane</h2>
    </div>

		    	<div id="forme" class="dodavanjeApartmana">
		    		<form accept-charset="UTF-8">
            		    <table align="center">
                            <tr>
                                <td align="left">Tip apartmana:</td>
                                <td align="left">
                                <select class="cb" style="width:208px;height:30px;">
									<option>SOBA</option>
									<option>CEO APARTMAN</option>
								</select>
								</td>
							</tr>	
							 <tr>
                                <td align="left">Broj soba:</td>
                                <td align="left">
                                	<select class="cb" style="width:208px;height:30px;">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
									</select>
								</td>
							</tr>
                            <tr>
                                <td align="left">Lokacija:</td>
                                <td align="left"><input type="text" /></td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                            	<td>Datum za izdavanje od:</td>
                            	<td><input type="date" id="start" name="trip-start"
    								value="2018-07-22"
    								min="2018-01-01" max="2018-12-31"/>
    							</td>
                            </tr>
                            <tr>
                            	<td>Datum za izdavanje do:</td>
                            	<td><input type="date" id="start" name="trip-start"
    								value="2018-07-22"
    								min="2018-01-01" max="2018-12-31"/>
    							</td>
                            </tr>
                            <tr>
                                <td align="left">Domacin:</td>
                                <td align="left"><input type="text" /></td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                                <td align="left">Cena:</td>
                                <td align="left"><input type="text" /></td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                                <td align="left">Vreme za prijavu:</td>
                                <td align="left"><input type="text"/></td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                             <tr>
                                <td align="left">Vreme za odjavu:</td>
                                <td align="left"><input type="text" /></td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                                <td align="left">Status:</td>
                                <td align="left">
                                	<select class="cb" style="width:208px;height:30px;">
										<option>AKTIVAN</option>
										<option>NEAKTIVAN</option>
									</select>
								</td>
							</tr>
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td align="left">Slika:</td>
                                <td align="left"><input type="file" accept="image/*" @change=uploadImage>

                               <img  :src = "previewImage" style = "display:flex" width="150" heigh="100" /></td>
                            </tr>
                            
                            <tr>
                            	<td>Sadrzaj apartmana:</td>
                            </tr>
                            <tr>
                            	<td>
									<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
    								<label for="vehicle1"> I have a bike</label><br>
    								<input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
    								<label for="vehicle2"> I have a car</label><br>
    								<input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">
    								<label for="vehicle3"> I have a boat</label><br><br>
    							</td>
							</tr>
                                   
                          
                            <tr>
                                <td align="right" >
                                <button>Dodaj</button>
                                <button>Odustani</button></td>
                            </tr>		   			
                        </table>            
                    </form> 
			</div>
    </div>`,
	computed: {
		nazivOglasaValidacija: function(){
			if(this.nazivOglasa === '') return 'Niste unijeli naziv oglasa.';
			else return null;
		},
		opisValidacija: function(){
			if(this.opis === '') return 'Opis ne moze biti prazan.';
			else return null;
        },
        cijenaValidacija: function(){
				if(this.cijena === null || this.cijena === '') return 'Cijena je je obavezno polje.';
				else if(Number(this.cijena) < 0) return 'Cijena ne moze biti negativan broj.'; 
				else return null;
        },
        datumValidacija: function(){
				if(this.datumIsticanja === '') return 'Datum isticanja je obavezno polje.';
				else if(this.manji(this.datumIsticanja)) return 'Datum isticanja ne moze biti manji od danasnjeg';
				else return null;
        },
        gradValidacija: function(){
				if(this.grad != undefined && this.grad.length > 0){
					let gradMatch = this.grad.match('[A-Za-z ]*');
					if(gradMatch != this.grad) return 'Grad se mora sastojati samo od slova';
					else if(this.grad[0].match('[A-Z]') === null) return 'Grad mora pocinjati velikim slovom'; 
				}
				else if(this.grad === '') return 'Grad je obavezno polje.';
				else return null;
        },
        slikaValidacija: function(){
            if(this.previewImage === '') return 'Slika je obavezno polje.';
            else return null;
        },
        kategorijaValidacija: function(){
            if(this.kat === '') return 'Kategorija je obavezno polje.'
            else return null;
        }
    },
    methods: {
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
		manji: function(datum){
            var date = new Date();
			var mjesec = ('0' + (date.getMonth() + 1)).slice(-2);
			var dan = ('0' + date.getDate()).slice(-2);
			var godina = date.getFullYear();
			if(datum != undefined){
				datum = datum.split('-');
				if(datum[0] < godina) return true;
				if(datum[0] > godina) return false;
				if(datum[1] < mjesec) return true;
				if(datum[1] > mjesec) return false;
				if(datum[2] <= dan) return true;
				return false;
			}
			return false;
		},
        uploadImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
            this.previewImage = e.target.result;
            };
        },
        odustani: function(){
            window.location.href = "oglasi.html";
        },
    	dodajOglas(){
            var date = new Date();
			var mjesec = ('0' + (date.getMonth() + 1)).slice(-2);
			var dan = ('0' + date.getDate()).slice(-2);
			var godina = date.getFullYear();
			var datum = godina + '-' + mjesec + '-' + dan;

            var ok = true;
				
                let gradMatch = '';
                                      
                if(this.nazivOglasa != undefined) this.nazivOglasa.trim();
                else this.nazivOglasa = '';

				if(this.grad != undefined) {
					this.grad.trim();
					gradMatch = this.grad.match('[A-Za-z ]*');
				}
                else this.grad = '';
                
                if(this.kat === undefined){
                    this.kat = '';
                }
                if(this.opis === undefined){
                    this.opis = '';
                }
                else this.opis.trim();

                if(this.cijena === undefined){
                    this.cijena = null;
                }

                if(this.datumIsticanja === undefined){
                    this.datumIsticanja = '';
                }

                if(this.previewImage === null){
                    this.previewImage = '';
                }
		
				if(this.nazivOglasa === undefined || this.nazivOglasa === '' || this.opis === undefined || this.opis === '' ||
				   this.cijena === undefined || this.cijena === '' || this.datumIsticanja === undefined || this.datumIsticanja === '' ||
				   this.grad === undefined || this.grad === '' || this.kat === '' || this.kat === undefined || this.previewImage ===''){
					ok = false;
				}
				else if((gradMatch != this.grad) || (this.grad[0].match('[A-Z]') === null)){
					ok = false;
				}
				else if(this.manji(this.datumIsticanja) || (Number(this.cijena) < 0)){
					ok = false;
				}
				
				if(ok){
                     var oglas = {
                        'naziv': this.nazivOglasa,
                        'cijena': this.cijena,
                        'opis': this.opis,
                        'datumIsticanja': this.datumIsticanja,
                        'pozitivneOcjene' : 0,
                        'kategorija' : this.kat.naziv,
                        'negativneOcjene' : 0,
                        'datumPostavljanja' : datum,
                        'aktivan' : 0,
                        'obrisan' : false,
                        'grad' : this.grad,
                        'nazivSlike' : this.previewImage
                    };
		            axios.post('rest/oglasi/dodaj', oglas)
                    .then(function (response) {
                        window.location.href = "oglasi.html";
                    })
                    .catch(function (error) {
                        alert(error.response.data);
                    });
				}
			}
		}
	});
