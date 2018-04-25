<template lang="html">
  <label @click='change' class="tap-radio" :class="{'is-disabled': isDisabled}">
    {{isDisabled}}
    <input type="radio"
          :value='value'
          class='tap-radio-nativeInput'
          v-model='currentValue'
          :disabled='isDisabled'
          >
    <span class="tap-radio-icon" :class="['tap-radio--'+ type,'is-' + type ]" ref='radioIcon' :style="{ width: size+'px', height: size + 'px' }" ></span>
    <span class="tap-radio-text" >
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'tap-radio',
  data() {
    return {

    }
  },
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
      return this.$parent.size;
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
    }
  },
  mounted() {},
  methods: {
    change(e) {
      if (!this.isDisabled) return;
      this.currentValue = this.value
    }
  }

}
</script>

<style lang="css">
@import '../../common/style/variable.css';

@component-namespace tap {
  @component radio {
    @when disabled {
      & input:checked +span{
        border: 1px solid $color-disabled;
      }
      & .tap-radio-icon {
          background-color: $color-background;
          &:after{
            background-color:$color-disabled;
          }
      }
    }
    @descendent nativeInput {
      display: none;
      pointer-events: none;

      /* 选中状态 */
      &:checked + span{
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
        @when default {
          border: 1px solid $color-content;
        }
      }
      &:checked + span:after{
        transform: scale(1);
      }
    }

    /*  */
    @descendent icon {
      position: relative;
      display: inline-block;
      border-radius: 50%;
      box-sizing: border-box;
      vertical-align: middle;
      border: 1px solid $color-border;
      &:after{
        box-sizing: border-box;
        transition: all .3s;
        transform: scale(0);
        content: '';
        border-radius: 50%;
        position: absolute 0 0 0 0;
        margin: auto;
        width: 60%;
        height: 60%;
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
    @modifier default{
      &:after{
        background-color: $color-content;
      }
    }
    @modifier warning{
      &:after{
        background-color: $color-warning;
      }
    }

  }
}
</style>
