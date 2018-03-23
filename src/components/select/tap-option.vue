<template lang="html">
  <div class="tap-option">
    <div class="tap-option-range" ref='selectRange'>

    </div>

    <div class="tap-option-optionBox"
      @touchstart='start'
      @touchmove='move'
      @touchend='end'
      ref='box'>
      <slot></slot>
    </div>

    <div class="tap-option-comfirm">
      确定
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
    offsetTop: Number
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
      this.setRangeTop();
      // this.$nextTick(()=> {
      //   this.test();
      // })

  },
  methods: {
    test() {
      let box = document.querySelector('.tap-option-optionBox');
      console.log(box);
      // box.addEventListener('touchstart', function() {alert('zhixla')})
      let event = new Event('touchstart2');
      event.initEvent('touchstart', true, true);
      this.$refs.box.dispatchEvent(event);
    },
    setRangeTop() {
      //这里非常重要， select展开后的选择范围，要和父容器的select位置一直。这里根据select的offsetTop去设置决定定位的top值
      this.$refs.selectRange.style.top = this.offsetTop + 'px';
    },
    start(ev) {
      console.log(ev);
      // ev.preventDefault();
      this.touchstart = ev.touches[0];
      // console.log(this.touchstart)
    },
    move(ev) {
      console.log(ev);
      ev.preventDefault();

      this.touchmove = ev.touches[0];
      let distance = this.touchmove.pageY - this.touchstart.pageY;

      this.$refs.box.setAttribute('style', `transform:translateY(${distance}px)`)
      // console.log(ev)
    },
    end(ev) {
      ev.preventDefault();
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
      z-index: 10;

      @descendent range{
        border-top: 1px solid $color-divider;
        border-bottom: 1px solid $color-divider;
        height: 40px;
        width: 100%;
        position: absolute;
        z-index: -1;
      }
      @descendent optionBox {
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
