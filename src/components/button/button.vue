<template>
  <button
    :type="type"
    class="tap-button"
    :class="['tap-button--'+ type, 'tap-button--'+size, {
      'is-disable':disable
    }]"
    @click="handleClick"
  >
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
      type:{
        default:'default',
        validator(value) {
          return [
            'default',
            'danger',
            'primary'
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
          ]
        }
      },
      disable: {
        default: false
      }
    }
  }
</script>

<style scoped >
	@import '../../style/variable.css';

  @component-namespace tap {
    @component button {
      appearance: none;
      border-radius: 4px;
      border: 0;
      box-sizing: border-box;
      color: inherit;
      display: block;
      font-size: 18px;
      height: 41px;
      outline: 0;
      overflow: hidden;
      position: relative;
      text-align: center;

      /* 主题 */

      @modifier default {
        color: $button-default-color;
        background-color: $button-default-background-color;
        box-shadow: $button-default-box-shadow;
      }
      @modifier primary {
        color: $button-write-color;
        background-color: $button-primary-background-color;
      }
      @modifier danger{
        color: $button-write-color;
        background-color: $button-danger-background-color;
      }
      @modifier success{
        color: $button-write-color;
        background-color: $button-success-backrgound-color;
      }
      @modifier warning{
        color: $button-write-color;
        background-color: $button-warning-backrgound-color;
      }

      /* 尺寸 */
      @modifier small {
        width: 50px;
        fong-size: 14px;
      }
      @modifier block {
        width: 100%;
        display: block;
      }
      @modifier normal {
        width: 100px;

        padding: 0 12px;
      }
    }




  }

</style>
