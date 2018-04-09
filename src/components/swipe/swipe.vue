<template >
  <div class="tap-swipe">
    <div
        :style="trackStyle"
        class="tap-swipe-items-wrap"
        ref="wrap"
        @transitionend="handleTrnslate"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd">
      <slot/>
    </div>
    <!-- <div class="tap-indicators-wrap" v-show="showIndicators"> -->
      <div class="tap-swipe-indicators">
        <i class="tap-swipe-indicator"
            v-for="(a, index) in count"
            :class="{ 'is-active' : active === index}">
        </i>
      <!-- </div> -->

    </div>
  </div>
</template>

<script>
export default {
  name: 'tap-swipe',

  props: {
    autoplay: Number,
    loop: {
      type: Boolean,
      default: true,
    },
    initialSwipe: {
      type: Number,
      default: 1,
    },
    showIndicators: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 500,
    }
  },

  data() {
    return {
      width: 0,
      offset: 0,
      startX: 0,
      startY: 0,
      active: 0,
      deltaX: 0,
      swipes: [],
      index: 1,
      currentDuration: 0,
    }
  },


  mounted() {
    this.initialize();
  },

  destroyed() {
    clearTimeout(this.timer);
  },

  watch: {
    // active(newVal) {
    //   console.log(newVal, 'active');
    //   if (newVal == this.count) {
    //     this.index = 1;
    //     this.active = 0;
    //   }
    //
    //   if (newVal == 0) {
    //     this.index = this.count - 1;
    //     this.active = this.count - 1;
    //   }
    // }
  },

  computed: {
    count() {
      return this.swipes.length;
    },
    trackStyle() {
      return {
        // paddingLeft: this.width + 'px',
        width: (this.count + 2) * this.width + 'px',
        transitionDuration: `${this.currentDuration}ms`,
        transform: `translate3D(${this.offset}px, 0, 0)`
      }
    },
    activeIndicator() {
      return (this.active + this.count) % this.count;
    }
  },

  methods: {
    // 复制dom 对象在开头 和结尾
    initialize() {
      // this.active = this.initialSwipe; // 初始化第一张

      const cloneDom1 = this.swipes[0].$el.cloneNode(true); //复制node节点
      const cloneDom2 = this.swipes[this.swipes.length - 1].$el.cloneNode(true);

      this.$refs.wrap.insertBefore(cloneDom2, this.swipes[0].$el);
      this.$refs.wrap.append(cloneDom1);

      this.width = this.$el.getBoundingClientRect().width; //获取宽度

      // 给子元素设置宽度
      document.querySelectorAll('.tap-swipe-item').forEach((item) => {
          item.style.width = this.width + 'px';
      })
      this.offset = this.width * -1;
      this.currentDuration = 0;
      // this.autoPlay();
    },

    onTouchStart(event) {
      // clearTimeout(this.timer);
      this.currentDuration = 0; // 手指移动的时候不需要动画

      this.startX = event.touches[0].clientX;
      // this.startY = event.touches[0].clientY;
      this.deltaX = this.offset; // 记录上一次开始的offset;
    },

    onTouchMove(event) {

      this.diff = event.touches[0].clientX - this.startX;
      // console.log(this.deltaX);
      this.move(0, this.diff);
    },

    onTouchEnd() {

      this.index = Math.round(-this.offset / this.width);
      this.active = this.index - 1;
      this.currentDuration = this.duration; // 移动到一半，回弹时候的动画时间

      this.offset = -this.index * this.width;


      setTimeout(() => {
        if (this.index == 0) {
          this.index = 3;
          this.active = this.index - 1;
          this.currentDuration = 0;
        }
        else if (this.index === this.count + 1) {
          this.index = 1;
          this.active = 0;
          this.currentDuration = 0;
        }

        if (!this.currentDuration) {
          this.offset = -this.index * this.width;
        }
      }, this.duration)

      console.log(this.index);
    },

    move(move = 0, offset = 0) {
      // if (this.active === this.count - 1) {
      //   this.active = 0;
      // } else {
      //   this.active += move;
      // }
      //
      // console.log(offset);
      if (move) {
        this.offset = -this.active * this.width;
      } else {
        this.offset = this.deltaX + offset;
        // console.log(this.offset);
      }

    },

    autoPlay() {

      const { autoplay } = this; //获取自动播放的时间
      if (autoplay && this.count > 1) {
        clearTimeout(this.timer);

        this.timer = setTimeout(() => {

          this.currentDuration = 0;

          setTimeout(() => {
            this.currentDuration = this.duration;
            this.move(1);
            this.autoPlay();
          }, 30)
        }, autoplay);
      }
    },

    getDirection(touch) {
      const offsetX = Math.abs(touch.clientX - this.startX);
      const offsetY = Math.abs(touch.clientY - this.startY);
      return offsetX > offsetY ? 'horizontal' : offsetX < offsetY ? 'vertical' : '';
    },

    range(num, arr) {
      return Math.min(Math.max(num, ...arr));
    },

    handleTrnslate(e) {
      // console.log(this.activeIndicator);
      // console.log(e);
    }
  }
}
</script>

<style lang="css">
  @import "../../common/style/variable.css";
  .tap-swipe {
    overflow: hidden;
    position: relative;
    -webkit-user-select: none;
            user-select: none;
  }

  .tap-swipe-indicators {
      position: absolute;
      display: flex;
      justify-content: center;
      left: 0;
      right: 0;
      bottom: 10px;
      height: 4px;
    }

  .tap-swipe-indicators > i {
        position: relative;
        cursor: pointer;
        display: inline-block;
        width: 10px;
        height: 4px;
        border-radius: 3px;
        background-color: rgba(255,255,255,.4);
        margin: 0 3px;
        transition: all .2s;
      }
  .tap-swipe-indicators > i.is-active {
    width: 16px;
    background: rgba(255,255,255, .8);
  }

  .tap-swipe__indicators > i:not(:last-child) {
    margin-right: 6px;
  }

  .van-swipe__indicators .van-swipe__indicator--active {
          background-color: #f60;
        }
</style>
