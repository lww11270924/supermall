<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="detail-content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
<!--      属性用-代替驼峰，例如：topImage 应该变为：top-image-->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <!--    组件不能直接监听点击事件，需要通过native修饰符：@click.native-->
    <back-top @click.native="backClick" v-show="isShow"/>
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
import DetailBottomBar from "./childComps/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
import {deboundce} from "common/utils";
import {backTopmixin} from "common/mixin";


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
    DetailBottomBar,
    Scroll
  },
  mixins:[backTopmixin],
  data(){
    return{
      iid:null,
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0
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

      //7、给getThemeTopY赋值(对给themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = deboundce(() => {
        console.log('试试会不会调用多次');
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
      },100)
      // this.$nextTick(() => {
        //根据最新的数据，DOM已经渲染出来
        //但是图片没有渲染出来，所以这个获取offsetTop还是不适合
        // this.themeTopYs = [];
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // })
    });

    //3、请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.data.list;
    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index){
      // console.log('标题点击：'+index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position){
      //1获取y值
      const positionY = -position.y;

      //2对比
      let len = this.themeTopYs.length;
      for(let i = 0; i<len-1;i++){
        if(this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
        }
        // if(this.currentIndex !== i && ((i<len-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) || (i === len-1 && positionY >= this.themeTopYs[i]))){
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }

        //3判断back是否显示
        this.isShow = -position.y > 1000

        //4决定tabControl是否吸顶（position:fixed）
        this.isTabFixed = -position.y>this.tabOffsetTop
      }
    },
    addToCart(){
      //1获取商品信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2将商品添加到购物车
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product)

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
  bottom: 49px;
}

</style>
