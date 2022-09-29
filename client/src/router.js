import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SearchResult from './views/SearchResult.vue'
import StoreView from './views/StoreView.vue'

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
      component: SearchResult
    },
    {
      path: '/StoreView/:id',
      name: 'StoreView',
      component: StoreView
    }
  ]
})
