<template >
  <div class="tap-swipe">
    <div
        :style="trackStyle"
        class="tap-swipe-items-wrap"
        ref="wrap"
        @transitionend="handleTrnslate">
      <slot/>
    </div>
    <!-- <div class="tap-swipe-indicators" v-show="showIndicators">
      <i class="tap-swipe-indicator"
          v-for="index in count"
          :class="{ 'is-active' :  === index}">
      </i>
    </div> -->
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
      default: 0,
    },
    // showIndicators: {
    //   type: Boolean,
    //   default: true,
    // },
    duration: {
      type: Number,
      default: 500,
    }
  },

  data() {
    return {
      width: 0,
      offset: 0,
      // startX: 0,
      // startY: 0,
      active: 0,
      // deltaX: 0,
      swipes: [],
      // direction: '',
      // pages: 4,
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

  },

  computed: {
    count() {
      return this.swipes.length;
    },
    trackStyle() {
      return {
        // paddingLeft: this.width + 'px',
        width: (this.count) * this.width + 'px',
        transitionDuration: `${this.currentDuration}ms`,
        transform: `translate3D(${this.offset}px, 0, 0)`
      }
    },
    activeIndicator() {
      return (this.active + this.count) % this.count;
    }
  },

  methods: {
    initialize() {
      // reset offset when children changes
      // clearTimeout(this.timer);
      this.width = this.$el.getBoundingClientRect().width; //获取宽度
      this.active = this.initialSwipe; // 初始化第一张
      this.currentDuration = 0; // 时间
      this.offset = this.count > 1 ? -this.width * this.active : 0; // 现在的偏移

      this.autoPlay();
    },

    onTouchStart(event) {
      clearTimeout(this.timer);

      this.deltaX = 0;
      this.direction = '';
      this.currentDuration = 0;
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;

      if (this.active <= -1) {
        this.move(this.count);
      }

      if (this.active >= this.count) {
        this.move(-this.count);
      }
    },

    onTouchMove(event) {
      this.direction = this.direction || this.getDirection(event.touches[0]);

      if (this.direction === 'horizontal') {
        event.preventDefault();
        this.deltaX = event.touches[0].clientX - this.startX;
        this.move(0, this.range(this.deltaX, [-this.width, this.width]))
      }
    },

    onTouchEnd() {
      if (this.deltaX) {
        this.move(Math.abs(this.deltaX) > 50 ? (this.deltaX > 0 ? -1 : 1) : 0);
        this.currentDuration = this.duration;
      }
      // this.autoPlay();
    },

    move(move = 0, offset = 0) {
      // const { active, count, swipes, deltaX, width } = this;
      // console.log(swipes, deltaX);
      // if (!this.loop && ((active === 0 && (offset > 0 || move < 0)) ||
      //     (active === count - 1 && (offset < 0 || move > 0)))
      // ) {
      //   return ;
      // }
      // if (move) {
      //   if (active === -1) {
      //     swipes[count - 1].offset = 0;
      //   }
      //   swipes[0].offset = active === count - 1 && move > 0 ? count * width : 0;
      //   this.active += move;
      // } else {
      //   if (active === 0) {
      //     swpies[count - 1].offset = deltaX > 0 ? -count * width : 0;
      //   } else if (active === count - 1) {
      //     swipes[0].offset = deltaX < 0 ? count * width : 0;
      //   }
      // }
      // console.log(swipes);
      if (this.active === this.count - 1) {
        this.active = 0;
      } else {
        this.active += move;
      }


      this.offset = -this.active * this.width;
      console.log(this.active, this.offset, this.count);
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

.tap-swipe__track {
    height: 100%;
    overflow: hidden;
  }

.tap-swipe-indicators {
    left: 50%;
    bottom: 10px;
    position: absolute;
    height: 6px;
    -webkit-transform: translate3d(-50%, 0, 0);
            transform: translate3d(-50%, 0, 0);
  }

.tap-swipe-indicators > i {
      border-radius: 100%;
      vertical-align: top;
      display: inline-block;
      background-color: #999;
      margin-left: 10px;
      width: 10px;
      height: 10px
    }

.tap-swipe__indicators > i:not(:last-child) {
  margin-right: 6px;
}

.van-swipe__indicators .van-swipe__indicator--active {
        background-color: #f60;
      }


</style>

<!--
/*
@component-namespace tap {
  @component swipe {
    overflow: hidden;
    position: relative;
    /* height: 100%; */

    @descendent items-wrap {
      position: relative;
      overflow: hidden;
      height: 100%;

      > div {
        position: absolute;
        transform: translateX(-100%);
        size: 100% 100%;
        display :none;

        @when active {
          display: block;
          transform: none;
        }
      }
    }

    @descendent indicators {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }

    @descendent indicator {
      size: 8px 8px;
      display: inline-block;
      border-radius: 100%;
      opacity: 0.2;
      margin: 0 3px;

      @when active {
        background: #fff;
      }
    }
  }
} */

 -->
