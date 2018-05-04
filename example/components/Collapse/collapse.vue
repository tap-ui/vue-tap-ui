<template lang="html">
  <div class="collapse-demo-wrap" >
    <section class="callapse-wrap">
      <h2>基础用法</h2>
      <tap-collapse v-model="value">
        <tap-panel>
          TapUI
          <div slot="content" class="">
            TapUI是基于Vue2.X开发的移动端UI组件库，由广州2个还未毕业的学生，于2018年2月份开始，利用业余时间打造，CSS使用PostCSS开发，基于BEM命名语法
          </div>
        </tap-panel>
        <tap-panel>
          React
          <div slot="content" class="">
            React 是一个用于构建用户界面的 JAVASCRIPT 库。

            React主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。

            React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。

            React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。
          </div>
        </tap-panel>
        <tap-panel>
          Vue
          <div slot="content" class="">
              Vue是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。
          </div>
        </tap-panel>
      </tap-collapse>
    </section>


    <section class="callapse-wrap">
      <h2>手风琴模式</h2>
      <tap-collapse v-model="value2" accordion>
        <tap-panel>
          TapUI
          <div slot="content" class="">
            TapUI是基于Vue2.X开发的移动端UI组件库，由广州2个还未毕业的学生，于2018年2月份开始，利用业余时间打造，CSS使用PostCSS开发，基于BEM命名语法
          </div>
        </tap-panel>
        <tap-panel>
          React
          <div slot="content" class="">
            React 是一个用于构建用户界面的 JAVASCRIPT 库。

            React主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。

            React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。

            React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。
          </div>
        </tap-panel>
        <tap-panel>
          Vue
          <div slot="content" class="">
              Vue是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。
          </div>
        </tap-panel>
      </tap-collapse>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: "2",
      value2: [1]
    }
  }
}
</script>

<style lang="css">


.collapse-demo-wrap {
    section {
      margin-top: 20px;
    }

    h3 {
      line-height: 50px;
      height: 50px;
      padding-left: 20px;
    }
}
</style>
