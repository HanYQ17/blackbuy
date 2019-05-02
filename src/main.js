import Vue from 'vue'  //导入Vue
import App from './App.vue' //导入App.vue

import ElementUI from 'element-ui';  //导入轮播图Element
import 'element-ui/lib/theme-chalk/index.css';  ////导入轮播图的样式
Vue.use(ElementUI);

import './assets/statics/site/css/style.css'  //导入全局样式


import router from './router.js'  //导入抽取的路由

Vue.config.productionTip = false


// 顶级Vue实例
new Vue({
  render: h => h(App),
  router   //挂到顶级Vue实例上
}).$mount('#app')
