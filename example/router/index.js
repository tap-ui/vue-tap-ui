import Vue from 'vue'
import Router from 'vue-router'

import config from './config'
Vue.use(Router)

let routers = [];
config.forEach((item)=> {
  routers.push({})
})
export default new Router({
  routes: [
    {
      path: '/',
      name: 'container',
      component: () => import('../components/Container.vue'),
    },
    {
      path: '/button',
      component: () => import('../components/Button/button.vue')
    }

  ]
})
