Vue.component("logged", {
	data: function () {
		    return {
		      username: null,
		      password: null
		    }
	},
	template: ` 
<div>
	<h2>Prijava</h2>
	
	
	
</div>		  
`
	,
	mounted () {
		
        axios
          .get('rest/registracija/test/')
          .then(response => (this.username = response.data));
        
    }
	
	
	
});