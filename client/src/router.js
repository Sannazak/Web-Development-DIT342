import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Stores from './views/SearchResult.vue'

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
      path: '/searchResult',
      name: 'searchResult',
      component: Stores
    },
    {
      path: '/searchResult/:name',
      name: 'searchResult',
      component: Stores
    }
  ]
})
