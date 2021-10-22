<template>
  <div ref="wrapper">
    <div class="content">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
import BetterScroll  from "better-scroll";

export default {
  name: "Scroll",
  data(){
    return{
      scroll:null
    }
  },
  mounted() {
    this.scroll = new BetterScroll (this.$refs.wrapper,{
      // movable: true
    })
  }
}
</script>

<style scoped>

</style>
