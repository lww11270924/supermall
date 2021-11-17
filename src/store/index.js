import Vue from "vue";
import Vuex from 'vuex'
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

//1安装插件
Vue.use(Vuex)

//2创建store对象
const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations,
  actions,
  getters
})
//3挂载到Vue实例上
export default store
