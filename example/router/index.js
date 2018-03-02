import Vue from 'vue'
import Router from 'vue-router'
import button from '../components/Button/button.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'container',
      component: () => import('../components/Container.vue'),
    },
    {
      path: '/button',
      component: button
    }

  ]
})
