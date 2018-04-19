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
    <tap-button size='block'>block</tap-button>
  </section>
  <section>
    <h1> 幽灵按钮 </h1>
    <tap-button plain>幽灵按钮</tap-button>
    <tap-button plain type='primary'>primary</tap-button>
    <tap-button plain type='success'>success</tap-button>
    <tap-button plain type='danger'>danger</tap-button>
    <tap-button plain type='warning'>warning</tap-button>
  </section>
  <section>

  </section>
  <section>
    <h1> 外阴影 </h1>
    <tap-button shadow>外阴影</tap-button>
    <tap-button type='primary' shadow>primary</tap-button>
    <tap-button type='success' shadow>success</tap-button>
    <tap-button type='danger' shadow>danger</tap-button>
    <tap-button type='warning' shadow>warning</tap-button>
  </section>
  <section>
    <h1> 内阴影 </h1>
    <tap-button inset>内阴影</tap-button>
    <tap-button type='primary' inset>primary</tap-button>
    <tap-button type='success' inset>success</tap-button>
    <tap-button type='danger' inset>danger</tap-button>
    <tap-button type='warning' inset>warning</tap-button>
    <tap-button size='block' inset>Block</tap-button>
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

<style lang="css" scoped>
  section{
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    padding: 5px;
    h1{
      text-align: left;
      font-weight: bold;
      text-indent: 10px;
      font-size: 18px;
    }
    button{
      margin:10px 10px 10px *;
    }
  }
</style>
