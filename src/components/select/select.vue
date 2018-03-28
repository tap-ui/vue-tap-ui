<template lang="html">
  <div class="tap-select" @touchstart='onTouchStart' @touchmove='onTouchMove'>
    <input type="hidden" :name='name' v-model="model">
    <div class="">
      {{model}}
    </div>
    <i class="iconfont icon-ICON-"></i>
    <tap-option v-if='vis'
                :startEv='startEv'
                :moveEv='moveEv'
                :selectBoxTop='selectBoxTop'
                :valueChange='valueChange'>
        <slot></slot>
    </tap-option>
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
        model: this.value,
        startEv: {},
        moveEv: {},
        selectBoxTop: 0,
        vis: false,
      }
    },
    props:{
      name: String,
      value: {
        type:[String, Number, Array]
      }
    },
    watch: {
      model: function() {
        this.$emit('input', this.model)
      }
    },
    mounted() {
      this.model = '12'
    },
    methods:{
      valueChange(ev) {

      },
      onTouchStart(ev){
        ev.preventDefault();
        this.vis = true;
        this.startEv = ev;
        this.selectBoxTop = ev.target.offsetTop;
      },
      onTouchMove(ev) {
        ev.preventDefault();
        this.moveEv = ev;
        let {pageX, pageY} = ev.touches[0]
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
      /* border: 1px solid $color-border; */
      height: 35px;
      box-sizing: content-box;
      padding: 0 10px 0 20px;
      overflow: hidden;
      box-shadow:2px 2px 5px $color-border;
    }
  }
</style>
