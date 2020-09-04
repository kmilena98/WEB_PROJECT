Vue.component("log", {
	data: function () {
		    return {
		      sc: null,
		      user: null
		    }
	},
	template: ` 
<div id="user" class="loginBox">
	<h2>Prijava</h2>
	<form>
		<div class="inputBox">
			<input type="text" v-model="username">
			<label>Korisnicko ime</label>
		</div>
		<div class="inputBox">
			<input type="text" v-model="password">
			<label>Lozinka</label>
		</div>
			<input type="submit" name="" value="Potvrdi" v-on:click="login(username, password)">
	</form>
	
</div>		  
`
	, 
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