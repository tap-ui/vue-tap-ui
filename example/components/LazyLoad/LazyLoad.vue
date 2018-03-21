<template lang="html">
  <div class="">
    这是懒加载
    <ul>
      <img src="" alt="b" v-lazy='src'>
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
      <li>向下滚动↓</li>
      <li>向下滚动↓</li>
      <div class="bg" v-lazy:background='bgsrc'>
        背景图片
      </div>
      <li>向下滚动↓</li>
      <li>向下滚动↓</li>
      <li>向下滚动↓</li>
      <li>向下滚动↓</li>

    </ul>
    <img alt="a" v-lazy='src2'>
    <img alt="a" v-lazy='src3'>
    <img src="" v-lazy="src4">
  </div>

</template>

<script>
export default {
  data() {
    return {
      src:'http://m.360buyimg.com/mobilecms/s307x307_jfs/t10801/248/1736247611/118169/f639d154/59f2fb9cNa2efcd7a.jpg!q70.jpg',
      src2: 'http://img1.360buyimg.com/n6/jfs/t277/193/1005339798/768456/29136988/542d0798N19d42ce3.jpg',
      src3: 'http://img1.360buyimg.com/n6/jfs/t12799/137/845945755/154462/3fe2ff73/5a51e7dcNa887eb0e.jpg',
      src4: 'http://img1.360buyimg.com/n6/jfs/t13843/221/1774845413/76503/a26f7740/5a51ea83N9385a146.jpg',
      bgsrc: 'http://img1.360buyimg.com/n6/jfs/t8107/37/1359438185/72159/a6129e26/59b857f8N977f476c.jpg'
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
