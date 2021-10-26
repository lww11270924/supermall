<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <Scroll class="home-content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners" />
      <RecommendView :recommends="recommend" />
      <Feature/>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" class="tab-control" />
      <goods-list :goods="showGoods"/>
    </Scroll>
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
      isShow:false
    }
  },
  created() {
    this.getHomrMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
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
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500);
    },
    contentScroll(position){
      this.isShow = -position.y > 1000

    },
    loadMore(){
      console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)

      // this.$refs.scroll.scroll.refresh()
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
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}

.tab-control{
  position: sticky;
  top:44px;
  z-index: 5;
}

.home-content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
