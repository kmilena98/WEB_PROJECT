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
		id: undefined,
		roomType: undefined,
        roomNumber: undefined,
        guestNumber: undefined,
        location: undefined,
        dateOfRentingStart: undefined,
        dateOfRentingEnd: undefined,
        hostName: undefined,
        image: undefined,
        pracePerNight: undefined,
        checkinTime: undefined,
        checkoutTime: undefined,
        status: undefined,
        previewImage: null,
        /*comments: null*/
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
    <a href="#/sb">Apartmani</a>
	<a href="#/pk">Korisnici</a>
	<a href="#/aa">Dodavanje apartmana</a>
    	<div class="topnav-right">
			<a href="#/sd">Moj profil</a>
			<a href="#/" v-on:click.prevent="logout">Odjava</a>
    	</div>
    </div>
    <div class="naslov">
    	<h2>Dodaj apartman</h2>
    </div>

		    	<div id="forme" class="dodavanjeApartmana">
		    		<form accept-charset="UTF-8">
            		    <table align="center">
                            <tr>
                            	 <tr>
                                <td align="left">ID:</td>
                                <td align="left"><input type="text" v-model="id"/></td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                                <td align="left">Tip apartmana:</td>
                                <td align="left">
                                <select class="cb" v-model="roomType" style="width:208px;height:30px;">
									<option selected="selected">ROOM</option>
									<option>WHOLE_APPARTMENT</option>
								</select>
								</td>
							</tr>	
							 <tr>
                                <td align="left">Broj soba:</td>
                                <td align="left">
                                	<select class="cb" v-model="roomNumber" style="width:208px;height:30px;">
										<option selected="selected">1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</select>
								</td>
							</tr>
							<tr>
                                <td align="left">Broj gostiju:</td>
                                <td align="left">
                                	<select class="cb" v-model="guestNumber" style="width:208px;height:30px;">
										<option selected="selected">1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</select>
								</td>
							</tr>
                            <tr>
                                <td align="left">Lokacija:</td>
                                <td align="left"><input type="text" v-model="location"/></td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                            	<td>Datum za izdavanje od:</td>
                            	<td><input type="date" id="start" name="trip-start"
    								value="2018-07-22"
    								min="2018-01-01" max="2040-12-31" v-model="dateOfRentingStart"/>
    							</td>
                            </tr>
                            <tr>
                            	<td>Datum za izdavanje do:</td>
                            	<td><input type="date" id="start" name="trip-start"
    								value="2018-07-22"
    								min="2018-01-01" max="2040-12-31" v-model="dateOfRentingEnd"/>
    							</td>
                            </tr>
                            <tr>
                                <td align="left">Cena:</td>
                                <td align="left"><input type="text" v-model="pracePerNight"/></td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                                <td align="left">Vreme za prijavu:</td>
                                <td align="left"><input type="text" v-model="checkinTime"/></td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                             <tr>
                                <td align="left">Vreme za odjavu:</td>
                                <td align="left"><input type="text" v-model="checkoutTime"/></td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                             
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                             	<td></td>
                                <td align="left"><input type="file" accept="image/*" @change=uploadImage></td>

                            </tr>
                            <td align="left">Slika:</td>
                            <td><img  :src = "previewImage" style = "display:flex" width="150" heigh="100" /></td>
                            <tr>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
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
                                <button v-on:click.prevent="dodajApartman">Dodaj</button>
                                <button onclick="window.location.href='#/h'">Odustani</button></td>
                            </tr>		   			
                        </table>            
                    </form> 
			</div>
    </div>`,
	computed: {
		locationValidacija: function(){
			if(this.location === '') return 'Niste unijeli lokaciju.';
			else return null;
		},
		/*opisValidacija: function(){
			if(this.opis === '') return 'Opis ne moze biti prazan.';
			else return null;
        },*/
        cenaValidacija: function(){
				if(this.pracePerNight === null || this.pracePerNight === '') return 'Cena je je obavezno polje.';
				else if(Number(this.pracePerNight) < 0) return 'Cena ne moze biti negativan broj.'; 
				else return null;
        },
        datumValidacija1: function(){
				if(this.dateOfRentingStart === '') return 'Datum je obavezno polje.';
				else if(this.manji(this.dateOfRentingStart)) return 'Datum  ne moze biti manji od danasnjeg';
				else return null;
        },
        datumValidacija2: function(){
			if(this.dateOfRentingEnd === '') return 'Datum je obavezno polje.';
			else if(this.manji(this.dateOfRentingEnd)) return 'Datum  ne moze biti manji od danasnjeg';
			else return null;
    },
        domacinValidacija: function(){
				if(this.host != undefined && this.host.length > 0){
					let hostMatch = this.host.match('[A-Za-z ]*');
					if(hostMatch != this.host) return 'Domacin se mora sastojati samo od slova';
					else if(this.host[0].match('[A-Z]') === null) return 'Domacin mora pocinjati velikim slovom'; 
				}
				else if(this.host === '') return 'Domacin je obavezno polje.';
				else return null;
        },
        slikaValidacija: function(){
            if(this.previewImage === '') return 'Slika je obavezno polje.';
            else return null;
        },
        /*kategorijaValidacija: function(){
            if(this.kat === '') return 'Kategorija je obavezno polje.'
            else return null;
        }*/
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
		manji: function(datum1, datum2){
           /* var date = new Date();
			var month = ('0' + (date.getMonth() + 1)).slice(-2);
			var day = ('0' + date.getDate()).slice(-2);
			var year = date.getFullYear();*/
			if(datum1 != undefined && datum2 != undefined){
				datum1 = datum.split('-');
				datum2 = datum.split('-');
				if(datum2[0] < datum1[0]) return true;
				if(datum2[0] > datum1[0]) return false;
				if(datum2[1] < datum1[1]) return true;
				if(datum2[1] > datum1[1]) return false;
				if(datum2[2] <= datum1[2]) return true;
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
    	dodajApartman(){
        	alert("tooooooooo");
            /*var date = new Date();
			var month = ('0' + (date.getMonth() + 1)).slice(-2);
			var day = ('0' + date.getDate()).slice(-2);
			var year = date.getFullYear();
			var datum = year + '-' + month + '-' + day;*/

           /* var ok = true;
				
                let hostMatch = '';
                                      
                if(this.lokacija != undefined) this.lokacija.trim();
                else this.lokacija = '';

				if(this.hostName != undefined) {
					this.hostName.trim();
					hostMatch = this.hostName.match('[A-Za-z ]*');
				}
                else this.hostName = '';*/
                
               /* if(this.kat === undefined){
                    this.kat = '';
                }*/
                /*if(this.opis === undefined){
                    this.opis = '';
                }
                else this.opis.trim();*/

               /* if(this.pracePerNight === undefined){
                    this.pracePerNight = null;
                }

                if(this.dateOfRentingStart === undefined){
                    this.dateOfRentingStart = '';
                }
                if(this.dateOfRentingEnd === undefined){
                    this.dateOfRentingEnd = '';
                }

                if(this.previewImage === null){
                    this.previewImage = '';
                }
		
				if(this.location === undefined || this.location === '' ||
				   this.pracePerNight === undefined || this.pracePerNight === '' || this.dateOfRentingStart === undefined || this.dateOfRentingStart === '' ||
				   this.dateOfRentingEnd === undefined || this.dateOfRentingEnd === '' || this.hostName === undefined || this.hostName === '' || this.previewImage ===''){
					ok = false;
				}
				else if((hostMatch != this.host) || (this.hostName[0].match('[A-Z]') === null)){
					ok = false;
				}
				else if(this.manji(this.dateOfRentingStart, this.dateOfRentingEnd) || (Number(this.pracePerNight) < 0)){
					ok = false;
				}*/
				
				/*if(ok){*/
        	alert("ssssssss");
                     var ap = {
                    	'id' : this.id,
                        'roomType': this.roomType,
                        'roomNumber': this.roomNumber,
                        'guestNumber': this.guestNumber,
                        'location': this.location,
                        'dateOfRentingStart' : this.dateOfRentingStart,
                        'dateOfRentingEnd' : this.dateOfRentingEnd,
                        'hostName' : this.hostName,
                        'image' : this.previewImage,
                        'pracePerNight' : this.pracePerNight,
                        'checkinTime' : this.checkinTime,
                        'checkoutTime' : this.checkoutTime,
                        'status' : false
                        
                    };
                    alert("aaaaaaaa");
		            axios.post('rest/apartmani/add', ap)
                    .then(function (response) {
                    	alert("dovdexxxxxxx");
                        window.location.href = "#/sh";
                    })
                    .catch(function (error) {
                    	alert("exception");
                        alert(error.response.data);
                    });
				/*}*/
			}
		}
	});
