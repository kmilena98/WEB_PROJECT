const Start = { template: '<start></start>' }
const Guest = { template: '<guest></guest>' }
const Host = { template: '<host></host>' }
const Admin = { template: '<admin></admin>' }
const LogIn = { template: '<log></log>' }
const Reg = { template: '<reg></reg>' }
const RegHost = { template: '<reghost></reghost>' }
const Logged = { template: '<logged></logged>' }
const Apartment = { template: '<ap></ap>' }
const PersonalDataEdit = { template: '<pr></pr>' }
const PersonalData = { template: '<pr1></pr1>' }
const UsersReview = { template: '<pk></pk>' }
const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: Start},
	    { path: '/sc', component: LogIn },
	    { path: '/ss', component: Reg },
	    { path: '/sh', component: RegHost },
	    { path: '/sa', component: Logged },
	    { path: '/g', component: Guest },
	    { path: '/h', component: Host },
	    { path: '/a', component: Admin },
	    { path: '/sb', component: Apartment },
	    { path: '/sd', component: PersonalDataEdit },
	    { path: '/pd', component: PersonalData },
	    { path: '/pk', component: UsersReview }
	  ]
});

var app = new Vue({
	router,
	el: '#startPage'
});

