<template lang="html">
  <div class="">
    这是懒加载
    <img src="../../assets/logo.png" alt="a" v-lazy='src'>
  </div>
</template>

<script>
export default {
  data(){
    return {
      src: '../../assets/logo.png'
    }
  }
}
</script>

<style lang="css">
</style>
