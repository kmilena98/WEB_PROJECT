const Start = { template: '<start></start>' }
const Guest = { template: '<guest></guest>' }
const LogIn = { template: '<log></log>' }
const Reg = { template: '<reg></reg>' }
const Logged = { template: '<logged></logged>' }
const Apartment = { template: '<ap></ap>' }
const PersonalData = { template: '<pr></pr>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: Start},
	    { path: '/sc', component: LogIn },
	    { path: '/ss', component: Reg },
	    { path: '/sa', component: Logged },
	    { path: '/g', component: Guest },
	    { path: '/sb', component: Apartment },
	    { path: '/sd', component: PersonalData }
	  ]
});

var app = new Vue({
	router,
	el: '#startPage'
});

