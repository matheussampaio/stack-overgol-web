import Vue from 'vue'
import Vuex from 'vuex'

import Firebase from '@/services/Firebase'

Vue.use(Vuex)

const store = {
  state: {
    isAdmin: false,
    loadings: {
      user: true,
      users: true
    },
    user: null,
    users: []
  },

  actions: {
    watchUsers(context) {
      context.commit('setLoadingUsers', true)

      Firebase.onUserChanges((users) => {
        context.commit('setLoadingUsers', false)
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
      context.commit('setLoadingUser', false)
    }
  },

  mutations: {
    setLoadingUsers(state, loading) {
      state.loadings.users = loading
    },
    setLoadingUser(state, loading) {
      state.loadings.user = loading
    },
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
