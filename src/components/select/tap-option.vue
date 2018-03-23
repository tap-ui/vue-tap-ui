<template lang="html">
  <div class="tap-option">
    <div class="tap-option-selectd" ref='selectColumn'>

    </div>

    <div class="tap-option-selectBox"
      @touchstart='start'
      @touchmove='move'
      @touchend='end'
      ref='box'>
      <slot></slot>
    </div>

    <div class="tap-option-comfirm">
      确定{{rect}}
    </div>
  </div>
</template>

<script>
export default {
  data()  {
    return{

    }
  },
  props: {
    rect: {}
  },
  computed: {
    // setRect: function() {
    //   return this.rect
    // }
  },
  watch: {

  },
  mounted() {
      this.touchstart = {};
      this.touchmove = {};
      console.log(this.rect);
      this.setColumnRect();
  },
  methods: {
    setColumnRect() {
      this.$refs.selectColumn.offsetHeight = this.rect.top + 'px';
    },
    start(ev) {
      this.touchstart = ev.touches[0];
      console.log(this.touchstart)
    },
    move(ev) {
      this.touchmove = ev.touches[0];
      let distance = this.touchmove.pageY - this.touchstart.pageY;
      this.$refs.box.setAttribute('style', `transform:translateY(${distance}px)`)
      console.log(ev)
    },
    end(ev) {
      console.log('结束');
      console.log(ev);
    }
  }
}
</script>

<style >
  @import '../../common/style/variable.css';

  @component-namespace tap {
    @component option{
      position: absolute 0 0 0 0;
      background-color: $color-white;
      z-index: 100;
      @descendent selectd{
        border-top: 1px solid $color-divider;
        border-bottom: 1px solid $color-divider;
        height: 40px;
        width: 100%;
        position: absolute;
      }
      @descendent selectBox {
        /* background-color: #eee; */
          /* transform: translateY(-10px); */
      }
      @descendent comfirm{
        height: 40px;
        line-height: 40px;
        position: fixed * * 0 0;
        width: 100%;
        border-top: 1px solid $color-border;
        background-color: $color-background;
      }
    }
  }

  .tap-option{
    option{
       margin: 20px;
    }
  }
</style>
