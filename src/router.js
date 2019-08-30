import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

const List = () => import('./views/List.vue')
const Car = () => import('./views/Car.vue')
const Order = () => import('./views/Order.vue')
const Restaurant = () => import('./views/Restaurant.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/car',
      name: 'car',
      component: Car
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/restaurant',
      name: 'restaurant',
      component: Restaurant
    }
  ]
})
