label<template lang="html">
  <div class="">
      <!-- 自定义标签 -->
      <div class="tap-tab-customLabel" @click='handlerCustomLabelChange' ref='customLabel' v-if='isCustomLabel'>
        <slot name='customLabel'></slot>
      </div>

      <div class="tap-tab-label">
        <!-- nav -->
        <nav :class="['tap-tab-label--'+layoutType]" ref='tabNav'  v-if='!isCustomLabel'>
          <ul ref='tabUl'>
            <li
                v-for='(options, index) in labelList'
                @click='handleChange(index, options)'
                ref='tabLabel'
                :class="{
                  'tap-tab-label--active': index === activeIndex,

                  'is-disabled': options.disabled,
                }"
            >
                {{options.label}}
            </li>
          </ul>
        </nav>
        <!-- 装饰下划线 -->
        <div class="tap-tab-line">
          <div ref='tabLine'> </div>
        </div>
      </div>
      <!-- 插槽,内容区 -->
      <div class="tap-tab-pane-box">
        <slot></slot>
      </div>
  </div>
</template>

<script>
import { domIndex, prefixStyle } from '../../common/js/dom'
import {
  classToggle
} from "../../common/js/dom";
export default {
  name: "tap-tab",
  data() {
    return {
      labelList: [],
      domPanes: [],
      activeIndex: 0,
      disableds: []
    };
  },
  watch: {
    activeIndex(index) {
      this.togglePane();
      this.scrollLine();
      this.onSlide();
    }
  },
  computed: {
    isSlide() {
      return this.labelList.length > this.threshold;
    },
    layoutType() {
      return this.isSlide ? 'slideLayout' : 'flexLayout'
    },
    isCustomLabel() {
      return this.$slots.customLabel !== undefined
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.togglePane();
      this.setLIneWidth();
      this.customLabelDisabled();
    });
  },
  beforeUpdate() {
    this.$children.filter(pane => pane.$options._componentTag === "tap-tab-pane");
  },
  updated() {
    this.customLabelDisabled();
  },
  props: {
    threshold: {
      type: Number,
      default: 4
    }
  },
  methods: {
    getTabPanes() {
      return this.$children.filter(pane => pane.$options._componentTag === "tap-tab-pane");
    },
    updateNav() {
      this.labelList = [];
      this.domPanes = [];
      this.getTabPanes().forEach((pane, index) => {
        this.labelList.push({
          label: pane.label || '',
          disabled: pane.disabled,
          vlaue: pane.$options.propsData.value || '',
          index
        });
        this.domPanes.push({
          el: pane.$el,
          index
        });
      });
    },
    //改变activeIndex
    handleChange(index, options) {
      if (this.labelList[index].disabled) return;
      this.activeIndex = index;
      this.emitLabelHandler(options);
    },
    //点击label，向外传递参数
    emitLabelHandler(_options) {
      this.$nextTick(() => {
        let options = Object.assign({}, _options, { labelEl: this.getCurLabel(), paneEl: this.getCurPane() })
        this.$emit('labelHandler', options); //激活父元素emit
        this.getTabPanes()[this.activeIndex].emit(options); //激活子元素emit
      })
    },
    //pane切换
    togglePane() {
      let tabPanes = this.getTabPanes();
      tabPanes.forEach((pane, index) => {
        pane.isVis = this.activeIndex === index ? true : false
      })
    },
    //动态设置下划线长度
    setLIneWidth() {
      const transform = prefixStyle('transform')
      this.$nextTick(() => {
        let width = this.getCurLabel().getBoundingClientRect().width;
        this.$refs.tabLine.setAttribute("style", `width:${width}px; ${transform}: translateX(0px)`);
      })
    },
    //获取当前active的label dom
    getCurLabel() {
      if (this.$refs.tabLabel) {
        return this.$refs.tabLabel[this.activeIndex];
      } else {
        return this.$refs.customLabel.children[this.activeIndex]
      }
    },
    //获取当前atcive的pane dom
    getCurPane() {
      return this.$slots.default.filter(VNode => VNode.tag !== undefined)[this.activeIndex].elm
    },
    //滚动下滑装饰线
    scrollLine(nTarget) {
      const transform = prefixStyle('transform')
      if (nTarget) {
        //slide模式 居中
        this.$refs.tabLine.style[transform] = `translateX(${nTarget-4}px)`
      } else if (!this.isSlide) {
        //flex模式
        this.$nextTick(() => {
          let offsetLeft = this.getCurLabel().getBoundingClientRect().left;
          this.$refs.tabLine.style[transform] = `translateX(${offsetLeft-4}px)`
        })
      } else {
        //slide模式 两端
        if (this.isdeal) {
          let offsetLeft = this.getCurLabel().getBoundingClientRect().left;
          this.$refs.tabLine.style[transform] = `translateX(${offsetLeft-4}px)`
        } else {
          setTimeout(() => {
            let offsetLeft = this.getCurLabel().getBoundingClientRect().left;
            this.$refs.tabLine.style[transform] = `translateX(${offsetLeft-4}px)`
          }, 400)
        }

      }
    },
    //滑动布局的逻辑
    onSlide() {
      if (!this.isSlide) return
      const transform = prefixStyle('transform')
      let curLabel = this.getCurLabel();
      let ul = this.$refs.tabUl; //ul
      let nav = this.$refs.tabNav;

      let allWidth = curLabel.getBoundingClientRect().width * this.labelList.length;
      let labelLeft = curLabel.offsetLeft;
      let window_width = window.innerWidth; //屏幕宽度
      let activeLeft = curLabel.offsetLeft;
      // 计算出相对于视口的中间值位置
      // 中间值 = （屏幕宽度 - 单个label宽度） / 2
      let middleVal = (window_width - curLabel.getBoundingClientRect().width) / 2;
      //实际居中目标值 = label的offsetLeft - 中间值
      let targetOffset = (labelLeft - middleVal);
      this.isdeal = true;
      //开头的处理
      if (targetOffset < 0) {
        ul.style[transform] = 'translateX(0px)'
        this.scrollLine()
        return;
      }
      //尾端的处理
      if (-targetOffset < window_width - allWidth) {
        ul.style[transform] = `translateX(${window_width - allWidth}px)`
        this.scrollLine()
        return;
      }
      //正常的设置
      ul.style[transform] = `translateX(${-targetOffset}px)`
      this.scrollLine(middleVal);
      this.isdeal = false;
    },
    //自定义label的按钮事件
    handlerCustomLabelChange(event) {
      let i = domIndex(event, this.$refs.customLabel);

      if (this.getCustomLabelVnode()[i].data && this.getCustomLabelVnode()[i].data.attrs.disabled) return;
      this.activeIndex = i;
      this.customLabelEmit();
    },
    //自定义标签向外传递自定义事件
    customLabelEmit() {
      let custom = this.getCustomLabelVnode()[this.activeIndex];
      let value = ''
      if (this.getCurLabel().getAttribute('value')) {
        value = this.getCurLabel().getAttribute('value')
      }
      this.$nextTick(() => {
        let label = custom.data ? custom.data.attrs.label : ''
        let disabled = custom.data ? custom.data.attrs.disabled : false
        let options = {
          index: this.activeIndex,
          value,
          label,
          disabled,
          paneEl: this.getCurPane(),
          labelEl: custom.elm,
        }
        this.$emit('labelHandler', options)
      })

    },
    //获取自定义label集合
    getCustomLabelVnode() {
      if (!this.$slots.customLabel) return;
      return this.$slots.customLabel.filter(VNode => VNode.tag !== undefined);
    },
    //检测自定义标签是否禁用
    customLabelDisabled() {
      if (!this.$slots.customLabel) return;
      this.getCustomLabelVnode().forEach((VNode, i) => {
        // console.log(VNode);
        if (VNode.data && VNode.data.attrs.disabled) {
          VNode.elm.classList.add('is-disabled')
        } else {
          VNode.elm.classList.remove('is-disabled')
        }
      })
    }
  }
};
</script>

