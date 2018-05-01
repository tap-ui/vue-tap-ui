<template lang="html">
  <div class="collapse-demo-wrap" >
    <tap-collapse v-model="value">
      <tap-panel>
        这是标题1
        <div slot="content" class="">
          手风琴特效，当然也可以叫做侧栏菜单导航，集中了当今比较流行的竖向菜单导航， 既可以控制只展开一个，亦可以点击展开或者折叠
        </div>
      </tap-panel>
      <tap-panel>
        这是标题2
        <div slot="content" class="">
          手风琴特效，当然也可以叫做侧栏菜单导航，集中了当今比较流行的竖向菜单导航， 既可以控制只展开一个，亦可以点击展开或者折叠
        </div>
      </tap-panel>
      <tap-panel>
        这是标题3
        <div slot="content" class="">
          手风琴特效，当然也可以叫做侧栏菜单导航，集中了当今比较流行的竖向菜单导航， 既可以控制只展开一个，亦可以点击展开或者折叠
        </div>
      </tap-panel>
    </tap-collapse>

    <div class="" style="margin-top: 20px;">

    </div>
    <tap-collapse v-model="value2" accordion>
      <tap-panel>
        这是标题1
        <div slot="content" class="">
          手风琴特效，当然也可以叫做侧栏菜单导航，集中了当今比较流行的竖向菜单导航， 既可以控制只展开一个，亦可以点击展开或者折叠
        </div>
      </tap-panel>
      <tap-panel>
        这是标题2
        <div slot="content" class="">
          手风琴特效，当然也可以叫做侧栏菜单导航，集中了当今比较流行的竖向菜单导航， 既可以控制只展开一个，亦可以点击展开或者折叠
        </div>
      </tap-panel>
      <tap-panel>
        这是标题3
        <div slot="content" class="">
          手风琴特效，当然也可以叫做侧栏菜单导航，集中了当今比较流行的竖向菜单导航， 既可以控制只展开一个，亦可以点击展开或者折叠
        </div>
      </tap-panel>
    </tap-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: '1',
      children: [],
      value: "2",
      value2: [1]
    }
  },
  methods: {
    // handleToggle(index, e) {
    //   // console.log(e);
    //   var contents = Array.from(this.$el.querySelectorAll('.collapse-item-content'))
    //   // contents = contents.filter(v => console.log(v.classList));
    //   // console.log(Object.prototype.toString.call(contents), contents);
    //   for (var i in contents) {
    //   //   console.log(contents[i]);
    //     contents[i].style.height = '0';
    //
    //   }
    //
    //
    //   this.active = index.toString();
    //   const el = e.target.parentNode;
    //   const con = e.target.nextElementSibling;
    //   // var clientLeft = con.clientLeft;
    //   const height = con.scrollHeight;
    //   con.style.height = height + 'px'
    // },
  },
  mounted () {

  }
}
</script>

<style lang="css">
.collapse-item-content {
  position: relative;
  overflow: hidden;
  height: 0;
  font-size: 14px;
  transition-duration: 300ms;
  transform: translate3d(0, 0, 0);
  box-sizing: border-box;
  border-top: none;
  /* transition: all .5s ease; */
}

.collapse-item-content-box {
  padding: 10px;
}

.collapse-item-title {
  padding: 10px;
  background: #2196f3;
  color: #fff;
  cursor: pointer;
  padding-left: 15px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  border-bottom: 1px solid #efefef;
}

.collapse-item-expand >.collapse-item-content{
	height:auto;
}
</style>
