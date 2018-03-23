// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase'

import App from '@/App'
import router from '@/router'
import store from '@/store'

Vue.config.productionTip = false

const config = {
  apiKey: 'AIzaSyCN44MXJmFQW42p8VIn7UXn7PxCf2rnVFM',
  authDomain: 'stack-overgol-bot.firebaseapp.com',
  databaseURL: 'https://stack-overgol-bot.firebaseio.com',
  projectId: 'stack-overgol-bot',
  storageBucket: 'stack-overgol-bot.appspot.com',
  messagingSenderId: '564241331900'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
