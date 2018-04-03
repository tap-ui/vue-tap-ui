<template lang="html">
  <div class="">
    <section>
      <h1>值</h1>
      <tap-select class="select" v-model='value1'>
        <option v-for='item in options' :value="item.value">{{item.label}}</option>
      </tap-select>
      <div>
        <p>label：{{value1.label}}</p>
        <p>value：{{value1.value}}</p>
      </div>
      <tap-select class="select" v-model='value2'>
        <option :value='1'>Vue</option>
        <option :value='2'>React</option>
        <option :value='3'>Angular</option>
        <option :value='4'>Webpack</option>
        <option :value='1'>Vue</option>
        <option :value='2'>React</option>
        <option :value='3'>Angular</option>
        <option :value='4'>Webpack</option>
        <option :value='1'>Vue</option>
        <option :value='2'>React</option>
        <option :value='3'>Angular</option>
        <option :value='4'>Webpack</option>
        <option :value='1'>Vue</option>
        <option :value='2'>React</option>
        <option :value='3'>Angular</option>
        <option :value='4'>Webpack</option>
        <option :value='1'>Vue</option>
        <option :value='2'>React</option>
        <option :value='3'>Angular</option>
        <option :value='4'>Webpack</option>
        <option :value='1'>Vue</option>
        <option :value='2'>React</option>
        <option :value='3'>Angular</option>
        <option :value='4'>Webpack</option>
        <option :value='1'>Vue</option>
        <option :value='2'>React</option>
        <option :value='3'>Angular</option>
        <option :value='4'>Webpack</option>
        <option :value='1'>Vue</option>
        <option :value='2'>React</option>
        <option :value='3'>Angular</option>
        <option :value='4'>Webpack</option>
      </tap-select>
      <div>
        <p>label：{{value2.label}}</p>
        <p>value：{{value2.value}}</p>
      </div>
    </section>
    <section>

      <h1>居中 align：center</h1>
      <tap-select class="select" align='center'>
        <option :value='1'>花都</option>
        <option :value='2'>天河</option>
        <option :value='3'>越秀</option>
        <option :value='4'>从化</option>
        <option :value='5'>黄埔</option>
      </tap-select>
    </section>
  </div>



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
      value1: '',
      value2: '',
      align: 'center'
    }
  }
}
</script>

<style lang="css" scoped>
section{

  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  padding: 5px;
  h1{
    /*border-bottom: 1px solid #eee;*/
    text-align: left;
    font-weight: bold;
    text-indent: 10px;
    font-size: 18px;
  }
  button{
    margin:5px;
  }
}

</style>
