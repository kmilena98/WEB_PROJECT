Vue.component("reg", {
	data: function () {
		    return {
		      sc: null
		    }
	},
	template: ` 
<div id="user" class="registrationBox">
	<h2>Registracija</h2>
	<form>
		<div class="inputBox">
			<input type="text" v-model="username">
			<label>Korisnicko ime</label>
		</div>
		<div class="inputBox">
			<input type="text" v-model="name">
			<label>Ime</label>
		</div>
		<div class="inputBox">
			<input type="text" v-model="surname">
			<label>Prezime</label>
		</div>
		<div class="inputBox">
			<input type="password" v-model="password">
			<label>Lozinka</label>
		</div>
		<div class="radioButton">
			<label class="gender">Pol</label>
			<label class="radio">
				<input type="radio" name="gender" value="male" checked="checked"> Male
  				<span></span>
  			</label>
  			<label class="radio">
  				<input type="radio" name="gender" value="female"> Female<br>
  				<span></span>
  			</label>
  		</div>
			<input type="submit" name="" value="Potvrdi" v-on:click="registration(username, name, surname, password)">
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
			},*/ 
		registration : function(username, name, surname, password) {
			//alert("radi")
			axios
	          .post('rest/proizvodi/clearSc')
	          .then(response => (this.init()))
		} 
	}
	/*mounted () {
        axios
          .get('rest/proizvodi/getJustSc')
          .then(response => (this.sc = response.data));
        axios
        .get('rest/proizvodi/getTotal')
        .then(response => (this.total = response.data));
    }*/
});