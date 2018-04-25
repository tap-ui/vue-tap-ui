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
      default: 18,
      type: Number
    },
    type: {
      type: String,
      default: 'primary',
      validator(value) {
        return [
          'default',
          'error',
          'primary',
          'success',
          'warning'
        ].indexOf(value) > -1
      }
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
