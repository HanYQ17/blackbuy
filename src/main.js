import Vue from 'vue'  //导入Vue
import App from './App.vue' //导入App.vue

import ElementUI from 'element-ui';  //导入轮播图Element
import 'element-ui/lib/theme-chalk/index.css';  ////导入轮播图的样式
Vue.use(ElementUI);

import './assets/statics/site/css/style.css'  //导入全局样式


import router from './router.js'  //导入抽取的路由

Vue.config.productionTip = false


//设置axios到原型上,方便共享
import axios from 'axios' 
Vue.prototype.$axios = axios;

//设置axios的基地址
axios.defaults.baseURL = 'http://111.230.232.110:8899'


// 定义全局过滤器
import moment from "moment"
Vue.filter('formatTime', (value)=>{
  return moment(value).format("YYYY年MM月HH日");
})





// 顶级Vue实例
new Vue({
  render: h => h(App),
  router   //挂到顶级Vue实例上
  
}).$mount('#app')
