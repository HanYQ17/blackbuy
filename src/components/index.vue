<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="#/" class="router-link-active">首页</a> &gt;
        <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <div class="left-220" style="margin: 0px;">
            <div class="banner-nav">
              <ul>
                <li v-for="(item, index) in catelist" :key="index">
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span>{{item.title}}</span>
                    <p>
                      <span
                        v-for="(it, i) in item.subcates"
                        :key="i"
                      >{{it.title}}&nbsp;</span>
                    </p>
                  </h3>
                  <div class="item-box">
                    <dl>
                      <dt>
                        <a href="/goods/40.html">手机数码</a>
                      </dt>
                      <dd>
                        <a href="/goods/43.html">手机通讯</a>
                        <a href="/goods/43.html">摄影摄像</a>
                        <a href="/goods/43.html">存储设备</a>
                      </dd>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--幻灯片-->
          <div class="left-705">
            <el-carousel height="341px">
              <el-carousel-item v-for="item in sliderlist" :key="item.id">
                <img class="slide_img" :src="item.img_url" alt>
              </el-carousel-item>
            </el-carousel>
          </div>
          <!--/幻灯片-->
          <div class="left-220">
            <ul class="side-img-list">
              <li v-for="(item, index) in toplist" :key="index">
                <div class="img-box">
                  <label>{{index+1}}</label>
                  <img :src="item.img_url">
                </div>
                <div class="txt-box">
                  <a href="/goods/show-98.html">{{item.title}}</a>
                  <span>{{item.add_time | formatTime}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="section" v-for="(item, index) in sectionList" :key="index">
      <div class="main-tit">
        <h2>{{item.catetitle}}</h2>
        <p>
          <a href="/goods/43.html">手机通讯</a>
          <a href="/goods/43.html">摄影摄像</a>
          <a href="/goods/40.html">
            更多
            <i>+</i>
          </a>
        </p>
      </div>
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">
            <li v-for="(it, i) in item.datas" :key="i">
              <!-- <a href="#/site/goodsinfo/87" class> -->
              <!-- <router-link :to="'/detail/'+it.artID"> -->
              <router-link :to="'/detail?id='+it.artID">
              <!-- <router-link :to="'/detail?id='+it.artID+'&name='+it.artID"> -->
                <div class="img-box">
                  <img
                    :src="it.img_url"
                  >
                </div>
                <div class="info">
                  <h3>{{it.artTitle}}</h3>
                  <p class="price">
                    <b>{{it.sell_price}}</b>元
                  </p>
                  <p>
                    <strong>库存 {{it.stock_quantity}}</strong>
                    <span>
                      市场价：
                      <s>{{it.market_price}}</s>
                    </span>
                  </p>
                </div>
                </router-link>
              <!-- </a> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios"; //导入请求axios
// import moment from "moment"; //导入时间格式moment
export default {
  name: "index",  //vue-chrome插件中,可以看到name属性,利于调试
  data() {
    return {
      catelist: [],
      sliderlist: [],
      toplist: [],
      sectionList:[]  //底部数据
    };
  },
  created() {
    this.$axios
      .get("/site/goods/gettopdata/goods")
      .then(res => {
        // console.log(res);
        this.catelist = res.data.message.catelist;
        this.sliderlist = res.data.message.sliderlist;
        this.toplist = res.data.message.toplist;
      });
    this.$axios   //获取底部数据
      .get("/site/goods/getgoodsgroup")
      .then(res => {
        // console.log(res);
        this.sectionList = res.data.message;
      });
  },
  // 过滤器
  // filters: {
  //   formatTime(value) {
  //     // return value.split('T')[0]
  //     return moment(value).format("YYYY年MM月HH日");
  //   }
  // }
};
</script>

<style>
.slide_img {
  width: 100%;
  height: 100%;
}
</style>
