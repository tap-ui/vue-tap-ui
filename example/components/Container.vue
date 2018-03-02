<template>
  <ul class="container">
    <router-link to="/button" tag="li">按钮 Button</router-link>
    <router-link to="/button" tag="li">按钮 Button</router-link>
    <router-link to="/button" tag="li">按钮 Button</router-link>
  </ul>
</template>

<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>

<style lang="css">
  .container {
    li{
      list-style: none;
      border-bottom: 1px solid #eee;
      height: 40px;
      line-height: 40px;
    }
  }

</style>
