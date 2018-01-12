import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: function (resolve) {
        require(['@/components/home.vue'], resolve)
      }
    },
    {
      path: '/auths',
      name: 'Auths',
      component: function (resolve) {
        require(['@/components/auths.vue'], resolve)
      }
    },
    {
      path: '/projects',
      name: 'Projects',
      component: function (resolve) {
        require(['@/components/projects.vue'], resolve)
      }
    },
    {
      path: '/authCommitLog',
      name: 'AuthCommitLog',
      component: function (resolve) {
        require(['@/components/authcommitlog.vue'], resolve)
      }
    }
  ]
})
