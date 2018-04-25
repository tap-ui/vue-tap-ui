<template lang="html">
  <div class="">
    <section>
      <tap-radio-group v-model='val1'  :size='30'>
        <tap-radio :value='1'>vue</tap-radio>
        <tap-radio :value='2'>react</tap-radio>
      </tap-radio-group>
      值：{{val1}}
    </section>
    <section>
      <tap-radio-group v-model='val2' type='error'>
        <tap-radio value='1'>vue</tap-radio>
        <tap-radio value='2'>react</tap-radio>
      </tap-radio-group>
      {{val2}}
    </section>
    <section>
      <tap-radio-group v-model='val3' type='warning' disabled>
        <tap-radio value='1'>vue</tap-radio>
        <tap-radio value='2'>react</tap-radio>
      </tap-radio-group>
      {{val3}}
    </section>
    <section>
      <tap-radio-group v-model='val4'  type='default'>
        <tap-radio value='1'>vue</tap-radio>
        <tap-radio value='2' disabled>react</tap-radio>
        <tap-radio value='3'>angular</tap-radio>
      </tap-radio-group>
      {{val4}}
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val1: 1,
      val2: 2,
      val3: 1,
      val4: 1
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
