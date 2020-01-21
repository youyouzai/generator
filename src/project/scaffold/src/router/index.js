import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Main from '@/views/main/index.vue'

export default new Router({
  routes: [
    {
      name: 'main',
      path: '/main',
      component: Main
    }
  ]
})
