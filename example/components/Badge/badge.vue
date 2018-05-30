<template>
  <div class="content-wrap">
      <!-- <h1>演示</h1> -->
    <section>
      <tap-badge type="primary" size="large">30</tap-badge>
      <tap-badge type="error" size="large">10</tap-badge>
      <tap-badge type="success" size="large">10</tap-badge>
      <tap-badge type="warning" size="large">10</tap-badge>
    </section>
    <section>
      <tap-badge type="primary" size="normal">30</tap-badge>
      <tap-badge type="error" size="normal">10</tap-badge>
      <tap-badge type="success" size="normal">10</tap-badge>
      <tap-badge type="warning" size="normal">10</tap-badge>
    </section>
    <section>
      <tap-badge type="primary" size="small">30</tap-badge>
      <tap-badge type="error" size="small">10</tap-badge>
      <tap-badge type="success" size="small">10</tap-badge>
      <tap-badge type="warning" size="small">10</tap-badge>
    </section>
    <section>
      <tap-badge color="#9F79EE">自定义颜色</tap-badge>
    </section>
    <section class="cell">
      <div class="cell-left">
        徽章
      </div>
      <div class="cell-right">
          未读消息
         <tap-badge size="small" type="error">10</tap-badge>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
.content-wrap {
  margin-top: 10px;

  section {
    text-align: left;
    padding-left: 20px;
    box-sizing: border-box;
    h1 {
      padding: 5px 0;
      color: #555;
      text-align: left;
      text-indent: 10px;
      font-weight: bold;
      font-size: 18px;
      border-bottom: 1px solid #eee;
    }
    span {
      margin: 5px;
    }
  }

  .cell {
    display: flex;
    justify-content:space-between;
    align-items: center;
    margin-top: 10px;
    padding: 5px 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;

    .cell-left {

    }
  }
}
</style>
