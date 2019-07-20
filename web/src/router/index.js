import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

import detail from '@/components/detail'
import step from '@/components/step'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{
        keepAlive:true
      }
    },

    {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/step',
      name: 'step',
      component: step,
      meta:{
        keepAlive:true
      }
    },
  ]
})
