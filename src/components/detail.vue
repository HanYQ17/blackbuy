<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box"></div>
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <!-- 计数器 -->
                        <el-input-number
                          v-model="num"
                          @change="handleChange"
                          :min="1"
                          :max="goodsinfo.stock_quantity"
                          label="描述文字"
                        ></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <div
                id="tabHead"
                class="tab-head"
                style="position: static; top: 517px; width: 925px;"
              >
                <ul>
                  <li>
                    <a @click="index=1" href="javascript:;" :class="{selected:index==1}">商品介绍</a>
                  </li>
                  <li>
                    <a @click="index=2" href="javascript:;" :class="{selected:index==2}">商品评论</a>
                  </li>
                </ul>
              </div>
              <div
                class="tab-content entry"
                v-show="index==1"
                style="display: block;"
                v-html="goodsinfo.content"
              ></div>
              <div class="tab-content" v-show="index==2" style="display: block;">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          data-type="*10-1000"
                          nullmsg="请填写评论内容！"
                          v-model.trim="comment"
                          @keyup.enter="postComment"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          value="提交评论"
                          class="submit"
                          @click="postComment"
                        >
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <li v-for="(item, index) in commentList" :key="index">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.add_time | commentTime}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <!-- 分页组件 -->
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalcount"
                      ></el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="(item, index) in hotgoodslist" :key="index">
                    <div class="img-box">
                      <a href="#/site/goodsinfo/90" class>
                        <img :src="item.img_url">
                      </a>
                    </div>
                    <div class="txt-box">
                      <a href="#/site/goodsinfo/90" class>{{item.title}}</a>
                      <span>{{item.add_time | formatTime}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; //导入axios请求
import moment from "moment"; //导入时间格式
export default {
  name: "detail",
  data() {
    return {
      goodsinfo: [], //详情数据
      hotgoodslist: [], //右边的推荐商品
      imglist: [], //左边的商品图片
      num: 1, //计数器
      comment: "", //评论内容
      index: 1, //商品详情和评论切换
      pageIndex: 1, //页码,当前页
      pageSize: 5, //页容量
      totalcount: 0, //总条数
      commentList: [] //评论数据
    };
  },
  methods: {
    //计数器
    handleChange(value) {
      console.log(value);
    },
    // 发表评论
    postComment() {
      if (this.comment === "") {
        this.$message.error("请输入内容"); //使用element的消息提示框
      } else {
        axios
          .post(
            `http://111.230.232.110:8899/site/validate/comment/post/goods/${
              this.$route.params.id
            }`,
            { commenttxt: this.comment }
          )
          .then(res => {
            // console.log(res);
            if (res.data.status === 0) {
              this.$message({ message: res.data.message, type: "success" });  //提示提交成功
              this.comment = "";   //清空
              this.pageIndex = 1;  //评论完后返回第一页
              this.getComments()   //重新渲染
            } else {
              this.$message.error(res.data.message);  //提示提交失败
            }
          });
      }
    },
    //获取详情数据
    getDetail() {
      axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${
            this.$route.params.id
          }`
        )
        .then(res => {
          // console.log(res);
          this.goodsinfo = res.data.message.goodsinfo;
          this.hotgoodslist = res.data.message.hotgoodslist;
          this.imglist = res.data.message.imglist;
        });
    },
    // 评论分页
    getComments() {
      axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.$route.params.id
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(res => {
          console.log(res);
          this.totalcount = res.data.totalcount;
          this.commentList = res.data.message;
        });
    },
    // 页容量改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.getComments()   //重新渲染
    },
    // 页码改变
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getComments()  //重新渲染
    }
  },

  created() {
    this.getDetail(); //获取详情数据
    this.getComments(); // 评论分页
  },

  // 过滤器
  filters: {
    formatTime(value) {
      return moment().format("YYYY年MM月HH日");
    },
    commentTime(value) {
      return moment().format("YYYY年MM月HH日 h:mm:ss");
    }
  }
};
</script>

<style>
.tab-content img {
  display: block;
}
</style>
