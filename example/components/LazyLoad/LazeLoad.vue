<template lang="html">
  <div class="">
    这是懒加载
    <ul>
      <li>11</li>
        <li>11</li>
          <li>11</li>
            <li>11</li>
              <li>11</li>
                <li>11</li>
                  <li>11</li>
                    <li>11</li>
                      <li>11</li>
                        <li>11</li>
                          <li>11</li>
                            <li>11</li>
                              <li>11</li>
                                <li>11</li>
                                  <li>11</li>
                                  <li>11</li>
                                <li>11</li>
    </ul>
    <img alt="a" v-lazy='src'>
    <img src="" alt="b" v-lazy='src2'>
    <img src="" alt="c" v-lazy="'https://www.dzkandian.com/images/m-1.png'">
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: require('../../assets/logo.png'),
      src2: require('../../assets/tap.png'),
      // src: '../../as'
    }
  }
}
</script>

<style lang="css">
  ul{
    li{
      height: 60px
    }
  }
</style>
