<template lang="html">
  <div>
    <section>
      <h1>基本使用</h1>
      <tap-checkbox-group v-model='v1'>
        <tap-checkbox value='周杰伦'>周杰伦</tap-checkbox>
        <tap-checkbox value='邓紫棋'>邓紫棋</tap-checkbox>
        <tap-checkbox value='周华健'>周华健</tap-checkbox>
      </tap-checkbox-group>
      <aside>{{v1}}</aside>
    </section>
    <section>
      <h1>主题</h1>
      <tap-checkbox-group v-model='v2'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' type='error'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' type='warning'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' type='black'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' type='success'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
    </section>
    <section>
      <h1>禁用</h1>
      <aside>全组禁用</aside>
      <tap-checkbox-group v-model='v2' disabled>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v3' icon='selectd' disabled>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <aside>单个禁用</aside>
      <tap-checkbox-group v-model='v4'>
        <tap-checkbox :value='1' disabled>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
    </section>
    <section>
      <h1>可自定义内容</h1>
      <tap-checkbox-group v-model='v4'>
        <tap-checkbox :value='1'><i class="iconfont icon-vuejs"></i>Vue</tap-checkbox>
        <tap-checkbox :value='2'><i class="iconfont icon-react"></i>React</tap-checkbox>
      </tap-checkbox-group>
    </section>
    <section>
      <h1>大小</h1>
      <aside>small,normal,large3个选项</aside>
      <tap-checkbox-group v-model='v2' size='small'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' size='normal'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' size='large'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <aside>自定义大小</aside>
      <tap-checkbox-group v-model='v2' :size='50'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
    </section>
    <section>
      <h1>icon</h1>
      <tap-checkbox-group v-model='v2' icon='selectd'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='close'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='add'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='delete'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='subtract'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='dollar'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='star'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='success'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='wrong'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='smile'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='cry'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='info'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='forbidden'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='bad'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='good'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='cart'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='download'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='help'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='like'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
      <tap-checkbox-group v-model='v2' icon='hot'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
    </section>
    <section>
      <h1>事件</h1>
      <tap-checkbox-group v-model='v5' @change='change'>
        <tap-checkbox :value='1'>选项1</tap-checkbox>
        <tap-checkbox :value='2'>选项2</tap-checkbox>
        <tap-checkbox :value='3'>选项3</tap-checkbox>
      </tap-checkbox-group>
    </section>

  </div>
</template>

<script>
export default {
  data() {
    return {
      v1: ['周杰伦'],
      v2: [1],
      v3: [1],
      v4: [1],
      v5: [1]
    }
  },
  methods: {
    change(value) {
      console.log(value);
    }
  }
}
</script>

<style lang="css">
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
