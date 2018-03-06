<template>
  <div>
    <section>
      <h1>主题</h1>
      <tap-button>default</tap-button>
      <tap-button type="primary">primary</tap-button>
      <tap-button type="danger">danger</tap-button>
      <tap-button type="success">success</tap-button>
      <tap-button type="warning">warning</tap-button>
    </section>
    <section>
      <h1>尺寸</h1>
      <tap-button size='small'>small</tap-button>
      <tap-button size='large'>large</tap-button>
      <tap-button size='block'>block</tap-button>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>

<style lang="css">
  section{
    border-bottom: 1px solid #eee;
    h1{
      border-bottom: 1px solid #eee;
    }
    button{
      margin:10px auto;

    }
  }
</style>
