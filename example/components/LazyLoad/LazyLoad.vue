<template lang="html">
  <div class="">
    这是懒加载
    <ul>
      <img src="" alt="b" v-lazy='src2'>
      <li>向下滚动↓</li>
      <li>向下滚动↓</li>
      <li>向下滚动↓</li>
      <div class="bg" v-lazy:background='bgsrc'>
        背景图片
      </div>
      <li>向下滚动↓</li>
      <li>向下滚动↓</li>
      <li>向下滚动↓</li>
      <li>向下滚动↓</li>
      <li>向下滚动↓</li>
      <li>向下滚动↓</li>
      <li>向下滚动↓</li>
      <li>向下滚动↓</li>
      <li>向下滚动↓</li>
      <li>向下滚动↓</li>
    </ul>
    <img alt="a" v-lazy='src'>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: require('../../assets/logo.png'),
      src2: require('../../assets/tap.png'),
      bgsrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521571317803&di=d1afe5774e03005dcb981bc2835dc2d8&imgtype=0&src=http%3A%2F%2Fwww.xz7.com%2Fup%2F2017-7%2F201771392324.png'
      // src: '../../as'
    }
  }
}
</script>

<style lang="css">
  ul{
    li{
      line-height: 60px;
      height: 60px
    }
    .bg{
      color: #fff;
      background-size: cover;
      height: 220px;
    }
  }
</style>
