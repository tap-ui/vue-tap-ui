<template>
<span class="tap-badge" :style="{ backgroundColor: color}" :class="['is-' + type, 'is-size-' + size]">
    <slot></slot>
  </span>
</template>

<script>
/**
 * tap-badge
 * @module components/badge
 * @desc 徽章
 * @param {string} [type=primay] 组件样式 可选paimary, error , success ,warning
 * @param {string} [color] - 传入颜色值
 * @param {string} [size-normal] 尺寸，接受normal, small , large
 *
 * @example
 * <tap-badge type="error">错误</tap-badge>
 * <tap-badge color="#333">30</tap-badge>
 */
export default {
  name: 'tap-badge',

  props: {
    color: String,
    type: {
      type: String,
      default: 'primary',
      validator(value) {
        return [
          'primary',
          'error',
          'success',
          'warning',
        ].indexOf(value) > -1;
      }
    },
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return [
          'normal',
          'small',
          'large',
        ].indexOf(value) > -1;
      }
    }
  }
};
</script>

<style lang="css" >
	@import '../../common/style/variable.css';

  @component-namespace tap {
    @component badge {
      color: $color-white;
      text-align: center;
      display: inline-block;
      @when success {
        background-color: $color-success;
      }

      @when primary {
        background-color: $color-primary;
      }

      @when error {
        background-color: $color-error;
      }

      @when warning {
        background-color: $color-warning;
      }

      @when size-small {
        border-radius: 8px;
        font-size: 12px;
        padding: 2px 6px;
      }

      @when size-normal {
        border-radius: 12px;
        font-size: 15px;
        padding: 2px 8px;
      }

      @when size-large {
        border-radius: 14px;
        font-size: 18px;
        padding: 2px 10px;
      }
    }
  }
</style>
