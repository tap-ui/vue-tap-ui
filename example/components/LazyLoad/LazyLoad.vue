<template lang="html">
  <div class="container">
    <section>
      <h1>img标签</h1>
      <img v-for='src in srclist' v-lazy='src'>
    </section>
    <section>
      <h1>背景图片</h1>
      <div v-for='src in bglist' v-lazy:background='src'>

      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      srclist: [
        'https://photo.tuchong.com/952191/f/12138253.jpg',
        'https://photo.tuchong.com/952191/f/12138256.jpg',
        'https://photo.tuchong.com/952191/f/12138257.jpg',
        'https://photo.tuchong.com/952191/f/12138255.jpg'
      ],
      bglist: [
        'https://photo.tuchong.com/952191/f/12138260.jpg',
        'https://photo.tuchong.com/952191/f/12138273.jpg',
        'https://photo.tuchong.com/952191/f/12138276.jpg',
        'https://photo.tuchong.com/952191/f/12138259.jpg'
      ]

    }
  }
}
</script>

<style lang="css" scoped>
.container{
  background-color: #eee;
  section{
    margin-bottom: 20px;
    padding: 5px;
    h1{
      text-align: left;
      font-weight: bold;
      text-indent: 10px;
      font-size: 18px;
    }
    img{
      width: 100%;
      box-sizing: border-box;
      margin: 10px 0;
      box-shadow: 0 1px 3px rgba(0,0,0,.2);
    }
    div{
      width: 100%;
      height: 12rem;
      box-sizing: border-box;
      margin: 10px 0;
      background-size: cover;
    }
  }
}
</style>
