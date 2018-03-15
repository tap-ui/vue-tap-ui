<template>
  <div id="app">
    <header class="demo-header" v-show="$route.name !== 'Header'">

      <div class="list" v-if="$route.name =='Container'">
        <i>
          <img src="./assets/tap.png" class="logo">
        </i>
        <h1>tap-ui</h1>
      </div>
      <div class="detail" v-else>
        <i class="iconfont icon-back back" @click="back" ></i>
        <h1>{{title}}</h1>
      </div>
    </header>

    <router-view/>
  </div>
</template>
<script>
import { valueToName } from './common/utils/utils.js';

export default {
  name: 'App',
  data() {
    return {
      title: ''
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    _setTitle() {
      const { name } = this.$router.history.current;
      if (name !== 'container') {
        this.title = valueToName(name)
        document.title = name;
      }
    }
  },
  mounted() {
    this._setTitle();
  },
  watch: {
    //根据路由参数，动态改变例子组件的title
    '$route'(router) {
        this._setTitle();
    }
  }
}
</script>

<style>
  @reset-global mobile;
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .demo-header{
    display: flex;
    justify-content: center;
    background: #eee;
    box-shadow:0 15px 10px -12px rgba(0,0,0,.22),0 -15px 10px -10px rgba(0,0,0,.22);
    border-bottom: 1px solid rgba(0,0,0,.12);
    height: 40px;
    .list{
      display: flex;
      .logo {
        width: 30px;
        margin: 5px
      }
      h1{
        vertical-align: middle;
        display: inline-block;
        font-size: 20px;
      }
    }
    .detail{
      .back {
        display: block;
        font-size: 30px;
        font-weight: bold;
        position: absolute 5px * * 20px;
      }
      h1{
        font-size: 20px;
      }
    }

  }
}




</style>
