<template>
<transition name="tap-toast-pop">
  <div class="tap-toast-wrap" v-show="visibe">
    <div class="tap-toast" :class="[`tap-toast--${position}`, `tap-toast--${typeStyle}`]">

      <div v-if="typeStyle == 'text'">{{message}}</div>

      <template>
            <i class="iconfont tap-toast-icon" :class="iconStyle" v-if="iconStyle"></i>
            <div class="tap-toast-text" v-if="typeStyle == 'default'">{{message}}</div>
          </template>
    </div>
    <div class="tap-mask" v-show="visibe && mask"></div>
  </div>
</transition>
</template>

<script>
/**
 * [STYLE_LIST description]
 *
 */

const STYLE_LIST = ['success', 'fail', 'loading'];

export default {
  name: 'tap-toast',
  props: {
    message: [String, Number],
    position: {
      type: String,
      default: 'middle'
    },
    type: {
      type: String,
      default: 'text'
    },
    mask: Boolean,
  },
  data() {
    return {
      visibe: false,
    }
  },
  computed: {
    typeStyle() {
      return STYLE_LIST.indexOf(this.type) !== -1 ? 'default' : 'text';
    },
    iconStyle() {
      const classes = []
      switch (this.type) {
        case 'success':
          classes.push('icon-success');
          break;
        case 'fail':
          classes.push('icon-fail');
          break;
        case 'loading':
          classes.push('icon-loading tap-loading-animation');
          break;
      }
      return classes.join(' ')
    }
  }
}
</script>

<style>
@component-namespace tap {
  @component toast {
    position: fixed;
    background: rgba(0, 0, 0, .7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    border-radius: 4px;
    font-size: 12px;
    z-index: 2020;
    transform: rotate(180deg);

    @modifier middle {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    @modifier top {
      left: 50%;
      top: 50%;
      transform: translate(-50%, 0);
    }

    @modifier bottom {
      left: 50%;
      top: 50%;
      transform: translate(0, -50%);
    }

    @modifier text {
      padding: 12px;
      min-width: 220px;
    }

    @modifier default {
      width: 120px;
      min-height: 120px;
      padding: 15px;
    }

    @descendent pop-enter-active,
    pop-leave {
      opacity: 1;
      transition: opacity .5;
    }

    @descendent pop-enter,
    pop-leave-active {
      opacity: 0;
    }

    @descendent icon {
      font-size: 56px;
    }
    @descendent text {
      margin-top: 15px;
      font-size: 14px;
    }


  }
  @component mask {
    position: fixed;
    background: rgba(0, 0, 0, .3);
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }

}

.tap-loading-animation {
  display: block;
  position: relative;
  animation: loading 1s linear infinite;
}


@keyframes loading {
  from {
    transform: rotate(0);
  }

  40% {
    transform: rotate(180deg);
  }

  80% {
    transform: rotate(300deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
