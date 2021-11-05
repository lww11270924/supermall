<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper';
export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  data(){
    return{
      isLoad:false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
      //轮播图较大，监听轮播图加载完成就可以获取较准确的高度
      //因为轮播图会加载多次（有多张图片），只要加载一张图片就知道轮播图块对应的高度，所以通过变量求一次结果即可，不然会发送多次
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true;
      }
    }
  }
}
</script>

<style scoped>

</style>
