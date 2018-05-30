<template>
<button :type="type" class="tap-button" :class="['tap-button--'+ type, 'tap-button--'+size, {
      'is-plain':plain,
      'is-disabled':disabled,
      'tap-button--shadow': shadow,
      'tap-button--inset': inset
    }]" @click="handleClick" :disabled='disabled'>
  <span class="mint-button-icon" v-if='icon'>
    <slot name='icon'>
      <i v-if='icon' class="iconfont" :class="'icon-'+  icon"></i>
    </slot>
  </span>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'tap-button',
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  },
  props: {
    plain: Boolean,
    disabled: Boolean,
    icon: String,
    iconMarginRight: Number,
    type: {
      default: 'default',
      validator(value) {
        return [
          'default',
          'error',
          'primary',
          'success',
          'warning'
        ].findIndex((_value, index) => {
          return _value == value
        }) > -1
      }
    },
    size: {
      default: 'normal',
      validator(value) {
        return [
          'small',
          'normal',
          'large',
          'block'
        ].findIndex((_value, index) => {
          return _value == value
        }) > -1
      }
    },
    shadow: {
      type: Boolean,
      default: false
    },
    inset: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style  lang="css">
	@import '../../common/style/variable.css';

@component-namespace tap {
  @component button {
    appearance: none;
    border-radius: 3px;
    border: 0;
    box-sizing: border-box;
    color: inherit;
    display: block;
    font-size: 16px;
    height: 40px;
    outline: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
    transition: all 0.1s;
    user-select: none;

    @modifier shadow {
      &:not(.is-disable):active{
        box-shadow:0 3px 8px rgba(0,0,0,.156863), 0 3px 8px rgba(0,0,0,.227451);
      }
    }
    @modifier inset {
      &::after {
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.22) inset;
      }

    }
    /* 点击的active样式 */
    &::after {
      background-color: $color-white;
      content: " ";
      opacity: 0;
      position: absolute 0 0 0 0;
      /* box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.22) inset; */
    }
    &:not(.is-disable):active::after {
      opacity: .4;
    }
    /* icon */
    @descendent icon {
      vertical-align: middle;
      display: inline-block;
    }

    /* 主题 */
    @modifier default {
      color: $color-content;
      background-color: $color-background;
      box-shadow: $color-border;
      border: $color-border 1px solid;
      @when plain {
        border: 1px solid $color-border;
        background-color: $color-white;
        box-shadow: none;
        color: $color-content;
      }
    }
    @modifier primary {
      color: $color-white;
      background-color: $color-primary;
      transition: color .2s linear, background-color .2s linear, border .2s linear, box-shadow .2s linear;

      @when plain {
        border: 1px solid $color-primary;
        background-color: $color-white;
        color: $color-primary;
      }
    }
    @modifier success {
      color: $color-white;
      background-color: $color-success;

      @when plain {
        border: 1px solid $color-success;
        background-color: $color-white;
        color: $color-success;
      }
    }
    @modifier error {
      color: $color-white;
      background-color: $color-error;

      /* plain 也就是幽灵按钮，把主题色设置为字体和边框颜色。背景色为白色 */
      @when plain {
        border: 1px solid $color-error;
        background-color: $color-white;
        color: $color-error;
      }
    }
    @modifier warning {
      color: $color-white;
      background-color: $color-warning;

      @when plain {
        border: 1px solid $color-warning;
        background-color: $color-white;
        color: $color-warning;
      }
    }

    /* 尺寸 */
    @modifier small {
      font-size: 14px;
      display: inline-block;
      height: 33px;
      padding: 0px 10px;
    }
    @modifier normal {
      font-size: 16px;
      display: inline-block;
      padding: 2px 10px;
    }
    @modifier large {
      display: inline-block;
      font-size: 20px;
      padding: 6px 12px;
      height: 51px;
    }
    @modifier block {
      width: 100%;
      display: block;
      box-sizing: border-box;
    }

    /* 禁用 */
    @when disabled {
      opacity: .4;
      cursor: not-allowed;
      /* 元素永远不会成为鼠标事件的target */
      pointer-events: none;

    }
  }
}
</style>
