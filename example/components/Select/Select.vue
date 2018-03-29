<template lang="html">
  <section id='select'>
    触摸选择器
    <p>地区</p>


    <tap-select class="select" v-model='value1'>
      <option v-for='item in options' :value="item.value">{{item.label}}</option>
    </tap-select>
    <div class="">
      值：{{value1.label}}
    </div>

    <tap-select class="select">
      <option :value='1'>花都</option>
      <option :value='2'>天河</option>
      <option :value='1'>越秀</option>
      <option :value='1'>从化</option>
      <option :value='1'>黄埔</option>
    </tap-select>

    <tap-select class="select">
      <option :value='1'>兴化</option>
      <option :value='1'>狮岭</option>
      <option :value='1'>新华</option>
      <option :value='1'>体面</option>
    </tap-select>
  </section>

</template>

<script>
export default {
  data() {
    return {
      options: [{
                value: '选项1',
                label: '黄金糕'
              }, {
                value: '选项2',
                label: '双皮奶'
              }, {
                value: '选项3',
                label: '蚵仔煎'
              }, {
                value: '选项4',
                label: '龙须面'
              }, {
                value: '选项5',
                label: '北京烤鸭'
              }],
      value1: ''
    }
  }
}
</script>

<style lang="css" scoped>
  #select{
    position: relative;
    .select{
      margin: 10px;
    }
  }

</style>
