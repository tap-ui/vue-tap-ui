<template lang="html">
  <div class="tap-select" @touchstart='onTouchStatr' @touchmove='ontouchMove'>
    <input type="hidden" name="" value="xx">
    <div class="">
      这是内容
    </div>
    <i class="iconfont icon-ICON-"></i>
    <tap-option v-if='vis' :selectStartTouch='selectStartTouch' :selectMoveTouch='selectMoveTouch' ><slot></slot></tap-option>
  </div>
</template>

<script>
import tapOption from './tap-option.vue'
  export default {
    name: 'tap-select',
    components: {tapOption},
    data() {
      return {
        // offsetTop : {},
        selectStartTouch: {},
        selectMoveTouch: {},
        vis: false
      }
    },
    methods:{
      onTouchStatr(ev){
        ev.preventDefault();
        this.vis = true;

        this.selectStartTouch = {
            offsetTop: ev.target.offsetTop,
            pageX: ev.touches[0].pageX,
            pageY: ev.touches[0].pageY
        }

      },
      ontouchMove(ev) {
        ev.preventDefault();
        let {pageX, pageY} = ev.touches[0]
        this.selectMoveTouch = {
          pageX,
          pageY
        }
      }
    }
  }
</script>

<style lang="css">
  @import '../../common/style/variable.css';

  @component-namespace tap{
    @component select {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid $color-border;
      height: 35px;
      box-sizing: content-box;
      padding: 0 10px 0 20px;
      overflow: hidden;
      box-shadow:2px 2px 5px $color-border;
    }
  }
</style>
