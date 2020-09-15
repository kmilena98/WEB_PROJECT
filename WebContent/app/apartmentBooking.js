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

	<div class="marta" id="main">
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
		amenities:null,	
		am : {
			id:'',
			name:'',
		},
		id: undefined,
		roomType: undefined,
        roomNumber: undefined,
        guestNumber: undefined,
        location: undefined,
        latitude: undefined,
        address: undefined,
        longitude: undefined,
        street: undefined,
        place: undefined,
        zipCode: undefined,
        dateForRenting: undefined,
        hostName: undefined,
        image: undefined,
        pracePerNight: undefined,
        checkinTime: undefined,
        checkoutTime: undefined,
        status: undefined,
        previewImage: null,
        datesForRenting : [],
        selectedAmenities : []
        /*comments: null*/
    }},
    mounted(){
		axios
        .get('rest/sadrzaj/prikazSadrzaja')
        .then(response =>{
        	this.amenities = response.data;
        	
        })
        .catch(error => {
            alert("Doslo je do greske prilikom ucitavanja kategorija");
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
                                <td align="left"><input type="text" v-model="id" style="width:208px;height:25px;"/></td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                            
                                <td align="left">Tip apartmana:</td>
                                <td align="left">
                                <select class="cb" v-model="roomType" style="width:208px;height:25px;">
									<option selected="selected">ROOM</option>
									<option>WHOLE_APPARTMENT</option>
								</select>
								</td>
							</tr>	
							 <tr>
                                <td align="left">Broj soba:</td>
                                <td align="left">
                                	<select class="cb" v-model="roomNumber" style="width:208px;height:25px;">
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
                                	<select class="cb" v-model="guestNumber" style="width:208px;height:25px;">
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
                                <td align="left">
                                	<tr>
                                		<td>Geografska sirina:</td>
                                		<td><input type="text" v-model="latitude" style="width:208px;height:25px;"/></td>
                                	</tr>
                                	<tr><td>&nbsp;</td>
				 						<td align="left" style="color: red;font-size:12px">{{cenaValidacija}}</td>
                 					</tr>
                                	<tr>
                                		<td>Geografska duzina:</td>
                                		<td><input type="text" v-model="longitude" style="width:208px;height:25px;"/></td>
                                	</tr>
                                	<tr><td>&nbsp;</td>
				 						<td align="left" style="color: red;font-size:12px">{{cenaValidacija}}</td>
                 					</tr>
                                	<tr>
                                		<td>Ulica:</td>
                                		<td><input type="text" v-model="street" style="width:208px;height:25px;"/></td>
                                	</tr>
                                	<tr><td>&nbsp;</td>
				 						<td align="left" style="color: red;font-size:12px">{{cenaValidacija}}</td>
                 					</tr>
                                	<tr>
                                		<td>Grad:</td>
                                		<td><input type="text" v-model="place" style="width:208px;height:25px;"/></td>
                                	</tr>
                                	<tr><td>&nbsp;</td>
				 						<td align="left" style="color: red;font-size:12px">{{cenaValidacija}}</td>
                 					</tr>
                                	<tr>
                                		<td>Postanski broj:</td>
                                		<td><input type="text" v-model="zipCode" style="width:208px;height:25px;"/></td>
                                	</tr>
                                	<tr><td>&nbsp;</td>
				 						<td align="left" style="color: red;font-size:12px">{{cenaValidacija}}</td>
                 					</tr>
                                </td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                            	<td>Datum za izdavanje od:</td>
                            	<td><tr><td><input type="date" id="start" name="trip-start"
    								value="2018-07-22"
    								min="2018-01-01" max="2040-12-31" v-model="dateForRenting" style="width:208px;height:25px;"/>
    							</td>
    							<td><button v-on:click.prevent="dodajDatum(dateForRenting)">Dodaj</button></td></tr>
    							 </td>
                            </tr>
                            <tr>
                                <td align="left">Cena:</td>
                                <td align="left"><input type="text" v-model="pracePerNight" style="width:208px;height:25px;"/></td>
                                <td>&nbsp;&nbsp;</td>
                                </tr>
				 			<tr><td>&nbsp;</td>
				 				<td align="left" style="color: red;font-size:12px">{{cenaValidacija}}</td>
                 			</tr>
                            </tr>
                            <tr>
                                <td align="left">Vreme za prijavu:</td>
                                <td align="left"><input type="time" v-model="checkinTime" style="width:208px;height:25px;"/></td>
                                <td>&nbsp;&nbsp;</td>
                            </tr>
                             <tr>
                                <td align="left">Vreme za odjavu:</td>
                                <td align="left"><input type="time" v-model="checkoutTime" style="width:208px;height:25px;"/></td>
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
                            		<tr v-for="s in amenities">
									<input type="checkbox" id="s.name" name="vehicle1" :value="{id : s.id,
																								name : s.name}" v-model="selectedAmenities">
									
									<span>{{s.name}}</span><br>
    								
    								</tr>
    								
    							<span>Selektovane aktivnosti: {{selectedAmenities}}</span>
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
		 cenaValidacija: function(){
				if(this.id === null || this.pracePerNight === '') return 'Cena je je obavezno polje.';
				else if(Number(this.id) < 0) return 'Cena ne moze biti negativan broj.'; 
				else return null;
     },
		geografskaSirinaValidacija: function(){
			if(this.latitude === '') return 'Niste unijeli geografsku sirinu.';
			else return null;
		},
		geografskaDuzinaValidacija: function(){
			if(this.longitude === '') return 'Niste unijeli geografsku duzinu.';
			else return null;
		},
		ulicaValidacija: function(){
			if(this.street === '') return 'Niste unijeli ulicu.';
			else return null;
		},
		gradValidacija: function(){
			if(this.place != undefined && this.place.length > 0){
				let placeMatch = this.place.match('[A-Za-z ]*');
				if(placeMatch != this.place) return 'Grad se mora sastojati samo od slova';
				else if(this.place[0].match('[A-Z]') === null) return 'Grad mora pocinjati velikim slovom'; 
			}
			else if(this.place === '') return 'Niste unijeli grad.';
			else return null;
		},
		postanskiBrojValidacija: function(){
			if(this.zipCode === '') return 'Niste unijeli postanski broj.';
			else return null;
		},
        cenaValidacija: function(){
				if(this.pracePerNight === null || this.pracePerNight === '') return 'Cena je je obavezno polje.';
				else if(Number(this.pracePerNight) < 0) return 'Cena ne moze biti negativan broj.'; 
				else return null;
        },
        datumValidacija1: function(){
				if(this.dateOfRentingStart === '') return 'Datum je obavezno polje.';
				else if(this.manji1(this.dateOfRentingStart)) return 'Datum  ne moze biti manji od danasnjeg';
				else return null;
        },
        datumValidacija2: function(){
			if(this.dateOfRentingEnd === '') return 'Datum je obavezno polje.';
			else if(this.manji2(this.dateOfRentingStart, this.dateOfRentingEnd)) return 'Ovaj datum ne moze biti manji od datuma pocetka';
			else return null;
    },
        
        slikaValidacija: function(){
            if(this.previewImage === '') return 'Slika je obavezno polje.';
            else return null;
        },
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
		manji1: function(datum){
            var date = new Date();
			var month = ('0' + (date.getMonth() + 1)).slice(-2);
			var day = ('0' + date.getDate()).slice(-2);
			var year = date.getFullYear();
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
		manji2: function(datum1, datum2){
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
		dodajDatum(dateForRenting){
			alert("Usao u dodajDatum");
			this.datesForRenting.push(dateForRenting);

			alert("Usao u dodajDatum2");
			alert(this.datesForRenting[0]);
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
        	
        			var adresa = {
        					 'street': this.street,
                             'place': this.place,
                             'zipCode': this.zipCode,	
        			}
        			var lokacija = {
        					
        					'latitude': this.latitude,
                            'longitude': this.longitude,
                            'address': adresa,
        			}
                     var ap = {
                    	'id' : this.id,
                        'roomType': this.roomType,
                        'roomNumber': this.roomNumber,
                        'guestNumber': this.guestNumber,
                        'location' : lokacija,
                        'datesForRenting':this.datesForRenting,
                        'hostName' : this.hostName,
                        'image' : this.previewImage,
                        'pracePerNight' : this.pracePerNight,
                        'checkinTime' : this.checkinTime,
                        'checkoutTime' : this.checkoutTime,
                        'status' : "INACTIVE",
                        'amenities' : this.selectedAmenities
                        
                    };
        			var i;
        			alert("Selektovani amenities"+this.selectedAmenities[0]);
        			/*for (i = 0; i < amenities.length; i++) {
        				alert("Usao u for");
        				var el = document.getElementById('this.amanities[i].id');
        				alert(el);
        			  
        			}*/
                    alert("aaaaaaaa");
		            axios.post('rest/apartmani/add', ap)
                    .then(function (response) {
                    	alert("dovdexxxxxxx");
                        /*window.location.href = "#/sh";*/
                    })
                    .catch(function (error) {
                    	alert("exception");
                        alert(error.response.data);
                    });
				/*}*/
			}
		}
	});
