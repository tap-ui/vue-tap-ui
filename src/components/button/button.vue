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
        default:'small'
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
    }
    @modifier default {

    }
  }

</style>
