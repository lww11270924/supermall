<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed"/>
    <scroll class="home-content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <RecommendView :recommends="recommend" />
      <Feature/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"
                   />
      <goods-list :goods="showGoods"/>
    </scroll>
<!--    组件不能直接监听点击事件，需要通过native修饰符：@click.native-->
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>

</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import Feature from "./childComps/Feature";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/tabControl";
import GoodsList from "components/content/goods/GoodsList";

import {getHomrMultidata,getHomeGoods} from "network/home";

import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
import {deboundce} from "common/utils";

export default {
  name: "Home",
  components:{
    HomeSwiper,
    RecommendView,
    Feature,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return{
      banners:[],
      recommend:[],
      goods:{//流行，新款，精选
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShow:false,
      tabOffsetTop :0,
      isTabFixed:false
    }
  },

  created() {
    //1、请求多个数据
    this.getHomrMultidata();

    //2、请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {
    //1、图片加载完成的事件监听
    const refresh = deboundce(this.$refs.scroll.refresh,200)
    // 监听item中图片加载完成
    this.$bus.$on('itemImageLoad',() => {
      refresh();
    })
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
    //事件监听
    tabClick(index){
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500);
    },
    contentScroll(position){
      //1、判断back是否显示
      this.isShow = -position.y > 1000

      //2、决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = -position.y>this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)

      // this.$refs.scroll.scroll.refresh()
    },
    swiperImageLoad(){
      //2、获取tabControl的offsetTop
      //所有的组件都有一个属性$el:用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    // 网络请求
    getHomrMultidata() {
      //1请求多个数据
      getHomrMultidata().then(res => {
        this.banners = res.data.data.banner.list;
        this.recommend = res.data.data.recommend.list;
      })
    },
    getHomeGoods(type){
      //2、请求商品信息
      const page = this.goods[type].page+1;
      getHomeGoods(type,page).then(res => {
        //将一个数组push到另一个数组里
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      })
    }
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: white;

  /*在使用浏览器原生滚动，为了让导航栏不一起滚动*/
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}

.home-content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control{
  position: relative;
  z-index: 99;
 }
</style>
