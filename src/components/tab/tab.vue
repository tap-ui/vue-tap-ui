<template lang="html">
  <div class="">
      <div class="tap-tab-title">
        <!-- nav -->
        <nav :class="['tap-tab-title--'+layoutType]" ref='tabNav' >
          <ul class="" ref='tabUl'>
            <li :class="{'tap-tab-title--active': index === activeIndex}"
                v-for='(options, index) in titleList'
                @click='handleChange(index, options)'
                ref='tabTitle'
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
      <!-- 插槽 -->
      <div class="tap-tab-item-box">
        <slot></slot>
      </div>
  </div>
</template>

<script>
import TabItem from "./tab-item";
import {
  classToggle
} from "../../common/js/dom";
export default {
  name: "tap-tab",
  components: {
    TabItem
  },
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
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.toggleItem();
      this.setLIneWidth();
    });
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
      console.log('xx');
      this.getTabItems().forEach((item, index) => {
        // console.log(item);
        this.titleList.push({
          title: item.title,
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
      this.activeIndex = index;
      this.emitTitleHandler(options);
    },
    //点击title，向外传递参数
    emitTitleHandler(_options) {
      let options = Object.assign({}, _options, { titleEl: this.getCurTitle(), itemEl: this.getCurItem() })
      this.$emit('titleHandler', options);
    },
    //item切换
    toggleItem() {
      // if (!this.oItemToggle) {
      //   this.oItemToggle = new classToggle("displayBlock");
      // }
      // this.oItemToggle.addClass(this.domItems[this.activeIndex].el);
      let tabItems = this.getTabItems();
      tabItems.forEach((item, index) => {
        item.isVis = this.activeIndex === index ? true : false
      })
    },
    //动态设置下划线长度
    setLIneWidth() {
      this.$nextTick(() => {
        let width = this.getCurTitle().getBoundingClientRect().width;
        this.$refs.tabLine.setAttribute("style", `width:${width}px; transform: translateX(0px)`);
      })
    },
    //获取当前active的title dom
    getCurTitle() {
      return this.$refs.tabTitle[this.activeIndex];
    },
    //获取当前atcive的item dom
    getCurItem() {
      return this.$children[this.activeIndex].$el;
    },
    //滚动下滑装饰线
    scrollLine(nTarget) {
      // if (this.isSlide) return;
      if (nTarget) {
        //slide模式 居中
        this.$refs.tabLine.style.transform = `translateX(${nTarget}px)`
      } else if (!this.isSlide) {
        //flex模式
        this.$nextTick(() => {
          let offsetLeft = this.getCurTitle().getBoundingClientRect().left;
          this.$refs.tabLine.style.transform = `translateX(${offsetLeft}px)`
        })
      } else {
        //slide模式 两端
        if (this.isdeal) {
          let offsetLeft = this.getCurTitle().getBoundingClientRect().left;
          this.$refs.tabLine.style.transform = `translateX(${offsetLeft}px)`
        } else {
          setTimeout(() => {
            let offsetLeft = this.getCurTitle().getBoundingClientRect().left;
            this.$refs.tabLine.style.transform = `translateX(${offsetLeft}px)`
          }, 400)
        }

      }
    },
    //滑动布局的逻辑
    onSlide() {
      if (!this.isSlide) return
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
        ul.style.transform = 'translateX(0px)'
        this.scrollLine()
        return;
      }
      //尾端的处理
      if (-targetOffset < window_width - allWidth) {
        ul.style.transform = `translateX(${window_width - allWidth}px)`
        this.scrollLine()
        return;
      }
      //正常的设置
      ul.style.transform = `translateX(${-targetOffset}px)`
      this.scrollLine(middleVal);
      this.isdeal = false;
    },

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
        border-top: 1px solid $color-divider;
        overflow: hidden;
        >nav{
            height: 40px;
            line-height: 40px;
            margin: 0;
            text-align: center;
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
          /* overflow: hidden; */
          white-space: nowrap;
          /* transform: translateX(-80px); */
          > ul{
            transition: transform .3s;
            /* overflow: hidden; */
            /* display: flex;
             flex-wrap: nowrap; */
             /* white-space-collapse:discard;  */
             /* font-size: 0px; */
            > li {
              /* font-size： 18px; */
              border:1px solid red;
              border-right: none;
              text-align: center;
               word-spacing: -3px;
              display: inline-block;
              /* white-space: nowrap; */
              /* float: left; */
              width: 25%;
              box-sizing: content-box;
              /* margin: 0 -3px; */
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
    }
  }
  .displayBlock {
    display: block !important;
  }
</style>
