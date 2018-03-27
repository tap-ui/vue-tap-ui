<template lang="html">
  <div class="tap-option">
    <div class="tap-option-range" ref='selectRange'></div>

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
import Select from './Select.js';
export default {
  data()  {
    return{
      // _selectStartTouch:{}
      offsetTop: -1,
      oSelect : null
    }
  },
  props: {
    startEv: {},  //父组件的touchstart的event对象
    moveEv: {}, //父组件的touchmove的event对象
    selectBoxTop: Number //父组件的offsetTop
  },
  computed: {

  },
  watch: {
    startEv(ev) {

    },
    moveEv(ev) {
      this.oSelect.boxMove(ev)
        // let distance = this.startEv.touches[0].pageY - this.moveEv.touches[0].pageY;
        // this.moveOptionBox(distance);
    }
  },
  created() {

  },
  mounted() {
    // console.log(Select);

      // this.oSelect.boxMove
      this.$nextTick(()=> {
          this.oSelect = new Select(this.$refs.box, this.startEv, this.moveEv, this.selectBoxTop);
          this.setRangeTop()
      })

  },
  methods: {
    test() {
      let box = document.querySelector('.tap-option-optionBox');

      let event = new Event('touchmove');
      event.initEvent('touchmove', true, true);
      this.$refs.box.dispatchEvent(event);
    },
    // moveOptionBox(distance) {
    //   this.$refs.box.setAttribute('style', `transform:translateY(${-distance}px)`)
    // },
    setRangeTop(top) {
      //这里非常重要， 列表展开后的选择范围，要和父容器的select位置一直。这里根据select的offsetTop决定范围框绝对定位的top值
      this.offsetTop == -1 ?
          this.$refs.selectRange.style.top = this.selectBoxTop + 'px':
          this.$refs.selectRange.style.top = this.offsetTop + 'px';

      this.offsetTop = this.selectBoxTop;
    },
    start(ev) {
      this.touchstart = ev.touches[0];
    },
    move(ev) {
      // ev.preventDefault();
      // this.touchmove = ev.touches[0];
      // let distance = this.touchmove.pageY - this.touchstart.pageY;
      //
      // this.$refs.box.setAttribute('style', `transform:translateY(${distance}px)`)
    },
    end(ev) {
      ev.preventDefault();
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
        height: 35px;
        width: 100%;
        position: absolute;
        z-index: -1;
        box-sizing: content-box;
      }

      @descendent optionBox {
        & option {
          display: block;
          color: red;
          height: 35px;
          text-align: left;
           padding: 0 10px 0 20px;


        }
      }
      @descendent comfirm{
        height: 35px;
        line-height: 35px;
        position: fixed * * 0 0;
        width: 100%;
        border-top: 1px solid $color-border;
        background-color: $color-background;
      }
    }
  }


</style>
