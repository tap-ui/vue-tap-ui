<template lang="html">
  <div class="">
      <div class="tap-tab-title">
        <nav>
          <div class="" v-for='(item, index) in titleList' @click='handleChange(index)' ref='tabTitle'>
              {{item.title}}
          </div>
        </nav>
        <div class="tap-tab-line">
          <div ref='tabLine'> </div>
        </div>
      </div>


      <slot></slot>
  </div>
</template>

<script>
import TabItem from "./tab-item";
import { classToggle } from "../../common/js/dom";
export default {
  name: "tap-tab",
  components: {
    TabItem
  },
  data() {
    return {
      titleList: [],
      domItems: [],
      activeIndex: 0
    };
  },
  watch: {
    activeIndex(index) {
      this.toggleItem();
      this.scrollLine();
      this.titleHighLight();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.toggleItem();
      this.setLIneWidth();
      this.titleHighLight()
    });
  },
  methods: {
    getTabItems() {
      return this.$children.filter(
        item => item.$options._componentTag === "tap-tab-item"
      );
    },
    updateNav() {
      this.titleList = [];
      this.domItems = [];
      this.getTabItems().forEach((item, index) => {
        // console.log(item);
        this.titleList.push({
          title: item.title,
          disabled: item.disabled
        });
        this.domItems.push({
          el: item.$el,
          index
        });
      });
      // console.log(this.domItems);
      // console.log(this.$children);
      // console.log(this.titleList);
      // console.log(this.$children);
    },
    //改变activeIndex
    handleChange(index) {
      this.activeIndex = index;
    },

    //item切换
    toggleItem() {
      if (!this.oItemToggle) {
        this.oItemToggle = new classToggle("displayBlock");
      }
      this.oItemToggle.addClass(this.domItems[this.activeIndex].el);
    },
    //动态设置下划线长度
    setLIneWidth() {
      let width = this.getCurTitle().getBoundingClientRect().width;
      this.$refs.tabLine.setAttribute("style", `width:${width}px; transform: translateX(0px)`);
    },
    getCurTitle() {
      return this.$refs.tabTitle[this.activeIndex];
    },
    scrollLine() {
      let offsetLeft = this.getCurTitle().offsetLeft
      this.$refs.tabLine.style.transform = `translateX(${offsetLeft}px)`
    },
    titleHighLight() {
      if (!this.otitleHighLight) {
        this.otitleHighLight = new classToggle("tap-tab-title--active");
      }
      this.otitleHighLight.addClass(this.getCurTitle())
    }
  }
};
</script>

<style lang="css">
  @import '../../common/style/variable.css';
  @component-namespace tap {
    @component tab {
      @descendent title{
        >nav{
            display: flex;
            height: 40px;
            line-height: 40px;
            margin: 0;
          > div{
            /* border: solid red 1px ; */
            flex: 1;
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
        height: 2px;
        transform: translateY(-10px);
        > div{

          transition: transform .3s;
          height: 2px;
          background-color: $color-primary;
        }
      }
    }
  }
  .displayBlock {
    display: block !important;
  }
</style>
