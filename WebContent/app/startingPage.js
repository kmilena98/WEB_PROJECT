Vue.component("start", {
	data: function () {
		    return {
		      products: null
		    }
	},
	template: ` 
<div>
	
	<div class="header">
		<img src="/Web/WebContent/app/css/images/l.jpg"/>/
		<h1>Rezervacija apartmana </h1>
		<p>Izaberite svoju najbolju ponudu iz snova!</p>
	</div>

<div class="topnav">
  <a href="#/sc">Prijava</a>
  <a href="#/ss">Registracija</a>
  <a href="#/sa">Proba</a>
</div>

<div class="row">
  <div class="column side">
    <h2>Side</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
  </div>
  
  <div class="column middle">
    <h2>Main Content</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet pretium urna. Vivamus venenatis velit nec neque ultricies, eget elementum magna tristiq.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet pretium urna. Vivamus venenatis velit nec neque ultricies, eget elementum magna tristi.</p>
  </div>
  
  <div class="column side">
    <h2>Side</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
  </div>
</div>

<div class="footer">
  <p>Footer</p>
</div>
	
	
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