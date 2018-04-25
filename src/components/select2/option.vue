<template lang="html">
  <option :class="{'tap-select-option-active':isActive}">
    <slot></slot>
  </option>
</template>

<script>
export default {
  name: 'tap-select2-option',
  props: {
    isActive: ''
  }
}
</script>

<style lang="css">
    @import '../../common/style/variable.css';
    .tap-select-option-active {
        transition: all .3s;
        font-size: 18px;
        color: $color-primary;
    }
</style>
