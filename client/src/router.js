import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Stores from './views/Stores.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/stores',
      name: 'stores',
      component: Stores
    },
    {
      path: '/stores/:name',
      name: 'stores',
      component: Stores
    }
  ]
})
