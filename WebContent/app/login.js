Vue.component("log", {
	data: function () {
		    return {
		      sc: null,
		      user: null,
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
			<input type="text" v-model="password">
			<label>Lozinka:</label>
			<p class="message2" font-size:20px style="color:red;font-size:12px">{{passwordValidacija}}</p>
		</div>
			<input type="submit" name="" value="Potvrdi" v-on:click="login(username, password)">
	</form>
	
</div>		  
`
	,
	computed: {
		korisnickoImeValidacija: function(){
			if(this.username === '') return 'Korisnicko ime je obavezno polje!';
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
		/*clearSc : function () {
			if (confirm('Da li ste sigurni?') == true) {
				axios
		          .post('rest/proizvodi/clearSc')
		          .then(response => (this.init()))
			}
		},*/
		
		login : function(username, password) {
			//alert("radi")
			axios
	          .post('rest/proizvodi/getJustSc')
	          .then(response => (this.sc = response.data));
		}
	}/*,
	mounted () {
        axios
          .get('rest/proizvodi/getJustSc')
          .then(response => (this.sc = response.data));
        axios
        .get('rest/proizvodi/getTotal')
        .then(response => (this.total = response.data));
    }*/
});