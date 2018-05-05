<template lang="html">
  <div class="switch-wrap">
    <section class="switch-item">
      <tap-switch v-model="value1"></tap-switch>
      <span class="show_text">{{value1}}</span>
    </section>
    <section class="switch-item">
      <tap-switch v-model="value2"></tap-switch>
      <span class="show_text">{{value2}}</span>
    </section>
    <section class="switch-item2">
      <span class="show_text">选项 {{value3}}</span>
      <tap-switch v-model="value3"></tap-switch>
    </section>
    <section class="switch-item2">
      <span class="show_text">选项 {{value4}} 触发事件</span>
      <tap-switch v-model="value4" @change="onChange"></tap-switch>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: false,
      value2: true,
      value3: false,
      value4: true,
    }
  },

  methods: {
    onChange(value) {
      this.$toast(value)
    }
  }
}
</script>

<style lang="css">
.switch-wrap {
  .switch-item {
    display: flex;
    align-items: center;
    height: 50px;
    padding:0 10px;
    border-bottom: 1px solid #efefef;
    .show_text {
      margin-left: 20px;
    }
  }
  .switch-item2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding:0 10px;
    border-bottom: 1px solid #efefef;
  }
}
</style>
