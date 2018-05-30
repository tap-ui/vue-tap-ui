<template lang="html">
  <div class="tap-radioGroup" :class="{'is-disabled': disabled}">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tap-radio-group',
  props: {
    value: null,
    name: null,
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      default: 'normal',
      type: [Number, String],
      validator(value) {
        if (typeof value == 'number') return true; //如果为数字
        return [ //如果是字符串
          'small',
          'large',
          'normal'
        ].indexOf(value) > -1
      }
    },
    type: {
      type: String,
      default: 'primary',
      validator(value) {
        return [
          'black',
          'error',
          'primary',
          'success',
          'warning'
        ].indexOf(value) > -1
      }
    },
    icon: {
      type: String,
      default: 'none'
    }
  },
  watch: {
    value: function(value) {
      this.$emit('change', value)
    }
  },
  methods: {

  }

}
</script>

<style lang="css">
@import '../../common/style/variable.css';
@component-namespace tap {
  @component radioGroup {

    /* &>label + label{
      border: 1px solid red;
    } */
    /* @when disabled {
      & input:checked +span{
        border: 1px solid $color-disabled;
      }
      & .tap-radio-icon {
          background-color: $color-background;
          &:after{
            background-color:$color-disabled;
          }
      }
    } */
  }
}
</style>
