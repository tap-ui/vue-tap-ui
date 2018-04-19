<template lang="html">
  <div>
    <section>
      <h1>基础用法</h1>
      <tap-tab>
        <tap-tab-pane label='标题1'>内容1</tap-tab-pane>
        <tap-tab-pane label='标题2'>内容2</tap-tab-pane>
        <tap-tab-pane label='标题3'>内容3</tap-tab-pane>
        <tap-tab-pane label='标题4'>内容4</tap-tab-pane>
      </tap-tab>
    </section>
    <section>
      <h1>滑动布局</h1>
      <tap-tab>
        <tap-tab-pane label='标题1'>内容1</tap-tab-pane>
        <tap-tab-pane label='标题2'>内容2</tap-tab-pane>
        <tap-tab-pane label='标题3'>内容3</tap-tab-pane>
        <tap-tab-pane label='标题4'>内容4</tap-tab-pane>
        <tap-tab-pane label='标题5'>内容5</tap-tab-pane>
        <tap-tab-pane label='标题6'>内容6</tap-tab-pane>
      </tap-tab>
    </section>
    <section>
      <h1>点击事件</h1>
      <p class="intro">请在 Console 控制台查看</p>
      <tap-tab @labelHandler='handler'>
        <tap-tab-pane label='标题1'>内容1</tap-tab-pane>
        <tap-tab-pane label='标题2'>内容2</tap-tab-pane>
        <tap-tab-pane label='标题3'>内容3</tap-tab-pane>
        <tap-tab-pane label='标题4'>内容4</tap-tab-pane>
      </tap-tab>
    </section>
    <section>
      <h1>
        禁用
        <tap-button @click='toggle' size='small'>点击切换</tap-button>
      </h1>
      <p class="intro">
        是否禁用： {{disabled}}
      </p>
      <tap-tab>
        <tap-tab-pane label='标题1'>内容1</tap-tab-pane>
        <tap-tab-pane label='标题2' :disabled='disabled'>内容2</tap-tab-pane>
        <tap-tab-pane label='标题3'>内容3</tap-tab-pane>
      </tap-tab>
    </section>
    <section>
      <!-- 自定义 -->
      <h1>自定义标签</h1>
      <tap-tab>
        <template slot='customLabel'>
          <div> <img src="../../assets/tap.png" alt=""> TapUI </div>
          <div> <i class="iconfont icon-react"> </i>React </div>
          <div> <img src="../../assets/logo.png" alt=""> Vue </div>
        </template>

        <tap-tab-pane>
          TapUI是基于Vue2.X开发的移动端UI组件库，由广州2个还未毕业的学生，于2018年2月份开始，利用业余时间打造，CSS使用PostCSS开发，基于BEM命名语法
        </tap-tab-pane>

        <tap-tab-pane>React</tap-tab-pane>
        <tap-tab-pane>
          Vue是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。
        </tap-tab-pane>
      </tap-tab>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: true
    }
  },
  methods: {
    handler(options) {
      console.log(options);
    },
    toggle() {
      this.disabled = !this.disabled
    }
  }
}
</script>

<style lang="css" scoped>
  section{
    margin-bottom: 40px;
    padding: 5px;
    h1{
      text-align: left;
      font-weight: bold;
      text-indent: 10px;
      font-size: 18px;
    }
    .intro {
      margin: 10px;
    }
    .tap-tab-customLabel{
        img{
          vertical-align:middle;
          width: 30px;
        }

        i{
          font-size: 30px;
          vertical-align:middle;
        }
    }

  }
</style>
