<template lang="html">
  <section>
    <h1>值</h1>
    <tap-select2 v-model='value1'>
      <tap-select2-option value='v1'>Vue1</tap-select2-option>
      <tap-select2-option value='v2'>Vue2</tap-select2-option>
      <tap-select2-option value='v3'>Vue3</tap-select2-option>
    </tap-select2>
    <div class="show">
      <p>label：{{value1.label}}</p>
      <p>value：{{value1.value}}</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      value1: ''
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
