Vue.component("log", {
	data: function () {
		    return {
		      kor: null,
		      username: null,
		      password: null
		    }
	},
	template: ` 
<div id="user" class="loginBox">
	<h2>Prijava</h2>
	<form>
		<div class="inputBox">
			<input type="text" v-model="username">
			<p class="message1" style="color:red;font-size:12px">{{korisnickoImeValidacija}}</p>
			<label>Korisnicko ime:</label>
		</div>
		
		<div class="inputBox">
			<input type="password" v-model="password">
			<label>Lozinka:</label>
			<p class="message2" font-size:20px style="color:red;font-size:12px">{{passwordValidacija}}</p>
		</div>
			<input type="submit" name="" value="Potvrdi" v-on:click.prevent="login">
	</form>
	
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
            var user = {
                'username': this.username,
                'password': this.password,
                'name': '',
				'surname': '',
				'gender':'MALE',
				'role':'GUEST',
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
                	alert("1");
    				this.kor = response.data;
    				alert("2");
    				if(this.kor.role==="HOST")
						window.location.href = "#/g";
                	else if(this.kor.role==="ADMINISTRATOR")
                		window.location.href = "#/g";
                	else
                		window.location.href = "#/g";
                			
                })
                .catch(function (error) {
                    alert("exaption"+error.response.data);
                });
			}
        }        
	}
});