<template lang="html">
  <div class="tap-select"
      :class="{'is-disabled': disabled}"
      @touchstart='onTouchStart'
      @touchmove='onTouchMove'
      @touchend='onTouchEnd'
      ref='selectInput'
      >
    <input type="hidden" :name='name' v-model="model">
    <!-- label显示处 -->
    <div :class="['tap-select-align--' + align]" v-if='model'>
      {{model.label}}
    </div>
    <!-- icon -->
    <i class="icon iconfont icon-jinyong" v-if='disabled'></i>
    <i class="icon iconfont icon-ICON-" v-else></i>

    <!-- 选项列表组件 -->
    <transition name="fade">
      <div >
      <tap-option
        ref='optionsBox'
        :title="title"
        :oSelect='oSelect'
        :selectBoxTop='selectBoxTop'
        @onComfirm='onComfirm'
        :align='align'
        :stayNumber='stayNumber'
        v-if='vis'
        >
            <!-- 列表插槽,slot标签将被外部传入的option替换 -->
            <slot></slot>
      </tap-option>
    </div>
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
      model: this.value,
      selectBoxTop: 0,
      vis: false, //控制列表显示的变量
      oSelect: {}, //实例
      optionNumber: 0, //传入数据的数量
      isEnded: true
    }
  },
  props: {
    name: String,
    title: String,
    value: { //虽然v-model会自动创建
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
    },
    disabled: Boolean
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
      if (this.disabled) return; //禁用模式
      if (!this.isEnded) return; //如果上一次点击还没有结束
      this.isEnded = false
      this.vis = true;
      this.selectBoxTop = this.$refs.selectInput.getBoundingClientRect().top;
      this.$nextTick(() => {
        let domOpsBox = domFind(this.$refs.optionsBox.$el.childNodes, 'tap-option-optionBox');
        this.oSelect.onTouchStart(ev, domOpsBox);
      })

    },
    onTouchMove(ev) {
      ev.preventDefault();
      this.isEnded = false
      if (this.disabled) return; //禁用模式
      this.oSelect.onTouchMove(ev);
    },
    onTouchEnd(ev) {
      ev.preventDefault();
      this.isEnded = true;
      if (this.disabled) return; //禁用模式
      this.oSelect.onTouchEnd()
        .then((time) => {
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
      setTimeout(() => {
        this.vis = false;
      }, 200)
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
      box-shadow:0px 0px 8px $color-border;

      /*  */
      & .text{
        margin: 0 auto;
      }
      /* 右边icon */
      & .icon{
        position: absolute;
        right: 20px;
      }
      /* 对齐方式 */
      @descendent align {
        @modifier left {
          padding: 0 10px 0 20px;
        }

        @modifier center {
          margin: 0 auto;
        }
      }
      @when disabled {
        background-color: $color-disabled;
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }
    }

  }

  /* 选项列表显现的过渡动画 */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
