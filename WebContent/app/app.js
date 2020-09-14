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
const UsersSearch = { template: '<us></us>' }
const UsersShow = { template: '<ush></ush>' }
const AddApartment = { template: '<aa></aa>'}
const ApartReview = { template: '<ar></ar>'}
const PrikazApartmana = { template: '<prikazApartmana></prikazApartmana>'}
const IzmenaApartmana = { template: '<izmenaApartmana></izmenaApartmana>'}
const PrikazApartmanaDomacin = { template: '<prikazApartmanaZaDomacina></prikazApartmanaZaDomacina>'}
const SadrzajApartmanaPrikaz = { template: '<sadrzajApartmanaPrikaz></sadrzajApartmanaPrikaz>'}
const DodajSadrzajApartmana = { template: '<dodajsadrzajApartmana></dodajsadrzajApartmana>'}
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
	    { path: '/pk', component: UsersReview },
	    { path: '/aa', component: AddApartment },
	    { path: '/us', component: UsersSearch },
	    { path: '/ar', component: ApartReview },
	    { path: '/prikazApartmana', component: PrikazApartmana },
	    { path: '/prikazApartmanaDomacin', component: PrikazApartmanaDomacin },
	    { path: '/sadrzajApartmanaPrikaz', component: SadrzajApartmanaPrikaz },
	    { path: '/dodajsadrzajApartmana', component: DodajSadrzajApartmana },
	    { path: '/izmenaApartmana', component: IzmenaApartmana },
	    { path: '/ush', component: UsersShow }
	  ]
});

var app = new Vue({
	router,
	el: '#startPage'
});

