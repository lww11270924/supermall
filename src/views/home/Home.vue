<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <HomeSwiper :banners="banners" />
    <RecommendView :recommends="recommend" />
    <Feature/>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" />

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

import {getHomrMultidata,getHomeGoods} from "network/home";

export default {
  name: "Home",
  components:{
    HomeSwiper,
    RecommendView,
    Feature,
    NavBar,
    TabControl
  },
  data(){
    return{
      banners:[],
      recommend:[],
      goods:{//流行，新款，精选
        'pop':{page:0,list:[]},
        'news':{page:0,list:[]},
        'sell':{page:0,list:[]}
      }
    }
  },
  created() {
    this.getHomrMultidata();
    this.getHomeGoods();
  },
  methods:{
    getHomrMultidata() {
      //1请求多个数据
      getHomrMultidata().then(res => {
        this.banners = res.data.data.banner.list;
        this.recommend = res.data.data.recommend.list;
      })
    },
    getHomeGoods(){
      //2、请求商品信息
      getHomeGoods('pop',1).then(res => {

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
  top:44px
}
</style>
