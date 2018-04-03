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
        @input='changeModel'
        @onComfirm='onComfirm'
        :align='align'
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
} from './util'

export default {
  name: 'tap-select',
  components: {
    tapOption
  },
  data() {
    return {
      // offsetTop : {},
      model: this.value,
      startEv: {},
      moveEv: {},
      selectBoxTop: 0,
      vis: false,
      oSelect: {},
      optionNumber: 0
    }
  },
  props: {
    name: String,
    value: {
      type: [String, Number, Array, Object]
    },
    align: {
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
    stayNumber: {
      default: 8,
      type: Number
    }
  },
  watch: {
    model: function() {
      this.$emit('input', this.model) //技巧，向上传递数据
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.oSelect = new Select(this, this.$refs.selectInput); //实例化
      this.model = this.oSelect.selected; //触发watch， 向上传递数据
      this.setOptionNumber();
    })
  },
  methods: {
    changeModel(value) {
      this.modle = value;
    },
    setOptionNumber() {
      this.optionNumber = this.oSelect.getOptionNumber();
    },
    onTouchStart(ev) {
      ev.preventDefault();
      this.vis = true;
      this.selectBoxTop = ev.target.offsetTop
      this.$nextTick(() => {
        let domOptionsBox = domFind(this.$refs.optionsBox.$el.childNodes, 'tap-option-optionBox');
        this.oSelect.onTouchStart(ev, domOptionsBox);
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
        if (this.optionNumber <= this.stayNumber) {
          setTimeout(() => {
            console.log('执行了？');
            this.vis = false;
          }, time)
        }
      });
    },
    //点击确定按钮的处理
    onComfirm() {
      console.log(this.vis);
      setTimeout(() => {
        console.log('执行了？');
        this.vis = false;
      }, 300)
      console.log(this.vis);
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
