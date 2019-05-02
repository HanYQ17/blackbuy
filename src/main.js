import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';  //导入轮播图Element
import 'element-ui/lib/theme-chalk/index.css';  ////导入轮播图的样式
Vue.use(ElementUI);

import './assets/statics/site/css/style.css'  //导入全局样式

import VueRouter from 'vue-router'  //导入路由

//导入组件
import index from './components/index.vue'  //首页
import detail from './components/detail.vue'  //详情


Vue.use(VueRouter)
const routes =[   //写路由规则
  {path:'/index',component:index},  //首页
  {path:'/detail/:id',component:detail},  //详情 携带id
]   
const router = new VueRouter({  //实例化路由对象
  routes
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router   //挂到顶级Vue实例上
}).$mount('#app')
