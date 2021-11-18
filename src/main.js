import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";

import {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

Vue.prototype.$message = Message;

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

//解决移动端延迟300ms
FastClick.attach(document.body);

//使用懒加载插件
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


