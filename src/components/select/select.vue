<template lang="html">
  <div class="tap-select"
      @touchstart='onTouchStart'
      @touchmove='onTouchMove'
      @touchend='onTouchEnd'
      ref='selectInput'>

    <input type="hidden" :name='name' v-model="model">
    <div class="" v-if='model'>
      {{model.label}}
    </div>
    <i class="iconfont icon-ICON-"></i>
    <tap-option
      ref='optionsBox'
      :oSelect='oSelect'
      :startEv='startEv'
      :moveEv='moveEv'
      :selectBoxTop='selectBoxTop'
      :valueChange='valueChange'
      @input='changeModel'
      v-if='vis'>

          <slot></slot>
    </tap-option>
  </div>
</template>

<script>
import tapOption from './tap-option.vue'
import Select from './Select.js';
import {
  domFind
} from './util'

export default {
  name: 'tap-select',
  components: {
    tapOption
  },
  data() {
    return {
      // offsetTop : {},
      model: this.value,
      startEv: {},
      moveEv: {},
      selectBoxTop: 0,
      vis: false,
      oSelect: {},
    }
  },
  props: {
    name: String,
    value: {
      type: [String, Number, Array, Object]
    }
  },
  watch: {
    model: function() {
      this.$emit('input', this.model) //技巧，向上传递数据
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.oSelect = new Select(this, this.$refs.selectInput, this.selectBoxTop); //实例化
      this.model = this.oSelect.selected;//触发watch， 向上传递数据
    })
  },
  methods: {
    changeModel(value) {
      this.modle = value;
    },
    valueChange(ev) {

    },
    onTouchStart(ev) {
      ev.preventDefault();
      this.vis = true;
      this.selectBoxTop = ev.target.offsetTop;
      this.$nextTick(() => {
        let domOptionsBox = domFind(this.$refs.optionsBox.$el.childNodes, 'tap-option-optionBox');
        this.oSelect.onTouchStart(ev, domOptionsBox);
      })
    },
    onTouchMove(ev) {
      ev.preventDefault();
      this.oSelect.onTouchMove(ev);
    },
    onTouchEnd(ev) {
      ev.preventDefault();
      this.oSelect.onTouchEnd();
    }
  }
}
</script>

<style lang="css">
  @import '../../common/style/variable.css';

  @component-namespace tap{
    @component select {
      display: flex;
      justify-content: space-between;
      align-items: center;
      /* border: 1px solid $color-border; */
      height: $height-select;
      box-sizing: content-box;
      padding: 0 10px 0 20px;
      overflow: hidden;
      box-shadow:2px 2px 5px $color-border;
    }
  }
</style>
