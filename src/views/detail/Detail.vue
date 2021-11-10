<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="detail-content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";


export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll
  },
  data(){
    return{
      iid:null,
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[]
    }
  },
  created() {
    //1、保存传入的iid
    this.iid = this.$route.params.iid;

    //2、根据iid请求数据
    getDetail(this.iid).then(res => {
      // 获取结果
      const data = res.data.result;
      // console.log(data);
      //1、获取顶部轮播数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      //3. 创建店铺信息
      this.shop = new Shop(data.shopInfo);

      //4、获取商品详情信息
      this.detailInfo = data.detailInfo;

      //5、获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);

      //6、取出评论信息
      if(data.rate.cRate != 0){
        this.commentInfo = data.rate.list[0];
      }
    });

    //3、请求推荐数据
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.data.list;
    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh();
    }
  }
}
</script>

<style scoped>
#detail{
  height: 100vh;
  position: relative;
  z-index: 16;
  background-color: #fff;
}

.detail-nav{
  position: relative;
  z-index: 16;
  background-color: #ffffff;
}
.detail-content{
  position: absolute;
  top: 44px;
  bottom: 60px;
}

</style>
