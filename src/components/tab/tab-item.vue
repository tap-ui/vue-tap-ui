<template lang="html">
  <section class="tap-tab-item">
    <div>
      <!-- {{title}} -->
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'tap-tab-item',
  data() {
    return {

    }
  },
  props: {
    title: {
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
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
    }
  }
}
</script>

<style lang="css">
  @component-namespace tap {
    @component tab {
      @descendent item {
        display:none;
      }
    }
  }
</style>
