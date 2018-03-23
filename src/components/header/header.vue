<template>
    <header
      class="tap-header"
      :class="{ 'is-fixed' : fixed }">
      <div class="tap-header-button is-left">
        <slot name="left"></slot>
      </div>
      <h1 class="tap-header-title" v-text="title"></h1>
      <div class="tap-header-button is-right">
        <slot name="right"></slot>
      </div>
    </header>
</template>


<script>
/**
  * tap-header
  * @module components/header
  * @desc 顶部导航
  * @param {boolean} [fixed=false] - 固定顶部
  * @param {string} [title] - 标题
  * @param {slot} [left] - 显示在区域的左边
  * @param {slot} [right] - 显示在区域的右边
  *
  * @example
  * <tap-header title="我是标题">
  *  <mt-button slot="left" icon="back" @click="handleClcik"></mt-button>
  *  <mt-button slot="right" icon="more"></mt-button>
  * </tap-header>
*/
export default {
  name: 'tap-header',

  props: {
    fixed: Boolean,
    title: String
  }
}
</script>

<style lang="css">
  @import "../../style/variable.css";

  @component-namespace tap {
    @component header {
      display: flex;
      background-color: $color-primary;
      box-sizing: border-box;
      color: $color-white;
      font-size: 14px;
      height: $header-height;
      padding:0 10px;
      align-items: center;
      text-align: center;
      white-space: nowrap;


      .tap-button {
        display: inline-block;
        background: transparent;
        border: none;
        color: inherit;
        border-radius: 0;
        box-shadow: none;
        font-size: inherit;
      }

      @descendent button {
        flex: .5;

        > a {
          color: inherit;
        }

        @when left {
            text-align: left;
        }

        @when right {
          text-align: right;
        }
      }

      @descendent title {
        @utils-ellipsis;
        flex: 1;
        font-weight: normal;
        font-size: inherit;
      }

      @when fixed {
        position: fixed 0 0 * 0;
        z-index: $z-index-normal;
      }
    }
  }
</style>
