import Vue from 'vue'
import VueRouter from 'vue-router'
import UserTable from '@/components/UserTable'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: UserTable }
]

export default new VueRouter({
  mode: 'history',
  routes
})
