<template lang="html">
  <div class="">
    <p class="intro">ps：由于使用移动端触摸事件，在pc端浏览器,请使用手机模拟器查看效果</p>
    <section>
      <h1>值</h1>
      <tap-select class="select" v-model='value1'>
        <option v-for='item in options' :value="item.value">{{item.label}}</option>
      </tap-select>
      <div class="show">
        <p>label：{{value1.label}}</p>
        <p>value：{{value1.value}}</p>
      </div>

    </section>
    <section>
      <h1>长列表停留</h1>
      <p class="intro">stayNumber: default 8</p>
      <p class="intro">默认选项超过8个，touchend时不会自动隐藏选项列表，需要点击下方确认按钮</p>
        <tap-select class="select" v-model='value2' title='长列表，不会自动隐藏'>
          <option :value='1'>Vue</option>
          <option :value='2'>React</option>
          <option :value='3'>Angular</option>
          <option :value='4'>Webpack</option>
          <option :value='1'>Parcel</option>
          <option :value='2'>PWA</option>
          <option :value='3'>Express</option>
          <option :value='4'>Koa2</option>
        </tap-select>
        <div>
          <div class="show">
            <p>label：{{value2.label}}</p>
            <p>value：{{value2.value}}</p>
          </div>
        </div>
    </section>
    <section>
      <h1>居中</h1>
      <p class="intro"> align：default left / center </p>
      <tap-select class="select" align='center'>
        <option :value='1'>花都</option>
        <option :value='2'>天河</option>
        <option :value='3'>越秀</option>
        <option :value='4'>从化</option>
        <option :value='5'>黄埔</option>
      </tap-select>
    </section>
    <section>
      <h1>title</h1>
      <p class="intro">title: String</p>
      <tap-select title='这是title' :stayNumber=0>
        <option :value="1">请看title</option>
      </tap-select>
    </section>
    <section>
      <h1>禁用</h1>
      <p class="intro">disabled：true</p>
      <tap-select disabled>
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
  margin-bottom: 20px;
  padding: 5px;
  h1{
    text-align: left;
    font-weight: bold;
    text-indent: 10px;
    font-size: 18px;
  }
  button{
    margin:5px;
  }
  .show{
      margin: 10px 0;
  }
}
.intro{
  padding: 5px;
  margin-bottom: 20px;
  text-align: left;
  line-height: 20px;
  color: #80848f;
}
</style>
