<template>
  <div class="page">
    <section>
      <tap-button @click="showText" size='block' style="margin: 5px 0">文字提示</tap-button>
    </section>
    <section>
      <tap-button @click="showIcon(0)">成功提示</tap-button>
      <tap-button @click="showIcon(1)">失败提示</tap-button>
    </section>
    <section>
      <tap-button @click="showLoading(false)" size='block' style="margin: 5px 0">loading</tap-button>
    </section>
    <section>
      <tap-button @click="showLoading(true)" size='block' style="margin: 5px 0">loading 带 mask</tap-button>
    </section>
  </div>
</template>

<script>
export default {
  mounted () {
    // console.log(this.$toast.loading);
    // console.log(this.$toast.loading('加载中'));
    // this.$toast('你好')
    // this.$toast({
    //   message: '你好1111111111111112111'
    // })
  },
  methods: {
    showText () {
      this.$toast('提示最好不要超过15字哟~')
    },
    showIcon (type) {
      if (type == 0) {
        this.$toast.success('成功提示')
      } else {
        this.$toast.fail('失败提示')
      }
    },
    showLoading (type) {
      console.log(type);
      if (!type) {
        this.$toast.loading('加载中')
      } else {
        this.$toast.loading({
          mask: true,
          message: '加载中',
        })
      }
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
