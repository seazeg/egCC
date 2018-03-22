//组件全局注册
import Vue from 'vue'
import header from './layout-header.vue'
import sidetools from './layout-sidetools.vue'
import workarea from './layout-workarea.vue'

Vue.component(header.name, header);
Vue.component(sidetools.name, sidetools);
Vue.component(workarea.name, workarea);