<template lang="html">
  <div class="tap-option">
    <!-- 选择范围 -->
    <div class="tap-option-range" ref='selectRange'></div>
    <!-- 选项列表容器 -->
    <div class="tap-option-optionBox"
      :class="'tap-option-optionBox--'+align"

      ref='box'>
      <slot></slot>
    </div>
    <!-- 长列表才会显示的确认按钮 -->
    <div class="tap-option-comfirm" @touchstart='onComfirm' v-if='isBtnVis'>
      确定
    </div>
  </div>
</template>

<script>
import Select from './Select.js';
export default {
  data() {
    return {
      offsetTop: -1,
      isBtnVis: false
    }
  },
  props: {
    oSelect: {},
    selectBoxTop: Number, //父组件的offsetTop
    align: {
      default: 'left'
    },
    stayNumber: { //option数量，作为长列表的阈值
      default: 8,
      type: Number
    }
  },
  mounted() {
    this.setRangeTop();
    this.btnVis()
  },
  methods: {
    btnVis() {
      this.$nextTick(() => {
        let optionNumber = this.oSelect.getOptionNumber();
        this.isBtnVis = optionNumber >= this.stayNumber - 1;
      })
    },
    setRangeTop() {
      //这里非常重要， 列表展开后的选择范围，要和父容器的select位置一致。这里根据select的offsetTop决定范围框绝对定位的top值
      this.$nextTick(() => {
        this.offsetTop == -1 ?
          this.$refs.selectRange.style.top = this.selectBoxTop + 'px' :
          this.$refs.selectRange.style.top = this.offsetTop + 'px';
        this.offsetTop = this.oSelect.selectBoxTop;
      })
    },
    //点击确定按钮的处理
    onComfirm() {
      this.$emit('onComfirm')
    }
  }
}
</script>

<style scoped>
@import '../../common/style/variable.css';

@component-namespace tap {
  @component option {
    position: absolute 0 0 0 0;
    background-color: $color-white;
    z-index: 99999;
    border: 1px solid red;
    @descendent range {
      border-top: 1px solid $color-divider;
      border-bottom: 1px solid $color-divider;
      height: $height-select;
      width: 100%;
      position: absolute;
      z-index: -1;
      box-sizing: border-box;
    }

    @descendent align {}

    @descendent optionBox {
      & option {
        display: block;
        height: $height-select;
        line-height: $height-select;
        text-align: left;
        box-sizing: border-box;
      }
      @modifier highLight {
        transition: all .3s;
        font-size: 18px;
        color: $color-primary;
      }
      @modifier left {
        padding: 0 10px 0 30px;
      }

      @modifier center {
        & option {
          text-align: center;
        }
      }
    }
    @descendent comfirm {
      height: $height-select;
      line-height: $height-select;
      position: fixed * * 0 0;
      width: 100%;
      border-top: 1px solid $color-border;
      background-color: $color-background;
      &:active {
        color: red;
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.22) inset;
      }
    }

  }
}
</style>
