// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase'


import App from '@/App'
import router from '@/router'
import store from '@/store'
import config from '@/helpers/firebaseConfig'

import 'firebaseui/dist/firebaseui.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  created() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config)

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$router.push('/')
        } else {
          this.$router.push('/auth')
        }
      })
    }
  },
  template: '<App/>',
  router,
  store
})
