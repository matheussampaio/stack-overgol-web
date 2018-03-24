import Vue from 'vue'
import Vuex from 'vuex'

import Firebase from '@/services/Firebase'

Vue.use(Vuex)

const store = {
  state: {
    isAdmin: false,
    user: null,
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
    },
    async onAuthStateChanged(context, user) {
      if (user) {
        Firebase.updateWebUser(user)
      }

      context.commit('setAdmin', user ? await Firebase.isAdmin(user) : false)
      context.commit('setAuthState', user)
    }
  },

  mutations: {
    setUsers(state, users) {
      state.users = users
    },
    setAuthState(state, user) {
      state.user = user
    },
    setAdmin(state, isAdmin) {
      state.isAdmin = isAdmin
    }
  },

  getters: {

  }
}

export default new Vuex.Store(store)
