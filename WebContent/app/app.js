const Start = { template: '<start></start>' }
const LogIn = { template: '<log></log>' }
const Reg = { template: '<reg></reg>' }
const Logged = { template: '<logged></logged>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: Start},
	    { path: '/sc', component: LogIn },
	    { path: '/ss', component: Reg },
	    { path: '/sa', component: Logged }
	  ]
});

var app = new Vue({
	router,
	el: '#startPage'
});

