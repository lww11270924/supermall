<template>
  <div class="bottom-menu">
    <CheckButton
      class="select-all"
      :is-checked="isSelectAll"
      @click.native="checkClick"/>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{totalNum}})</span>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import {mapGetters} from 'vuex';

export default {
  name: "CartBottomBar",
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return this.cartList.filter(item => {
        return item.checked;
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count;
      },0)
    },
    totalNum(){
      return this.cartList.filter(item =>  item.checked).length;
    },
    isSelectAll(){
      //find是查到到有一个符合的就会终止查找，而filter是会等全部查找完，性能上find好
      if(this.cartList.length === 0) return false;
      return !(this.cartList.find(item => !item.checked));
    }
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){//全部选中
        this.cartList.forEach(item => item.checked = false)
      }else{//全部不选中或者有部分不选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$message('请先选择商品！');
      }
    }
  }
}
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 15px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>

<style>
.el-message {
  margin-top: 40%;
  min-width: 54%;
  border-width: 0px;
  background-color: var(--color-tint);

}
.el-message--info .el-message__content {
  color: #fff;
}
.el-message .el-icon-info {
  color: #fff;
}
</style>