<style lang="css">
  @import '../../common/style/variable.css';
  @component-namespace tap {
    @component tab {
      overflow: hidden;
      width: 100%;
      @descendent label{
        overflow: hidden;
        cursor: pointer;
        > nav{
            border-top: 1px solid $color-divider;
            height: 40px;
            line-height: 40px;
            margin: 0;
            text-align: center;
              & li{
              user-select: none;
                /* 禁用 */
                @when disabled {
                  background-color: $color-disabled;
                  opacity: 0.5;
                }
              }
              /* 点击时激活 */
              & li:not(.is-disabled):active{
                color: $color-primary ;
                background-color: $color-background;
              }
        }
        /* 小于阈值以下，使用flex布局 */
        @modifier flexLayout {
          > ul{
            display: flex;
            >li {
              flex: 1
            }
          }
        }

        /* 超过阈值，使用滑动布局 */
        @modifier slideLayout {
          white-space: nowrap;
          > ul{
            transition: transform .3s;
            > li {
              border-right: none;
              text-align: center;
               word-spacing: -3px;
              display: inline-block;
              width: 25%;
              box-sizing: content-box;
            }
          }
        }
        @modifier active {
          color: $color-primary;
        }
      }

      /* 下划线 */
      @descendent line{
        width: 100%;
        text-align: left;
        display: inline-block;
        height: 1px;
        transform: translateY(-12px);
        background-color: $color-divider;
        > div{
          transition: transform .3s;
          height: 1px;
          background-color: $color-primary;
        }
      }
      @descendent pane-box {
        display: block;
      }

      /* 自定义label */
      @descendent customLabel {
        border-top: 1px solid $color-divider;
        display: flex;

        height: 40px;
        line-height: 40px;
        margin: 0;
        text-align: center;
        > *:not(.is-disabled):active{
          color: $color-primary;
          background-color: $color-background;
        }
        > * {
          flex: 1;
          @when disabled {
            background-color: $color-disabled;
            opacity: 0.5;
          }
        }
      }
    }
  }
  .displayBlock {
    display: block !important;
  }
</style>
