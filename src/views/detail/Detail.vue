<template>
  <div id="detail">
    <detail-nav-bar/>
<!--    <scroll>-->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
<!--    </scroll>-->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import {getDetail,Goods,Shop} from "network/detail";

import Scroll from "components/common/scroll/Scroll";
export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,

    Scroll
  },
  data(){
    return{
      iid:null,
      topImages:[],
      goods: {},
      shop:{}
    }
  },
  created() {
    //1、保存传入的iid
    this.iid = this.$route.params.iid;

    //2、根据iid请求数据
    getDetail(this.iid).then(res => {
      // 获取结果
      const data = res.data.result;
      console.log(data);
      //1、获取顶部轮播数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      //3. 创建店铺信息
      this.shop = new Shop(data.shopInfo);
    });
  }
}
</script>

<style scoped>

</style>
