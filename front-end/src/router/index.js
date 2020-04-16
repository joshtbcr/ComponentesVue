import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Cajero from '../components/Cajero.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cajero',
    name: 'Cajero',
    component: Cajero
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
