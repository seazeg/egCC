import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const home = resolve => require(['@/view/LandingPage'], resolve);
const button = resolve => require(['../view/Controls/button.vue'], resolve);
const input = resolve => require(['../view/Controls/input.vue'], resolve);
const radio = resolve => require(['../view/Controls/radio.vue'], resolve);
const checkbox = resolve => require(['../view/Controls/checkbox.vue'], resolve);
const select = resolve => require(['../view/Controls/select.vue'], resolve);


const compressIMG = resolve => require(['../view/compressIMG.vue'], resolve);
const compressJS = resolve => require(['../view/compressJS.vue'], resolve);

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home
  }, {
    path: '/button',
    name: 'button',
    component: button
  }, {
    path: '/input',
    name: 'input',
    component: input
  }, {
    path: '/radio',
    name: 'radio',
    component: radio
  }, {
    path: '/checkbox',
    name: 'checkbox',
    component: checkbox
  }, , {
    path: '/select',
    name: 'select',
    component: select
  }, {
    path: '/compressIMG',
    name: 'compressIMG',
    component: compressIMG
  }, {
    path: '/compressJS',
    name: 'compressJS',
    component: compressJS
  }, {
    path: '*',
    redirect: '/'
  }]
})