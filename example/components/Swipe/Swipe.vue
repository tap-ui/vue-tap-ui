<template lang="html">
  <div >
    <section>
      <h2>自动播放</h2>
      <tap-swipe :autoplay="3000" >
        <tap-swipe-item class="slide1">1</tap-swipe-item>
        <tap-swipe-item class="slide2">2</tap-swipe-item>
        <tap-swipe-item class="slide3">3</tap-swipe-item>
      </tap-swipe>
    </section>

    <section>
      <h2>自动播放不带指标</h2>
      <tap-swipe :autoplay="3000" :showIndicators="false">
        <tap-swipe-item class="slide1">1</tap-swipe-item>
        <tap-swipe-item class="slide2">2</tap-swipe-item>
        <tap-swipe-item class="slide3">3</tap-swipe-item>
      </tap-swipe>
    </section>

    <section>
      <h2>不自动播放 并且初始页面为第二张</h2>
      <tap-swipe :autoplay="0" :initialSwipe="2">
        <tap-swipe-item class="slide1">1</tap-swipe-item>
        <tap-swipe-item class="slide2">2</tap-swipe-item>
        <tap-swipe-item class="slide3">3</tap-swipe-item>
      </tap-swipe>
    </section>
  </div>
</template>

<script>

export default {
  methods: {
    handleTransitionend(index) {
      console.log(index);
    }
  }
}
</script>

<style lang="css" scoped>
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
