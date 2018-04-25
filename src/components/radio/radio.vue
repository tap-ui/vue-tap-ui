<template lang="html">
  <label @click='change'>
    <input type="radio"
          :value='value'
          :name='_name'
          class='tap-radio-nativeInput'
          v-model='value'
          >
    <span class="tap-radio-icon" :class="['tap-radio--'+ type ]" ref='radioIcon' :style="{ width: size+'px', height: size + 'px' }" ></span>
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
    name: {},

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
    currentValue: {
      get: function() {
        return this.value
      },
      set: function(val) {
        this.$parent.emit(val)
      }
    }
  },
  mounted() {},
  methods: {
    change(e) {
      e.stopPropagation();
      this.currentValue = this.value
    }
  }

}
</script>

<style lang="css">
@import '../../common/style/variable.css';

@component-namespace tap {
  @component radio {
    @descendent nativeInput {
      display: none;

      /* 选中状态 */
      &:checked + span:after{
        transform: scale(1, 1);
      }
    }

    /*  */
    @descendent icon {
      position: relative;
      display: inline-block;
      border-radius: 50%;
      border-box: border-box;
      vertical-align: middle;
      &:after{
        transition: all .3s;
        transform: scale(0, 0);
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
      border: 1px solid $color-primary;
      &:after{
        background-color: $color-primary;
      }
    }
    @modifier error{
      border: 1px solid $color-error;
      &:after{
        background-color: $color-error;
      }
    }
    @modifier success{
      border: 1px solid $color-success;
      &:after{
        background-color: $color-success;
      }
    }
    @modifier default{
      border: 1px solid $color-default;
      &:after{
        background-color: $color-default;
      }
    }
    @modifier warning{
      border: 1px solid $color-warning;
      &:after{
        background-color: $color-warning;
      }
    }
  }
}
</style>
