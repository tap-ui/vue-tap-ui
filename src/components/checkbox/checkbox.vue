<template lang="html">
  <label @click='change' class="tap-checkbox" :class="{'is-disabled': isDisabled}">
    <!-- 原生按钮，隐藏 -->
    <input type="checkbox"
          :value='value'
          class='tap-checkbox-nativeInput'
          v-model='currentValue'
          :disabled='isDisabled'
          >
          <!-- 自定义样式按钮 -->
    <span class="tap-checkbox-input tap-checkbox-icon"
          :class="['tap-checkbox--'+ type,
                  'is-' + type,
                  'tap-checkbox-icon--'+ icon ]"
          ref='checkboxIcon'
          :style="{ width: size+'px', height: size + 'px' }" ></span>
          <!-- 文本 -->
    <span class="tap-checkbox-text" >
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'tap-checkbox',
  props: {
    value: {},
    disabled: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.setIconFontsize()
  },
  watch: {
    size: function() {
      this.setIconFontsize()
    }
  },
  computed: {
    type: function() {
      return this.$parent.type;
    },
    size: function() {
      let type = typeof this.$parent.size;
      if (type == 'string') {
        let sizeObj = { small: 14, normal: 20, large: 30 };
        return sizeObj[this.$parent.size]
      } else if (type == 'number') {
        return this.$parent.size;
      }

    },
    isDisabled: function() {
      return this.$parent.disabled ? this.$parent.disabled : this.disabled
    },
    currentValue: {
      get: function() {
        return this.$parent ? this.$parent.value : this.value;
      },
      set: function(val) {
        (this.$parent || this).$emit('input', val);
      }
    },
    icon: function() {
      return this.$parent.icon
    }
  },
  methods: {
    change(e) {
      if (this.isDisabled) return;
      this.currentValue = this.value
    },
    setIconFontsize() {
      let type = typeof this.$parent.size;
      if (type == 'string') {
        let sizeObj = { small: 14, normal: 20, large: 30 };
        this.$refs.checkboxIcon.classList.add('tap-checkbox-icon-fontsize-' + sizeObj[this.$parent.size])
      } else if (type == 'number') {
        this.$refs.checkboxIcon.classList.add('tap-checkbox-icon-fontsize-' + this.$parent.size)
      }
    }
  }

}
</script>

<style lang="css">
@import '../../common/style/variable.css';
/* @import '../../common/style/unicodefont.css' */
@font-face {
  font-family: 'unicodefont';
  src: url('../../assets/font/iconfont.eot');
  src: url('../../assets/font/iconfont.eot?#iefix') format('embedded-opentype'), url('../../assets/font/iconfont.woff') format('woff'), url('../../assets/font/iconfont.ttf') format('truetype'), url('../../assets/font/iconfont.svg#iconfont') format('svg');
}
@component-namespace tap {
  @component checkbox {
    @when disabled {
      & input:checked +span{
        border: 1px solid $color-disabled!important;
      }
      & .tap-checkbox-input {
          background-color: $color-background;
          &:after{
            background-color:$color-disabled;
          }
      }
    }
    /* 原生checkbox */
    @descendent nativeInput {
      display: none;
      /* 选中状态 */
      &:checked + span.tap-checkbox-icon--none{
        @when primary {
          border: 1px solid $color-primary;
        }
        @when error {
          border: 1px solid $color-error;
        }
        @when success {
          border: 1px solid $color-success;
        }
        @when warning {
          border: 1px solid $color-warning;
        }
        @when black {
          border: 1px solid $color-content;
        }
      }
      &:checked + span:after{
        transform: scale(1);
      }
    }

    /* 自定义checkbox */
    @descendent input {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      vertical-align: bottom;
      border: 1px solid $color-border;
      text-align: center;
      &:after{
        text-align: center;
        box-sizing: border-box;
        transition: all .3s;
        transform: scale(0);
        position: absolute 0 0 0 0;
        margin: auto;
      }
    }
    /* 文本 */
    @descendent text {
      & > * {
        vertical-align: bottom;
      }
    }
    /* 类型 */
    @modifier primary{
      &:after{
        background-color: $color-primary;
      }
    }
    @modifier error{
      &:after{
        background-color: $color-error;
      }
    }
    @modifier success{
      &:after{
        background-color: $color-success;
      }
    }
    @modifier black{
      &:after{
        background-color: $color-content;
      }
    }
    @modifier warning{
      &:after{
        background-color: $color-warning;
      }
    }

    /* 图标 */
    @descendent icon{
      color: #ffffff;
      font-family: "unicodefont";
      width: 100%;
      height: 100%;
      @modifier none{
        &:after {
          content: '';
          width: 70%;
          height: 70%;
        }
      }
      @modifier selectd {
        &:after {

          content: '\e6ad';
        }
      }
      @modifier close {
        &:after {
          content: '\e69a';
        }
      }
      @modifier add {
        &:after {
          content: '\e6b9';
        }
      }
      @modifier delete {
        &:after {
          content: '\e69d';
        }
      }
      @modifier subtract {
        &:after {
          content: '\e6fe';
        }
      }
      @modifier dollar {
        &:after {
          content: '\e702';
        }
      }
      @modifier star {
        &:after {
          content: '\e6a0';
        }
      }
      @modifier success{
        &:after {
          content: '\e6b1';
        }
      }
      @modifier wrong{
        &:after {
          content: '\e6b7';
        }
      }
      @modifier smile{
        &:after {
          content: '\e6af';
        }
      }
      @modifier cry{
        &:after {
          content: '\e69c';
        }
      }
      @modifier info{
        &:after {
          content: '\e6a4';
        }
      }
      @modifier forbidden{
        &:after {
          content: '\e73b';
        }
      }
      @modifier bad{
        &:after {
          content: '\e716';
        }
      }
      @modifier good{
        &:after {
          content: '\e717';
        }
      }
      @modifier cart{
        &:after {
          content: '\e698';
        }
      }
      @modifier download{
        &:after {
          content: '\e714';
        }
      }
      @modifier help{
        &:after {
          content: '\e6a3';
        }
      }
      @modifier like{
        &:after {
          content: '\e7ce';
        }
      }
      @modifier hot{
        &:after {
          content: '\e756';
        }
      }
    }
  }
}

@for $i from 14 to 80 {
  .tap-checkbox-icon-fontsize-$i {
    &:after{
      font-size:calc($(i) * 0.9)px;
    }
  }
}
</style>
