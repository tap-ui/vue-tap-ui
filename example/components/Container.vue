<template>
  <ul class="container">
    <router-link :to="routerConf.button.path" tag="li">按钮 Button</router-link>
  </ul>
</template>

<script>
  import routerConf from '../router/config.js'
  export default {
    data() {
      return {
        routerConf: ''
      }
    },
    created() {
      this.routerConf = routerConf
      console.log(this.routerConf)
    },
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
