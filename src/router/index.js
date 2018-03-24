import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '@/components/Auth'
import UserTable from '@/components/UserTable'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: UserTable },
  { path: '/auth', component: Auth }
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  routes
})
