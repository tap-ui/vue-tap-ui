<template>

  <div class="page-header-main">
    <h1 class="title">{{$router.history.current.name}}</h1>
    <tap-header fixed title="固定在顶部"></tap-header>

    <tap-header title="标题过长后面会隐藏是这样吗？我试试" >
      <router-link to="/" slot="left">
        <tap-button icon="back">返回</tap-button>
      </router-link>
      <tap-button icon="more" slot="right"></tap-button>
    </tap-header>

    <tap-header title="左侧仅文字">
      <router-link to="/" slot="left">
        <tap-button >返回</tap-button>
      </router-link>
    </tap-header>

    <tap-header title="右侧仅文字">
      <tap-button slot="right">分享</tap-button>
    </tap-header>

    <tap-header title="仅图标">
      <router-link to="/" slot="left">
        <tap-button icon="back"></tap-button>
      </router-link>
      <tap-button icon="more" slot="right"></tap-button>
    </tap-header>
  </div>
</template>

<script>
export default {

}
</script>

<style>

@component-namespace page {
  @component header {
    @descendent main {
      margin-top: 15px;

      .title{
        font-size: 18px;
      }

      > * {
        margin-bottom: 15px;
      }
    }
  }
}

</style>
