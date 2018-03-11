<template>
  <ul class="container">
    <router-link v-for="router in routerConf" :to="router.path" :key="router.path" tag="li">{{`${router.name} ${_valueToName(router.name)}`}}</router-link>
  </ul>
</template>

<script>
  import { valueToName } from '../common/utils/utils.js';
  import routerConf from '../router/config.js'
  export default {
    data() {
      return {
        routerConf: ''
      }
    },
    methods: {
      _valueToName(value) {
        return valueToName(value);
      }
    },
    created() {
      this.routerConf = routerConf;
      delete this.routerConf['container'];
      // console.log(this.routerConf)
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
