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
      <div class="tap-swipe-indicators" v-if="showIndicators">
        <i class="tap-swipe-indicator"
            v-for="(a, i) in count"
            :class="{ 'is-active' : (index > count ? 0 : index - 1 )=== i}">
        </i>
      </div>
  </div>
</template>


<script>
/**
  * tap-swipe
  * @module components/swipe
  * @desc 轮播图
  * @param {Number} [autoplay] - 自动播放的时间, 0 为不自动播放
  * @param {Number} [initialSwipe] - 初始的轮播页码
  * @param {Boolean} [showIndicators] - 是否显示指标
  * @param {duration} [Number] - 动画持续时间
  *
  * @example
  *  <tap-swipe :autoplay="3000" >
  *    <tap-swipe-item class="slide1">1</tap-swipe-item>
  *    <tap-swipe-item class="slide2">2</tap-swipe-item>
  *    <tap-swipe-item class="slide3">3</tap-swipe-item>
  * </tap-swipe>
*/
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
  /**
  * width  swipe的 宽度
  * startX 手指按下起始的点
  * diff 手指每次移动的距离
  * offset 整个swipe的偏移量
  * index 当前页码下标
  * currentDuration 当前动画播放时间
   */
  data() {
    return {
      width: 0,
      offset: 0,
      startX: 0,
      deltaX: 0,
      diff: 0,
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

  computed: {
    count() {
      return this.swipes.length;
    },
    trackStyle() {
      return {
        width: (this.count + 2) * this.width + 'px',
        transitionDuration: `${this.currentDuration}ms`,
        transform: `translate3D(${this.offset}px, 0, 0)`
      }
    }
  },

  methods: {
    // 无限滚动需要在开头和结尾复制一个DOM对象
    initialize() {

      this.swipes = this.$children;


      const cloneDom1 = this.swipes[0].$el.cloneNode(true); //复制node节点
      const cloneDom2 = this.swipes[this.swipes.length - 1].$el.cloneNode(true);

      this.$refs.wrap.insertBefore(cloneDom2, this.swipes[0].$el);
      this.$refs.wrap.append(cloneDom1);

      this.width = this.$el.getBoundingClientRect().width; //获取宽度


      // 给子元素设置宽度
      document.querySelectorAll('.tap-swipe-item').forEach((item) => {
          item.style.width = this.width + 'px';
      });

      this.index = this.initialSwipe; //初始化
      this.offset = this.width * - this.index;
      this.currentDuration = 0;
      this.autoPlay();
    },

    onTouchStart(event) {
      clearTimeout(this.timer);
      this.currentDuration = 0; // 手指移动的时候不需要动画
      this.startX = event.touches[0].clientX;
      this.deltaX = this.offset; // 记录上一次开始的offset;
    },

    onTouchMove(event) {
      this.diff = event.touches[0].clientX - this.startX;
      this.move(0, this.diff);
    },

    onTouchEnd() {
      this.currentDuration = this.duration; // 移动到一半，回弹时候的动画时间
      this.index = Math.round(-this.offset / this.width);
      this.offset = -this.index * this.width;
      this.wh('touch');
      this.autoPlay();
    },

    move(move = 0, offset = 0) {

      if (move) { // 自动跑
        this.index += move;
        this.offset = -this.index * this.width;
      } else {
        this.offset = this.deltaX + offset;
      }

    },
    // 校准自动播放或者滑动后的index
    wh(type) {
      const duration = type == 'touch' ? 250 : this.duration;
      setTimeout(() => {
        if (this.index <= 0) {
          this.index = this.count;
          this.currentDuration = 0;
        }
        if (this.index >= this.count + 1) {
          this.index = 1;
          this.currentDuration = 0;
        }
        if (!this.currentDuration) {
          this.offset = -this.index * this.width;
        }
      }, duration)
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
            this.wh();
            this.autoPlay();
          }, 30)
        }, autoplay);
      }
    },

    handleTrnslate(e) {
      // this.$emit('transitionend', this.index);
    }
  }
}
</script>

<style lang="css">
  @import "../../common/style/variable.css";

  @component-namespace tap {
    @component swipe {
      overflow: hidden;
      position: relative;
      user-select: none;

      @descendent indicators {
        position: absolute;
        display: flex;
        justify-content: center;
        left: 0;
        right: 0;
        bottom: 10px;
        height: 4px;
        > i {
          position: relative;
          cursor: pointer;
          display: inline-block;
          width: 10px;
          height: 4px;
          border-radius: 3px;
          background-color: rgba(255,255,255,.4);
          margin: 0 3px;
          transition: all .2s;

          @when active {
            width: 20px;
            background: rgba(255,255,255, .8);
          }
        }
      }
    }
  }


</style>
