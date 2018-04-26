<template lang="html">
  <label @click='change' class="tap-radio" :class="{'is-disabled': isDisabled}">
    <input type="radio"
          :value='value'
          class='tap-radio-nativeInput'
          v-model='currentValue'
          :disabled='isDisabled'
          >
    <span class="tap-radio-input" :class="['tap-radio--'+ type,'is-' + type, 'tap-radio-icon--'+ icon ]" ref='radioIcon' :style="{ width: size+'px', height: size + 'px' }" ></span>
    <span class="tap-radio-text" >
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'tap-radio',
  props: {
    value: {},
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {

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
    _name: function() {
      return this.$parent.name ? this.$parent.name : this.name
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
      console.log(this.$parent.icon);
      return this.$parent.icon
    }
  },
  mounted() {},
  methods: {
    change(e) {
      if (this.isDisabled) return;
      this.currentValue = this.value
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
  @component radio {
    @when disabled {
      & input:checked +span{
        border: 1px solid $color-disabled!important;
      }
      & .tap-radio-input {
          background-color: $color-background;
          &:after{
            background-color:$color-disabled;
          }
      }
    }
    @descendent nativeInput {
      display: none;
      /* 选中状态 */
      &:checked + span.tap-radio-icon--none{
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

    /*  */
    @descendent input {
      position: relative;
      display: inline-block;
      border-radius: 50%;
      box-sizing: border-box;
      vertical-align: bottom;
      border: 1px solid $color-border;
      &:after{
        line-height: 20px;
        text-align: center;
        box-sizing: border-box;
        transition: all .3s;
        transform: scale(0);
        /* content: '\e61c'; */
        border-radius: 50%;
        position: absolute 0 0 0 0;
        margin: auto;

      }
    }
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


      @modifier none{
        &:after {
          content: '';
          width: 70%;
          height: 70%;
        }
      }
      @modifier selectd {
        &:after {
          color: #ffffff;
          font-size: 130%;
          font-family: "unicodefont";
          width: 100%;
          height: 100%;
          content: '\e6ad';
        }
      }
      @modifier close {
        &:after {
          color: #ffffff;
          font-size: 120%;
          font-family: "unicodefont";
          width: 100%;
          height: 100%;
          content: '\e69a';
        }
      }
      @modifier add {
        &:after {
          color: #ffffff;
          font-size: 120%;
          font-family: "unicodefont";
          width: 100%;
          height: 100%;
          content: '\e6b9';
        }
      }
    }

  }
}
</style>
