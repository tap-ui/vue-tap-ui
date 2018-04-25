<template lang="html">
  <div class="tap2-select"
      :class="{'is-disabled': disabled}"
      @touchstart='onTouchStart'
      @touchmove='onTouchMove'
      @touchend='onTouchEnd'
      ref='selectInput'
      >
    <input type="hidden" :name='name' v-model="model">
    <!-- label显示处 -->
    <div :class="['tap2-select-align--' + align]" v-if='model'>
      {{model.label}}
    </div>
    <!-- icon -->
    <i class="icon iconfont icon-jinyong" v-if='disabled'></i>
    <i class="icon iconfont icon-ICON-" v-else></i>

    <!-- 选项列表 -->
    <transition name="fade">
    <ul class="tap2-option"
      v-if='vis'
      ref='optionsBox'
      key='optionsBox'>
      <div class="tap2-option-title" v-if='title'>
        {{title}}
      </div>
      <!-- 选择范围 -->
      <div class="tap2-option-range" ref='selectRange'></div>
      <!-- 选项列表容器 -->
      <div class="tap2-option-optionBox"
        :class="'tap2-option-optionBox--'+align"

        ref='box'>
        <slot></slot>
      </div>
      <!-- 长列表才会显示的确认按钮 -->
      <div class="tap-option-comfirm" @touchstart='onComfirm' v-if='isBtnVis'>
        确定
      </div>
    </ul>
    </transition>
  </div>
</template>

<script>
import {
  domFind
} from '../../common/js/dom'

export default {
  name: 'tap-select2',
  data() {
    return {
      model: '',
      isBtnVis: false,
      vis: false,
      viewportTop: null,
      index: 0,
      selected: {}, //当前选中数据
      values: [],
    }
  },
  watch: {
    model: function() {
      this.$emit('input', this.model) //利用index事件，向上传递数据
    },
    index: function(i) {
      this.$nextTick(() => {
        console.log(this.$childred.filter(option => option.$options._componentTag === 'tap-select2'));
      })
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
  computed: {

  },
  mounted() {
    this.getOptionHeight();
    this.extractValue();
    this.$nextTick(() => {
      this.model = this.values[this.index]
    })

  },
  methods: {
    onTouchStart(ev) {
      if (this.vis) return;
      ev.preventDefault();
      // if (this.disabled) return; //禁用模式
      // if (!this.isEnded) return; //如果上一次点击还没有结束
      this.isEnded = false
      this.vis = true;
      this.selectBoxTop = this.$refs.selectInput.getBoundingClientRect().top;
      this.setRangeTop(); //设置选择范围的高度
      this.startEv = ev;
      this.$nextTick(() => {
        this.domOpsBox = this.$refs.box;
      })
      this.calcPos(true)
      this.calcScrope();

    },
    onTouchMove(ev) {
      let distance = this._getMoveDistance(ev); //获取偏移值
      if (this.curPosY - distance < this.scopeMaxTop || this.curPosY - distance > this.scopeMaxBottom) return; //限制偏移范围
      this.domOpsBox.setAttribute('style', `will-change: transform;transform:  translateY(${this.curPosY - distance}px)`); // 当前坐标 - 偏移值
      this.retPosY = this.curPosY - distance; //记录临时坐标
      this.index = this.calcIndex();
    },
    onTouchEnd() {
      this.curPosY = this.retPosY; //滑动结束，将临时坐标赋值给当前坐标
      this.index = this.calcIndex();
      this.calcPos(false);
      this.setCurValue();
      let _this = this
      setTimeout(function() {
        _this.vis = false;
      }, 200)
      this.model = this.values[this.index];
      // this.domOps.length = 0; //清空options dom数组
      // this.oHighLight = null;
    },
    setRangeTop() {
      this.$nextTick(() => {
        !this.viewportTop ?
          this.$refs.selectRange.style.top = this.selectBoxTop + 'px' :
          this.$refs.selectRange.style.top = this.viewportTop + 'px';

        this.viewportTop = this.selectBoxTop;
      })
    },
    /**
     * [calcPos 计算坐标]
     * @param  {Boolean} isPreset [是不是预设]
     * @return {[Select]}           [返回Select当前对象，用于链式调用]
     */
    calcPos(isPreset) {
      this.$nextTick(() => {
        let selectInputTop = this.$refs.selectInput.getBoundingClientRect().top;
        let distance = this.index == 0 ?
          selectInputTop :
          selectInputTop - (this.index * this.optionHeight);
        this.setPos(distance, isPreset);
      })
    },
    setCurValue() {
      this.selected = this.values[this.index];
    },
    //计算移动的范围
    calcScrope() {
      if (this.oldSelectBoxTop == this.selectBoxTop) return; //如果页面没有滚动，不需要再次计算范围
      this.scopeMaxTop = this.selectBoxTop - (this.optionHeight * (this.values.length - 1)) - this.optionHeight / 4;
      this.scopeMaxBottom = this.selectBoxTop + this.optionHeight / 4;
      this.oldSelectBoxTop = this.selectBoxTop;
    },
    /**
     * [setPos 设置坐标]
     * @param {[Number]}  distance [设置坐标]
     * @param {Boolean} isPreset [是不是预设]
     */
    setPos(distance, isPreset) {
      this.$nextTick(() => {})
      isPreset ? this.domOpsBox.setAttribute('style', `will-change: transform; transform:translateY(${distance}px)`) :
        this.domOpsBox.setAttribute('style', `will-change: transform; transition: transform .2s; transform: translateY(${distance}px)`);
      this.curPosY = distance; //将偏移值赋值给当前坐标
    },
    //计算移动偏移值
    _getMoveDistance(moveEv) {
      return this.startEv.touches[0].pageY - moveEv.touches[0].pageY; //偏移值 = 起点坐标 - 移动坐标
    },
    //获取option的高度
    getOptionHeight() {
      this.optionHeight = this.$refs.selectInput.getBoundingClientRect().height;
    },
    extractValue() {
      this.$nextTick(() => {
        this.$slots.default.filter((VNode) => VNode.tag !== undefined).forEach((VNode) => {
          this.values.push({
            value: VNode.componentOptions.propsData.value || '',
            label: VNode.componentOptions.children[0].text
          })
        });
      })
    },
    //根据位置计算当前的index
    calcIndex() {
      //思路:获取每个option的top值。与select的位置相减，绝对值越小意味着与select越近
      let ArrayOptionTop = [];
      Array.from(this.domOpsBox.children).forEach((item) => {
        if (item.nodeType == 1) {
          ArrayOptionTop.push(item.getBoundingClientRect().top)
        }
      })

      let selectCurPos = this.$refs.selectInput.getBoundingClientRect().top + (this.optionHeight / 4);
      let retArr = ArrayOptionTop.map((top) => {
        return Math.abs(selectCurPos - top)
      });
      let min = Math.min.apply(Math, retArr);
      return retArr.indexOf(min);
    }
  }
}
</script>

<style lang="css">
  @import '../../common/style/variable.css';

  @component-namespace tap2{
    @component select {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: $height-select;
      box-sizing: border-box;
      overflow: hidden;
      box-shadow:2px 2px 5px $color-border;

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

  /* 选项列表显现的过渡动画 */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
