<template lang="html">
  <div class="tap-option">
    <div class="tap-option-title" v-if='title'>
      {{title}}
    </div>
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
      viewportTop: -1,
      isBtnVis: false
    }
  },
  props: {
    title: String,
    oSelect: {},
    selectBoxTop: Number, //父组件的相对于viewport的位置
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
      this.$nextTick(() => {
        this.viewportTop == -1 ?
          this.$refs.selectRange.style.top = this.selectBoxTop + 'px' :
          this.$refs.selectRange.style.top = this.viewportTop + 'px';
        this.viewportTop = this.oSelect.selectBoxTop;
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
    position: fixed 0 0 0 0;
    background-color: $color-white;
    z-index: 99999;
    @descendent title {
      display: flex;
      position: fixed 0 0 * *;
      width: 100%;
      z-index: 100;
      justify-content: center;
      background: #eee;
      box-shadow: 0 15px 10px -12px rgba(0, 0, 0, .22), 0 -15px 10px -10px rgba(0, 0, 0, .22);
      border-bottom: 1px solid rgba(0, 0, 0, .12);
      height: 40px;
      line-height: 40px;
      color: $color-title;
    }

    @descendent range {
      border-top: 1px solid $color-divider;
      border-bottom: 1px solid $color-divider;
      box-shadow: 0px 0px 3px $color-border;
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
      text-align: center;
      &:active {
        color: red;
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.22) inset;
      }
    }

  }
}
</style>
