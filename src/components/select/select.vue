<template lang="html">
  <div class="tap-select" @touchstart='onTouchStatr'>
    <input type="hidden" name="" value="">
    <tap-option v-if='vis' :offsetTop='offsetTop'><slot></slot></tap-option>
  </div>
</template>

<script>
import tapOption from './tap-option.vue'
  export default {
    name: 'tap-select',
    components: {tapOption},
    data() {
      return {
        offsetTop : {},
        vis: false
      }
    },
    methods:{
      onTouchStatr(ev){
        this.vis = true;
        // this.rect = ev.target.getBoundingClientRect();
        this.offsetTop = ev.target.offsetTop;
        console.log(this.offsetTop);
      }
    }
  }
</script>

<style lang="css">
  @import '../../common/style/variable.css';

  @component-namespace tap{
    @component select {
      border: 1px solid $color-border;
      height: 40px;
      overflow: hidden;
    }
  }
</style>
