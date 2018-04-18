<template>
  <div class="page">
    <section>
      <tap-button @click="showText" size='block' style="margin: 5px 0">文字提示</tap-button>
    </section>
    <section>
      <tap-button @click="showIcon('success')">成功提示</tap-button>
      <tap-button @click="showIcon('fail')">失败提示</tap-button>
    </section>
    <section>
      <tap-button @click="showLoading" size='block' style="margin: 5px 0">loading</tap-button>
    </section>
    <tap-toast message="成功提示~" type="success"></tap-toast>
    <!-- <tap-toast message="失败~" type="fail"></tap-toast> -->
    <!-- <tap-toast message="加载中..." type="loading"></tap-toast> -->
    <!-- <tap-toast message="建议文案不要超过15字~" ></tap-toast> -->
  </div>
</template>

<script>
export default {
  mounted () {
    // console.log(this.$toast.loading);
    console.log(this.$toast);
    this.$toast({
      message: '你好111111111111111111'
    })
  },
  methods: {
    showText () {

    },
    showIcon () {

    },
    showLoading () {

    }
  }
}
</script>

<style lang="css" scoped>

.page {
  height: 100vh;
  width: 100%;
  padding:200px 20px 0;
  box-sizing: border-box;

  section {
    margin-top: 20px;
  }

}
  @component-namespace page {

    min-height: 100vh;
    width: 100%;
  }
</style>
