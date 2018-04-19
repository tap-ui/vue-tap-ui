<template lang="html">
  <section class="tap-tab-pane" v-if='isVis'>
      <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'tap-tab-pane',
  data() {
    return {
      isVis: true
    }
  },
  props: {
    label: {
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: '',
  },
  watch: {
    label() {
      this.updateNav();
    }
  },
  updated() {
    this.updateNav();
  },
  mounted() {
    this.updateNav();
    this.$nextTick(() => {})
  },
  methods: {
    updateNav() {
      this.$parent.updateNav();
    },
    emit(option) {
      this.$emit('labelHandler', option)
    }
  }
}
</script>

<style lang="css">
  @component-namespace tap {
    @component tab {
      @descendent item {
        /* display:none; */
      }
    }
  }
</style>
