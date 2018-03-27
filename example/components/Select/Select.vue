<template lang="html">
  <section id='select'>
    触摸选择器
    <p>地区</p>


    <tap-select class="select">
      <option>广州</option>
      <option>深圳</option>
      <option>上海</option>
      <option>北京</option>
      <option>南京</option>
    </tap-select>

    <tap-select class="select">
      <option>花都</option>
      <option>天河</option>
      <option>越秀</option>
      <option>从化</option>
      <option>黄埔</option>
    </tap-select>

    <tap-select class="select">
      <option>兴化</option>
      <option>狮岭</option>
      <option>新华</option>
      <option>体面</option>
    </tap-select>
  </section>

</template>

<script>
export default {

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
