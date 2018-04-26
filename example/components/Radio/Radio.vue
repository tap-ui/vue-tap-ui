<template lang="html">
  <div class="">
    <section>
      <h1>主题</h1>
      <aside>
        默认:primary
      </aside>
      <tap-radio-group v-model='val1'>
        <tap-radio :value='1'>单选1</tap-radio>
        <tap-radio :value='2'>单选2</tap-radio>
      </tap-radio-group>
      <aside>error</aside>
      <tap-radio-group v-model='val2' type='error'>
        <tap-radio value='1'>单选1</tap-radio>
        <tap-radio value='2'>单选2</tap-radio>
      </tap-radio-group>
        <aside>warning</aside>
      <tap-radio-group v-model='val3' type='warning'>
        <tap-radio value='1'>单选1</tap-radio>
        <tap-radio value='2'>单选2</tap-radio>
      </tap-radio-group>
      <aside class="">
        black
      </aside>
      <tap-radio-group v-model='val4'  type='black'>
        <tap-radio value='1'>单选1</tap-radio>
        <tap-radio value='2'>单选2</tap-radio>
      </tap-radio-group>
      <aside class="">
        success
      </aside>
      <tap-radio-group v-model='val5'  type='success'>
        <tap-radio value='1'>单选1</tap-radio>
        <tap-radio value='2'>单选2</tap-radio>
      </tap-radio-group>
    </section>
    <section>
      <h1>禁用</h1>
      <aside class="">
        全组禁用
      </aside>
      <tap-radio-group v-model='val6' disabled >
        <tap-radio :value='1'>单选1</tap-radio>
        <tap-radio :value='2'>单选2</tap-radio>
      </tap-radio-group>
      <tap-radio-group v-model='val8' disabled icon='selectd'>
        <tap-radio :value='1'>单选1</tap-radio>
        <tap-radio :value='2'>单选2</tap-radio>
      </tap-radio-group>
      <aside>单个禁用</aside>
      <tap-radio-group v-model='val7' >
        <tap-radio :value='1' disabled>单选1</tap-radio>
        <tap-radio :value='2'>单选2</tap-radio>
      </tap-radio-group>

    </section>
    <section>
      <h1>自定义</h1>
      <tap-radio-group v-model='val9' >
        <tap-radio :value='1'><i class="iconfont icon-vuejs"></i>Vue</tap-radio>
        <tap-radio :value='2'><i class="iconfont icon-react"></i>React</tap-radio>
      </tap-radio-group>
      <tap-radio-group v-model='val10' >
        <tap-radio :value='1'>单选1</tap-radio>
        <tap-radio :value='2'>单选2</tap-radio>
      </tap-radio-group>
      <tap-radio-group  v-model='val11'>
        <tap-radio :value='1'>单选1</tap-radio>
        <tap-radio :value='2'>单选2</tap-radio>
      </tap-radio-group>
    </section>
    <section>
      <h1>icon</h1>
      <tap-radio-group v-model='val9' icon='selectd'>
        <tap-radio :value='1'>单选1</tap-radio>
        <tap-radio :value='2'>单选2</tap-radio>
      </tap-radio-group>
      <tap-radio-group v-model='val10' icon='close'>
        <tap-radio :value='1'>单选1</tap-radio>
        <tap-radio :value='2'>单选2</tap-radio>
      </tap-radio-group>
      <tap-radio-group  v-model='val11' icon='add'>
        <tap-radio :value='1'>单选1</tap-radio>
        <tap-radio :value='2'>单选2</tap-radio>
      </tap-radio-group>
    </section>
    <section>

    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val1: 1,
      val2: 1,
      val3: 1,
      val4: 1,
      val5: 1,
      val6: 1,
      val7: 1,
      val8: 1,
      val9: 1,
      val10: 1,
      val11: 1
    }
  }
}
</script>

<style lang="css" scoped>

  section{
    margin: 20px;
    aside{
      color: #80848f;
    }
    h1{
      text-align: left;
      font-weight: bold;
      text-indent: 10px;
      font-size: 18px;
    }
    &> div {
      margin: 10px;
    }
  }
</style>
