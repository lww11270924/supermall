<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <HomeSwiper :banners="banners" />
    <RecommendView :recommends="recommend" />
    <Feature/>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" class="tab-control" />
    <goods-list :goods="showGoods"/>
    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li><li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>

    </ul>


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

export default {
  name: "Home",
  components:{
    HomeSwiper,
    RecommendView,
    Feature,
    NavBar,
    TabControl,
    GoodsList
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
      currentType:'pop'
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
      })
    }
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
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
</style>
