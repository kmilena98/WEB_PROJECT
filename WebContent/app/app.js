const Start = { template: '<start></start>' }
const Guest = { template: '<guest></guest>' }
const LogIn = { template: '<log></log>' }
const Reg = { template: '<reg></reg>' }
const RegHost = { template: '<reghost></reghost>' }
const Logged = { template: '<logged></logged>' }
const Apartment = { template: '<ap></ap>' }
const PersonalDataEdit = { template: '<pr></pr>' }
const PersonalData = { template: '<pr1></pr1>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: Start},
	    { path: '/sc', component: LogIn },
	    { path: '/ss', component: Reg },
	    { path: '/sh', component: RegHost },
	    { path: '/sa', component: Logged },
	    { path: '/g', component: Guest },
	    { path: '/sb', component: Apartment },
	    { path: '/sd', component: PersonalDataEdit },
	    { path: '/pd', component: PersonalData }
	  ]
});

var app = new Vue({
	router,
	el: '#startPage'
});

