import Vue from 'vue'
import Router from 'vue-router'
import HelloFromVux from '@/components/HelloFromVux'
import Auths from '@/components/auths'
import AuthCommitLog from '@/components/authcommitlog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloFromVux',
      component: HelloFromVux
    },
    {
      path: '/auths',
      name: 'Auths',
      component: Auths
    },
    {
      path: '/authCommitLog',
      name: 'AuthCommitLog',
      component: AuthCommitLog
    }
  ]
})
