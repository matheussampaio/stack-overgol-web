import Vue from 'vue'
import Vuex from 'vuex'

import Firebase from '@/services/Firebase'

Vue.use(Vuex)

const store = {
  state: {
    users: []
  },

  actions: {
    watchUsers(context) {
      Firebase.onUserChanges((users) => {
        context.commit('setUsers', users)
      })
    },
    updateUser(context, update) {
      Firebase.queueUserUpdate(update)
    }
  },

  mutations: {
    setUsers(state, users) {
      state.users = users
    }
  },

  getters: {

  }
}

export default new Vuex.Store(store)
