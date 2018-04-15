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
      <h1>禁用</h1>
      <tap-tab>
        <tap-tab-item title='标题1' @titleHandler='titleHandler'>内容1</tap-tab-item>
        <tap-tab-item title='标题2' value='v2' disabled>内容2</tap-tab-item>
        <tap-tab-item title='标题3' value='v3'>内容3</tap-tab-item>
      </tap-tab>
    </section>
    <section>
      <h1>自定义标签</h1>
      <tap-tab>
        <template slot='customTitle'>
          <div class="TapUI">
            <img src="../../assets/tap.png" alt="">
            TapUI
          </div>
          <div>
            未读消息
            <tap-badge>30</tap-badge>
          </div>
          <div class="vue">
            <img src="../../assets/logo.png" alt="">
            Vue
          </div>
        </template>
        <tap-tab-item>
          TapUI是基于Vue2.X开发的移动端UI组件库，由广州2个还未毕业的学生，于2018年2月份开始，利用业余时间打造，CSS使用PostCSS开发，基于BEM命名语法
        </tap-tab-item>

        <tap-tab-item>内容3</tap-tab-item>
        <tap-tab-item title='xxx'>
          Vue是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。
        </tap-tab-item>
      </tap-tab>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    handler(options) {
      console.log(options);
    },
    titleHandler(options) {
      console.log(options);
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
    .tap-tab-customTitle{

        img{
          vertical-align:middle;
          width: 30px;
        }


    }

  }
</style>
