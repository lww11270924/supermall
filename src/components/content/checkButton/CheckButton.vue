<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props:{
    isChecked:{
      type:Boolean,
      detail:false
    }
  }
}
</script>

<style scoped>
  .check-button{
    border-radius: 50%;
    border: 1px solid #999999;
  }
  .check{
    border-color: var(--color-tint);
    background-color: var(--color-tint);
  }
</style>
