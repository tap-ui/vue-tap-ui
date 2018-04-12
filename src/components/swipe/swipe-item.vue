<template >
  <div class="tap-swipe-item" >
    <slot />
  </div>
</template>

<script>
export default {
  name: "tap-swipe-item",
  data() {
    return {
      offset: 0
    };
  },

  computed: {
    // style() {
    //   return {
    //     width: this.$parent.width + 'px',
    //     // transform: `translate(${this.offset}px, 0)`
    //   };
    // }
  }
};
</script>

<style lang="css">
.tap-swipe-item {
    width: 100%;
    float: left;
    height: 100%;
  }
</style>
