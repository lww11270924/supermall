<template>
  <div id="category">
    <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"></tab-menu>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabMenu from "./childComps/TabMenu";
import {getCategory, getSubcategory, getCategoryDetail} from "network/category";

  export default {
    name: "Category",
    components:{
      NavBar,
      TabMenu
    },
    data(){
      return{
        categories:[],
        currentIndex: -1
      }
    },
    created() {
      // 1.请求分类数据
      this._getCategory()
    },
    methods:{
      _getCategory() {
        getCategory().then(res => {
          debugger
          // 1.获取分类数据
          this.categories = res.data.data.category.list;
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },
      _getCategoryDetail(type) {
        // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(res => {
          // 3.将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(){
        this._getSubcategories(index)
      }
    }
  }
</script>

<style scoped>
#category {
  height: 100vh;
}
.category-nav{
  background-color: var(--color-tint);
  color: white;

  /*在使用浏览器原生滚动，为了让导航栏不一起滚动*/
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}
</style>
