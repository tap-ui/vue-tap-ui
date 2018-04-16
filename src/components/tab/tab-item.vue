<template lang="html">
  <section class="tap-tab-item" v-if='isVis'>
      <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'tap-tab-item',
  data() {
    return {
      isVis: true
    }
  },
  props: {
    title: {
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: '',
  },
  watch: {
    title() {
      this.updateNav();
    }
  },
  mounted() {
    this.updateNav();

  },
  methods: {
    updateNav() {
      this.$parent.updateNav();
    },
    emit(option) {
      this.$emit('titleHandler', option)
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
