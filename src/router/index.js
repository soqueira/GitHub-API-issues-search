import Vue from 'vue'
import Router from 'vue-router'
import gitHubIssues from '@/components/gitHubIssues'
import gitHubIssue from '@/components/gitHubIssue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'gitHubIssues',
      component: gitHubIssues
    },
    {
      path: '/:name/:repo/:issue',
      name: 'gitHubIssue',
      component: gitHubIssue,
    }
  ]
})
