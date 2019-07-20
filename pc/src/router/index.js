import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import add from '@/components/Add'
import detail from '@/components/detail'
import update from '@/components/update'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    
    {
      path: '/add',
      name: 'add',
      component: add
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/update',
      name: 'update',
      component: update
    },
    
    
  ]
})
