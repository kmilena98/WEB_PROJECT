const Start = { template: '<start></start>' }
const Guest = { template: '<guest></guest>' }
const Host = { template: '<host></host>' }
const Admin = { template: '<admin></admin>' }
const LogIn = { template: '<log></log>' }
const Reg = { template: '<reg></reg>' }
const RegHost = { template: '<reghost></reghost>' }
const Apartment = { template: '<ap></ap>' }
const PersonalDataEdit = { template: '<pr></pr>' }
const PersonalData = { template: '<pr1></pr1>' }
const UsersReview = { template: '<pk></pk>' }
const UsersSearch = { template: '<us></us>' }
const UsersShow = { template: '<ush></ush>' }
const AddApartment = { template: '<aa></aa>'}
const ApartReview = { template: '<ar></ar>'}
const Reservation = { template: '<reservation></reservation>'}
const SamoApartmani = { template: '<samoApartmani></samoApartmani>'}
const PrikazApartmana = { template: '<prikazApartmana></prikazApartmana>'}
const PrikazRezervacijaDomacin = { template: '<prikazRezervacijaDomacin></prikazRezervacijaDomacin>'}
const PrikazRezervacijaAdministrator = { template: '<prikazRezervacijaAdministrator></prikazRezervacijaAdministrator>'}
const PrikazRezervacijaGost = { template: '<prikazRezervacijaGost></prikazRezervacijaGost>'}
const PretragaRezervacijaDA = { template: '<pretragaRezervacijaDA></pretragaRezervacijaDA>'}
const PrikazPretrageRezervacijaDA = { template: '<prikazPretrageRezervacijaDA></prikazPretrageRezervacijaDA>'}
const IzmenaApartmana = { template: '<izmenaApartmana></izmenaApartmana>'}
const PrikazApartmanaDomacin = { template: '<prikazApartmanaZaDomacina></prikazApartmanaZaDomacina>'}
const SadrzajApartmanaPrikaz = { template: '<sadrzajApartmanaPrikaz></sadrzajApartmanaPrikaz>'}
const IzmenaNazivaSadrzajaApartmana = { template: '<izmenaNazivaSadrzajaApartmana></izmenaNazivaSadrzajaApartmana>'}
const PrikazApartmanaZaGosta = { template : '<prikazApartmanaZaGosta></prikazApartmanaZaGosta>'}
const DodajSadrzajApartmana = { template: '<dodajsadrzajApartmana></dodajsadrzajApartmana>'}
const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: Start}, 
	    { path: '/sc', component: LogIn },
	    { path: '/ss', component: Reg },
	    { path: '/sh', component: RegHost },
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
	    { path: '/samoApartmani', component: SamoApartmani },
	    { path: '/prikazApartmana', component: PrikazApartmana },
	    { path: '/prikazApartmanaZaGosta', component: PrikazApartmanaZaGosta },
	    { path: '/prikazApartmanaDomacin', component: PrikazApartmanaDomacin },
	    { path: '/sadrzajApartmanaPrikaz', component: SadrzajApartmanaPrikaz },
	    { path: '/dodajsadrzajApartmana', component: DodajSadrzajApartmana },
	    { path: '/izmenaNazivaSadrzajaApartmana', component: IzmenaNazivaSadrzajaApartmana },
	    { path: '/prikazRezervacijaDomacin', component: PrikazRezervacijaDomacin },
	    { path: '/prikazRezervacijaAdministrator', component: PrikazRezervacijaAdministrator },
	    { path: '/izmenaApartmana', component: IzmenaApartmana },
	    { path: '/reservation', component: Reservation },
	    { path: '/pretragaRezervacijaDA', component: PretragaRezervacijaDA },
	    { path: '/prikazPretrageRezervacijaDA', component: PrikazPretrageRezervacijaDA },
	    { path: '/prikazRezervacijaGost', component: PrikazRezervacijaGost },
	    { path: '/ush', component: UsersShow }
	  ]
});

var app = new Vue({
	router,
	el: '#startPage'
});

