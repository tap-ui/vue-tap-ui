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
import TabItem from './tab-item'
import {
  classToggle
} from '../../common/js/dom'
export default {
  name: 'tap-tab',
  components: {
    TabItem
  },
  data() {
    return {
      titleList: [],
      domItems: [],
      activeIndex: 0
    }
  },
  watch: {
    activeIndex(index) {
      this.toggleItem();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.toggleItem();
      this.setLIneWidth();
    })
  },
  methods: {

    getTabItems() {
      return this.$children.filter(
        item => item.$options._componentTag === 'tap-tab-item'
      )
    },
    updateNav() {
      this.titleList = [];
      this.domItems = [];
      this.getTabItems().forEach((item, index) => {
        // console.log(item);
        this.titleList.push({
          title: item.title,
          disabled: item.disabled
        })
        this.domItems.push({
          el: item.$el,
          index
        })
      })
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
      if (!this.oClassToggle) {
        this.oClassToggle = new classToggle('active');
      }
      this.oClassToggle.addClass(this.domItems[this.activeIndex].el);
    },
    //动态设置下划线长度
    setLIneWidth() {
      let width = this.$refs.tabTitle[0].getBoundingClientRect().width;
      this.$refs.tabLine.setAttribute('style', `width:${width}px; transform: translateX(0px)`)
    },
  }

}
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
          > div{
            border: solid red 1px ;
            flex: 1
          }
        }
      }
      @descendent line{
        width: 100%;
        text-align: left;
        display: inline-block;
        height: 1px;
        > div{
          transition: transform;
          height: 1px;
          background-color: $color-primary;
        }
      }
    }
  }
  .active {
    display: block !important;
  }
</style>
