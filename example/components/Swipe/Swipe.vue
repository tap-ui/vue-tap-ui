<template lang="html">
  <div >
    <tap-swipe :autoplay="3000">
      <tap-swipe-item class="slide1">1</tap-swipe-item>
      <tap-swipe-item class="slide2">2</tap-swipe-item>
      <tap-swipe-item class="slide3">3</tap-swipe-item>
    </tap-swipe>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="css">
@component-namespace page {
  @component swipe {
    text-align: center;
    color: #666;
    margin-bottom: 5px;
  }
  .tap-swipe {
    height: 200px;
    color:#fff;
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
  }

    .tap-swipe-item {
      color: #fff;
      min-height: 200px;
      text-align: center;
      font-size: 20px;
      line-height: 200px;
    }
    .slide1 {
    background-color: #0089dc;
    color: #fff;
    }

    .slide2 {
      background-color: #ffd705;
      color: #000;
    }

    .slide3 {
      background-color: #ff2d4b;
      color: #fff;
    }
}
</style>
