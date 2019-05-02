import Vue from 'vue'  //导入Vue
import VueRouter from 'vue-router'  //导入路由


//导入组件
import index from './components/index.vue'  //首页
import detail from './components/detail.vue'  //详情
import userContainer from './components/userContainer.vue'  //个人中心
import userIndex from './components/userIndex.vue'  //个人中心.个人中心
import userDetail from './components/userDetail.vue'  //个人中心.查看订单
import userOrder from './components/userOrder.vue'  //个人中心.交易订单


Vue.use(VueRouter)


//写路由规则
const routes =[   
  {path:'/index',component:index},  //首页
  {path:'/detail/:id',component:detail},  //详情 携带id
  {path:'/userContainer',component:userContainer,children:[
    {path:'userIndex',component:userIndex}, //个人中心
    {path:'userDetail',component:userDetail}, //查看订单
    {path:'userOrder',component:userOrder}  //交易订单
  ]},  //个人中心
]   


//实例化路由对象
const router = new VueRouter({  
  routes
})

// 暴露出去
export default router;