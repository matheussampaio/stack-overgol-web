<template>
  <div id="app">
    <UserTable :users="users"/>
  </div>
</template>

<script>
import firebase from 'firebase'
import UserTable from './components/UserTable'

export default {
  name: 'App',
  components: {
    UserTable
  },
  data() {
    return {
      users: []
    }
  },
  mounted() {
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

    const db = firebase.database()

    db.ref().child('/users').once('value').then((s) => {
      const users = Object.values(s.val()).sort((a, b) => {
        if (a.first_name < b.first_name) {
          return -1
        }

        if (a.first_name > b.first_name) {
          return 1
        }

        if (a.last_name < b.last_name) {
          return -1
        }

        if (a.last_name > b.last_name) {
          return 1
        }

        return 0
      })

      this.users = users
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
