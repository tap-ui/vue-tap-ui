<template lang="html">
  <section class="">
      <h2>img标签</h2>
      <img v-for='src in srclist' v-lazy='src'>
      <h2>
          背景图片
      </h2>
      <div v-for='src in bglist' v-lazy:background='src'>

      </div>
  </section>

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

<style lang="css">

  section{
    background-color: #eee;

    img{
      width: 90%;
      box-sizing: content-box;
      margin: 20px 10px;
      box-shadow: 0 1px 3px rgba(0,0,0,.2);
    }
    div{
      width: 90%;
      height: 12rem;
      margin: 20px 10px;
      background-size: cover;
    }
  }
</style>
