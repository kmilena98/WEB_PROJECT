Vue.component("start", {
	data: function () {
		    return {
		      products: null
		    }
	},
	template: ` 
<div>
	
	<a href="#/sc">Prijava</a>
	<a href="#/ss">Registracija</a>
	
</div>		  
`
	, 
	methods : {
		addToCart : function (product) {
			axios
			.post('rest/proizvodi/add', {"id":''+product.id, "count":parseInt(product.count)})
			.then(response => (toast('Product ' + product.name + " added to the Shopping Cart")))
		}
	},
	mounted () {
        axios
          .get('rest/proizvodi/getJustProducts')
          .then(response => (this.products = response.data))
    },
});