<template>
  <div>
    <section>
      <h1>主题</h1>
      <tap-button>default</tap-button>
      <tap-button type="primary">primary</tap-button>
      <tap-button type="success">success</tap-button>
      <tap-button type="danger">danger</tap-button>
      <tap-button type="warning">warning</tap-button>
    </section>
    <section>
      <h1>尺寸</h1>
      <tap-button size='small'>small</tap-button>
      <tap-button>default</tap-button>
      <tap-button size='large'>large</tap-button>
      <tap-button size='block' style="margin: 5px 0">block</tap-button>
    </section>
    <section>
      <h1>
        幽灵按钮
      </h1>
      <tap-button plain>幽灵按钮</tap-button>
      <tap-button plain type='primary'>primary</tap-button>
      <tap-button plain type='success'>success</tap-button>
      <tap-button plain type='danger'>danger</tap-button>
      <tap-button plain type='warning'>warning</tap-button>
    </section>
    <section>
      <h1>禁用</h1>
      <tap-button disabled>default</tap-button>
      <tap-button type='primary' disabled>primary</tap-button>
      <tap-button type='success' disabled>success</tap-button>
      <tap-button type='danger' disabled>danger</tap-button>
      <tap-button type='warning' disabled>warning</tap-button>
    </section>
    <section>
      <h1>带图标的Button</h1>
      <tap-button icon='form'>表单</tap-button>
      <tap-button icon='back'>返回</tap-button>
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
      text-align: left;
      font-weight: bold;
      text-indent: 10px;
      font-size: 18px;
    }
    button{
      margin:10px;

    }
  }
</style>
