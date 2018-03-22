import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const home = resolve => require(['@/view/LandingPage'], resolve);
const work = resolve => require(['../view/work.vue'], resolve);


export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }, {
      path: '/work',
      name: 'work',
      component: work
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})