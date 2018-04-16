<template lang="html">
  <div class="">
      <!-- 自定义标签 -->
      <div class="tap-tab-customTitle" @click='handlerCustomTitleChange' ref='customTitle' v-if='isCustomTitle'>
        <slot name='customTitle'></slot>
      </div>
      <div class="tap-tab-title">
        <!-- nav -->
        <nav :class="['tap-tab-title--'+layoutType]" ref='tabNav'  v-if='!isCustomTitle'>
          <ul class="" ref='tabUl'>
            <li
                v-for='(options, index) in titleList'
                @click='handleChange(index, options)'
                ref='tabTitle'
                :class="{
                  'tap-tab-title--active': index === activeIndex,
                  'is-disabled': options.disabled
                }"
            >
                {{options.title}}
            </li>
          </ul>
        </nav>
        <!-- 装饰下划线 -->
        <div class="tap-tab-line">
          <div ref='tabLine'> </div>
        </div>
      </div>
      <!-- 插槽,内容区 -->
      <div class="tap-tab-item-box">
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
      titleList: [],
      domItems: [],
      activeIndex: 0,

    };
  },
  watch: {
    activeIndex(index) {
      this.toggleItem();
      this.scrollLine();
      this.onSlide();
    }
  },
  computed: {
    isSlide() {
      return this.titleList.length > this.threshold;
    },
    layoutType() {
      return this.isSlide ? 'slideLayout' : 'flexLayout'
    },
    isCustomTitle() {
      return this.$slots.customTitle !== undefined
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.toggleItem();
      this.setLIneWidth();
      this.customTitleDisabled();
    });
  },
  updated() {
    this.customTitleDisabled();
    // this.updateNav();
    // console.log('更新？');
  },
  props: {
    threshold: {
      type: Number,
      default: 4
    }
  },
  methods: {
    getTabItems() {
      return this.$children.filter(item => item.$options._componentTag === "tap-tab-item");
    },
    updateNav() {
      this.titleList = [];
      this.domItems = [];
      this.getTabItems().forEach((item, index) => {
        this.titleList.push({
          title: item.title || '',
          disabled: item.disabled,
          vlaue: item.$options.propsData.value || ''
        });
        this.domItems.push({
          el: item.$el,
          index
        });
      });
    },
    //改变activeIndex
    handleChange(index, options) {
      if (this.titleList[index].disabled) return;
      this.activeIndex = index;
      this.emitTitleHandler(options);
    },
    //点击title，向外传递参数
    emitTitleHandler(_options) {
      this.$nextTick(() => {
        let options = Object.assign({}, _options, { titleEl: this.getCurTitle(), itemEl: this.getCurItem() })
        this.$emit('titleHandler', options); //激活父元素emit
        this.getTabItems()[this.activeIndex].emit(options); //激活子元素emit
      })
    },
    //item切换
    toggleItem() {
      let tabItems = this.getTabItems();
      tabItems.forEach((item, index) => {
        item.isVis = this.activeIndex === index ? true : false
      })
    },
    //动态设置下划线长度
    setLIneWidth() {
      const transform = prefixStyle('transform')
      this.$nextTick(() => {
        let width = this.getCurTitle().getBoundingClientRect().width;
        this.$refs.tabLine.setAttribute("style", `width:${width}px; ${transform}: translateX(0px)`);
      })
    },
    //获取当前active的title dom
    getCurTitle() {
      if (this.$refs.tabTitle) {
        return this.$refs.tabTitle[this.activeIndex];
      } else {
        return this.$refs.customTitle.children[this.activeIndex]
      }
    },
    //获取当前atcive的item dom
    getCurItem() {
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
          let offsetLeft = this.getCurTitle().getBoundingClientRect().left;
          this.$refs.tabLine.style[transform] = `translateX(${offsetLeft-4}px)`
        })
      } else {
        //slide模式 两端
        if (this.isdeal) {
          let offsetLeft = this.getCurTitle().getBoundingClientRect().left;
          this.$refs.tabLine.style[transform] = `translateX(${offsetLeft-4}px)`
        } else {
          setTimeout(() => {
            let offsetLeft = this.getCurTitle().getBoundingClientRect().left;
            this.$refs.tabLine.style[transform] = `translateX(${offsetLeft-4}px)`
          }, 400)
        }

      }
    },
    //滑动布局的逻辑
    onSlide() {
      if (!this.isSlide) return
      const transform = prefixStyle('transform')
      let curTitle = this.getCurTitle();
      let ul = this.$refs.tabUl; //ul
      let nav = this.$refs.tabNav;

      let allWidth = curTitle.getBoundingClientRect().width * this.titleList.length;
      let titleLeft = curTitle.offsetLeft;
      let window_width = window.innerWidth; //屏幕宽度
      let activeLeft = curTitle.offsetLeft;
      // 计算出相对于视口的中间值位置
      // 中间值 = （屏幕宽度 - 单个title宽度） / 2
      let middleVal = (window_width - curTitle.getBoundingClientRect().width) / 2;
      //实际居中目标值 = title的offsetLeft - 中间值
      let targetOffset = (titleLeft - middleVal);
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
    //自定义title的按钮事件
    handlerCustomTitleChange(event) {
      let i = domIndex(event, this.$refs.customTitle);
      if (this.getCustomTitleVnode()[i].data.attrs.disabled) return;
      this.activeIndex = i;
      this.customTitleEmit();
    },
    //自定义标签向外传递自定义事件
    customTitleEmit() {
      let custom = this.getCustomTitleVnode()[this.activeIndex];
      this.$nextTick(() => {
        let options = {
          value: this.getCurTitle().getAttribute('value') || '',
          itemEl: this.getCurItem(),
          title: custom.data.attrs.title || '',
          titleEl: custom.elm,
          disabled: custom.data.attrs.disabled || false
        }
        this.$emit('titleHandler', options)
      })

    },
    //获取自定义title集合
    getCustomTitleVnode() {
      if (!this.$slots.customTitle) return;
      return this.$slots.customTitle.filter(VNode => VNode.tag !== undefined);
    },
    //检测自定义标签是否禁用
    customTitleDisabled() {
      if (!this.$slots.customTitle) return;
      this.getCustomTitleVnode().forEach((VNode, i) => {
        if (VNode.data.attrs.disabled) {
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
      @descendent title{
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

      @descendent line{
        width: 100%;
        text-align: left;
        display: inline-block;
        height: 1px;
        transform: translateY(-10px);
        background-color: $color-divider;
        > div{
          transition: transform .3s;
          height: 1px;
          background-color: $color-primary;
        }
      }
      @descendent item-box {
        display: block;
      }

      /* 自定义 */
      @descendent customTitle {
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
