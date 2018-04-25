<template lang="html">
  <div>
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tap-radio-group',
  props: {
    name: {},
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
      console.log(value);
      this.$emit('input', value)
    }
  },
  methods: {
    emit(v) {
      console.log(v);
      // console.log(this.$children);
      this.$emit('input', v)
    }
  }

}
</script>

<style lang="css">
@component-namespace tap {
  @component radioGroup {

  }
}
</style>
