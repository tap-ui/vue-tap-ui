<template lang="html">
  <div class="tap-checkboxGroup" :class="{'is-disabled': disabled}">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tap-checkbox-group',
  props: {
    value: {
      type: Array,
      default: []
    },
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
  @component checkboxGroup {
  }
}
</style>
