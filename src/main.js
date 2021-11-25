import Vue from 'vue'
// import useVuelidate from '@vuelidate/core'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '../filters/date.filter'
import messagePlugin from './utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'


import firebase from 'firebase/compat/app'
// import firebase from "@firebase/app-compat"
import 'firebase/compat/auth'
import 'firebase/compat/database'

Vue.config.productionTip = false

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);

firebase.initializeApp({
  apiKey: "AIzaSyA-HQwK43u3swO_YfVWqjPqCb-y15VGZsg",
  authDomain: "crm-vaspean.firebaseapp.com",
  projectId: "crm-vaspean",
  storageBucket: "crm-vaspean.appspot.com",
  messagingSenderId: "974539790273",
  appId: "1:974539790273:web:e15c3a67e846d39823c140"
});

let app;

firebase.auth().onAuthStateChanged(()=> {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }  
})



