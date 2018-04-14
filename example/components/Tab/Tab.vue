<template lang="html">
  <div>
    <section>
      <h1>正常操作</h1>
      <tap-tab>
        <tap-tab-item title='标题1'>内容1</tap-tab-item>
        <tap-tab-item title='标题2' value='v2'>内容2</tap-tab-item>
        <tap-tab-item title='标题3' value='v3'>内容3</tap-tab-item>
        <tap-tab-item title='标题4' value='v4'>内容4</tap-tab-item>
      </tap-tab>
    </section>
    <section>
      <h1>滑动布局</h1>
      <tap-tab @titleHandler='handler'>
        <tap-tab-item title='标题1'>内容1</tap-tab-item>
        <tap-tab-item title='标题2' value='v2'>内容2</tap-tab-item>
        <tap-tab-item title='标题3' value='v3'>内容3</tap-tab-item>
        <tap-tab-item title='标题4' value='v4'>内容4</tap-tab-item>
        <tap-tab-item title='标题5' value='v3'>内容5</tap-tab-item>
        <tap-tab-item title='标题6' value='v4'>内容6</tap-tab-item>
      </tap-tab>
    </section>
    <section>
      <h1>自定义标签</h1>
      <tap-tab>
        <template slot='customTitle'>
          <div class="item1">
            <img src="../../assets/tap.png" alt="">
            Vue
          </div>
          <div>React</div>
          <div>Angular</div>

        </template>
        <tap-tab-item >内容1</tap-tab-item>
        <tap-tab-item title='xxx'>内容2</tap-tab-item>
        <tap-tab-item>内容3</tap-tab-item>

      </tap-tab>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    handler(options) {
      // console.log(options);
    }
  }
}
</script>

<style lang="css" scoped>
  section{

    margin-bottom: 10px;
    padding: 5px;
    h1{
      /*border-bottom: 1px solid #eee;*/
      text-align: left;
      font-weight: bold;
      text-indent: 10px;
      font-size: 18px;
    }
    .item1{
      img{
        vertical-align:middle;
        border-radius: 50%;
        /* background-position: center; */
        width: 30px;
      }
    }
  }
</style>
