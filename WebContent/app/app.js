const Start = { template: '<start></start>' }
const LogIn = { template: '<log></log>' }
const Reg = { template: '<reg></reg>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: Start},
	    { path: '/sc', component: LogIn },
	    { path: '/ss', component: Reg }
	  ]
});

var app = new Vue({
	router,
	el: '#startPage'
});

