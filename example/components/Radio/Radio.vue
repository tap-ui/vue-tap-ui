<template lang="html">
  <div class="">
    <section>
      <tap-radio-group v-model='val1' name='xxq'>
        <tap-radio :value='1'>vue</tap-radio>
        <tap-radio :value='2'>react</tap-radio></tap-radio>
      </tap-radio-group>
      值：{{val1}}
    </section>
    <section>
      <tap-radio-group v-model='val2' name='xxx' type='error'>
        <tap-radio value='1'>vue</tap-radio>
        <tap-radio value='2'>react</tap-radio></tap-radio>
      </tap-radio-group>
      {{val2}}
    </section>
    <section>
      <tap-radio-group v-model='val3' name='xx2x' type='warning'>
        <tap-radio value='1'>vue</tap-radio>
        <tap-radio value='2'>react</tap-radio></tap-radio>
      </tap-radio-group>
      {{val3}}
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val1: 1,
      val2: '',
      val3: ''
    }
  }
}
</script>

<style lang="css" scoped>
  section{
    margin: 20px;
    label {
      margin: 10px;
    }
  }
</style>
