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
    <!-- icon图标 -->
    <span class="mint-button-icon" v-if='icon'>
      <slot name='icon'>
        <i v-if='icon' class="iconfont" :class="'icon-'+  icon"></i>
      </slot>
    </span>

    <!-- 插槽 -->
    <slot></slot>
  </button>
</template>

<script>
/**
 * tap-button
 * @desc 按钮
 * @param {string} [type=default] - 显示类型，接受 default, primary, danger
 * @param {boolean} [disabled=false] - 禁用
 * @param {boolean} [plain=false] - 幽灵按钮
 * @param {string} [size=normal] - 尺寸，接受 normal, small, large
 * @param {string} [icon] - 图标，提供 more, back
 * @param {slot} - 显示文本
 * @param {slot} [icon] 显示图标
 *
 * @example
 * <tap-button size="large" icon="form" type="primary">按钮</tap-button>
 */

  export default {
    name: 'tap-button',
    methods: {
      handleClick(evt) {       //向父组件传递事件。告诉父组件我被点击了
        this.$emit('click', evt);
      }
    },
    props: {
      plain: Boolean,    // 是否扁平化
      disabled: Boolean, // 是否禁用
      icon: String,      // icon 图标
      type:{             //按钮主题
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
      size: {             //按钮尺寸
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

<style lang='css'>
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
      height: 41px;
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
        background-color: $button-primary-background-color;

        @when plain {
          border:1px solid $button-primary-background-color;
          background-color: $button-write-color;
          color: $button-primary-background-color;
        }
      }
      @modifier danger{
        color: $button-write-color;
        background-color: $button-danger-background-color;

        /* plain 也就是幽灵按钮，把主题色设置为字体和边框颜色。背景色为白色 */
        @when plain {
          border: 1px solid $button-danger-background-color;
          background-color: $button-write-color;
          color: $button-danger-background-color;
        }
      }
      @modifier success{
        color: $button-write-color;
        background-color: $button-success-backrgound-color;

        @when plain {
          border: 1px solid $button-success-backrgound-color;
          background-color: $button-write-color;
          color: $button-success-backrgound-color;
        }
      }
      @modifier warning{
        color: $button-write-color;
        background-color: $button-warning-backrgound-color;

        @when plain {
          border: 1px solid $button-warning-backrgound-color;
          background-color: $button-write-color;
          color: $button-warning-backrgound-color;
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
