<template lang="html">
  <div class="tap-switch"
        @click="toggle"
        :class="wrapClasses"
        >
        <span class="tap-switch-inner">
        </span>
  </div>
</template>

<script>
export default {
  name: 'tap-switch',

  props: {
    value: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      currentValue: this.value,
    }
  },

  computed: {
    wrapClasses () {
      return {
        ['is-checked']: this.currentValue,
        ['is-disabled']: this.disabled,
        // [`tap-switch-${this.size}`: this.size]
      }
    }
  },

  methods: {
    toggle(e) {
      e.preventDefault();

      if (this.disabled) {
        return false;
      }

      this.currentValue = !this.currentValue;

      this.$emit('input', this.currentValue);
      this.$emit('change', this.currentValue);
    }
  }
}
</script>

<style lang="css">
@import "../../common/style/variable.css";

@component-namespace tap {
  @component switch {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    border-radius: 24px;
    border: 1px solid #c8c8cd;
    box-sizing: border-box;
    width: 48px;
    background-color: #c8c8cd ;
    transition: all .2s ease-in-out;

    @when disabled{
      background: $color-disabled;
      border-color: $color-disabled;
      .tap-switch-inner {
        &:after {
          background-color: #ccc;
        }
      }
    }

    @when checked {
      background-color: $color-primary;
      box-shadow: 0 0 1px $color-primary;
      .tap-switch-inner {
        &:after {
          left: 25px;
        }
      }
    }

    @descendent inner {
      color:$color-white;
      font-size: 12px;
      position: absolute;

      &:after {
        content: '';
        background-color: $color-white;
        position: absolute;
        height: 20px;
        width: 20px;
        border-radius: 20px;
        top: 1px;
        left: 1px;
        cursor: pointer;
        transition: left .2s ease-in-out, width 2s ease-in-out;
      }
    }
  }
}



</style>
