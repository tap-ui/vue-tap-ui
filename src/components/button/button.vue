<template>
  <button
    :type="type"
    class="tap-button"
    :class="['tap-button--'+ type, 'tap-button--'+size, {
      'is-plain':plain,
      'is-disabled':disabled
    }]"
    @click="handleClick"
    :disabled='disabled'
  >
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
      type:{
        default:'default',
        validator(value) {
          return [
            'default',
            'danger',
            'primary',
            'success',
            'warning'
          ].findIndex((_value, index) => {
            return _value == value
          }) > -1
        }
      },
      size: {
        default:'normal',
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
      }
    }
  }
</script>

<style  >
	@import '../../style/variable.css';

  @component-namespace tap {
    @component button {
      appearance: none;
      border-radius: 4px;
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
      transition: all 0.2s;

      /* 点击的active样式 */
      &::after {
        background-color: #fff;
        content: " ";
        opacity: 0;
        position: absolute 0 0 0 0;
        box-shadow:0 0 10px 1px rgba(0,0,0,0.22) inset;
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
        color: $button-default-color;
        background-color: $button-default-background-color;
        box-shadow: $button-default-box-shadow;

        @when plain {
         border: 1px solid $button-default-plain-color;
         background-color: transparent;
         box-shadow: none;
         color: $button-default-plain-color;
        }
      }
      @modifier primary {
        color: $button-write-color;
        background-color: $color-primary;
        transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;

        @when plain {
          border:1px solid $color-primary;
          background-color: $button-write-color;
          color: $color-primary;
        }
      }
      @modifier danger{
        color: $button-write-color;
        background-color: $color-error;

        /* plain 也就是幽灵按钮，把主题色设置为字体和边框颜色。背景色为白色 */
        @when plain {
          border: 1px solid $color-error;
          background-color: $button-write-color;
          color: $color-error;
        }
      }
      @modifier success{
        color: $button-write-color;
        background-color: $color-success;

        @when plain {
          border: 1px solid $color-success;
          background-color: $button-write-color;
          color: $color-success;
        }
      }
      @modifier warning{
        color: $button-write-color;
        background-color: $color-warning;

        @when plain {
          border: 1px solid $color-warning;
          background-color: $button-write-color;
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
        padding: 6px 10px;
        height: 51px;
      }
      @modifier block {
        width: 100%;
        display: block;
      }

      /* 禁用 */
      @when disabled {
        opacity: .4;
      }


    }
  }

</style>
