<template lang="html">
    <div class="tap-panel" :class="{'tap-panel-expand': isActive}" >
      <div class="tap-panel-title"  @click="toggle">
        <i class="iconfont icon-forward icon" :class="{'open': isActive}"></i>
        <slot></slot>
      </div>
      <div class="tap-panel-content" ref="content">
        <div class="tap-panel-content-box" >
          <slot name="content"></slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'tap-panel',

  props: {
    name: {
      type: String,
    }
  },

  data () {
    return {
      isActive: false,
      index: 0,
    }
  },

  methods: {
    toggle() {
      // 反向选择
      this.isActive = !this.isActive;

      this.$parent.toggle({
        name: this.name || this.index,
        isActive: this.isActive
      })
    }
  },

  watch: {
    isActive(newVal) {
      const con = this.$refs.content;

      if (newVal) {
        con.style.height = `${con.scrollHeight}px`;
      } else {
        con.style.height = '0';
      }
    }
  },

}
</script>

<style lang="css">
@import '../../common/style/variable.css';

@component-namespace tap {
  @component panel {


    @descendent content{
      position: relative;
      overflow: hidden;
      height: 0;
      font-size: 14px;
      transition-duration: 300ms;
      transform: translate3d(0, 0, 0);
      box-sizing: border-box;
      border-top: none;
      background-color: $color-white;

      @descendent box{
        padding: 10px;

      }
    }


    @descendent title {
      padding: 10px;
      /* background: $color-white; */
      color: $color-title;
      cursor: pointer;
      padding-left: 15px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid $color-divider;
      box-sizing: border-box;

      &:last-child {
        border-bottom: none;
      }
    }

    @modifier expand{
      .tap-panel-content{
      	height:auto;
      }
    }
  }
}

.icon {
  font-size: 14px;
  margin-right: 5px;
  line-height: 14px;
  transition: all .3s ease-in-out;

  &.open {
    transform: rotate(90deg);

  }
}

</style>
