<template lang="html">
  <div class="tap-select"
      @touchstart='onTouchStart'
      @touchmove='onTouchMove'
      @touchend='onTouchEnd'
      ref='selectInput'>

    <input type="hidden" :name='name' v-model="model">
    <div :class="'tap-select-align--'+align" v-if='model'>
      {{model.label}}
    </div>
    <i class="icon iconfont icon-ICON-"></i>
    <transition name="fade">
      <tap-option
        ref='optionsBox'
        :oSelect='oSelect'
        :selectBoxTop='selectBoxTop'
        @onComfirm='onComfirm'
        :align='align'
        :stayNumber='stayNumber'
        v-if='vis'>
            <slot></slot>
      </tap-option>
    </transition>

  </div>
</template>

<script>
import tapOption from './tap-option.vue'
import Select from './Select.js';
import {
  domFind
} from '../../common/js/dom'

export default {
  name: 'tap-select',
  components: {
    tapOption
  },
  data() {
    return {
      // offsetTop : {},
      model: this.value,
      selectBoxTop: 0,
      vis: false, //控制列表显示的变量
      oSelect: {}, //实例
      optionNumber: 0 //传入数据的数量

    }
  },
  props: {
    name: String,
    value: {
      type: [String, Number, Array, Object]
    },
    align: { //文字对齐方式
      default: 'left',
      validator(value) {
        return [
          'left',
          'center'
        ].findIndex((_value, index) => {
          return _value == value
        }) > -1;
      }
    },
    stayNumber: { //option数量阈值，用于鉴别长列表
      default: 8,
      type: Number
    }
  },
  watch: {
    model: function() {
      this.$emit('input', this.model) //利用index事件，向上传递数据
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.oSelect = new Select(this, this.$refs.selectInput); //实例化
      this.model = this.oSelect.selected; //触发watch， 向上传递数据
      this.setOptionNumber();
    })
  },
  methods: {

    //获取参数的数量，用于鉴别长列表
    setOptionNumber() {
      this.optionNumber = this.oSelect.getOptionNumber();
    },
    onTouchStart(ev) {
      ev.preventDefault();
      this.vis = true;
      this.selectBoxTop = ev.target.offsetTop
      this.$nextTick(() => {
        let domOpsBox = domFind(this.$refs.optionsBox.$el.childNodes, 'tap-option-optionBox');
        this.oSelect.onTouchStart(ev, domOpsBox);
      })
    },
    onTouchMove(ev) {
      ev.preventDefault();
      this.oSelect.onTouchMove(ev);
    },
    onTouchEnd(ev) {
      ev.preventDefault();
      this.oSelect.onTouchEnd().then((time) => {
        this.model = this.oSelect.selected;
        if (this.optionNumber <= this.stayNumber - 1) { //鉴别长列表
          setTimeout(() => {
            this.vis = false;
          }, time)
        }
      });
    },
    //点击确定按钮的处理
    onComfirm() {
      console.log(this.vis);
      setTimeout(() => {
        this.vis = false;
      }, 300)
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
      height: $height-select;
      box-sizing: border-box;
      overflow: hidden;
      box-shadow:2px 2px 5px $color-border;
      & .text{
        /* display: block; */
        /* text-align: center; */
        margin: 0 auto;
      }

      & .icon{
        position: absolute;
        right: 20px;
      }
      @descendent align {
        @modifier left {
          padding: 0 10px 0 20px;
        }

        @modifier center {
          margin: 0 auto;
        }
      }
    }

  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
