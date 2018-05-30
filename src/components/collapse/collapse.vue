<template lang="html">
  <div class="tap-collapse" >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tap-collapse',

  props: {
    accordion: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Array, String]
    }
  },

  data () {
    return {
      currentValue: this.value
    }
  },

  methods: {
    setActive() {
      const activeKey = this.getActiveKey();

      this.$children.map((child, index) => {
        const name = child.name || index.toString();

        child.isActive = activeKey.includes(name);

        child.index = index;
      })
    },

    getActiveKey() {
      let activeKey = this.currentValue || [];

      const accordion = this.accordion;

      if (!Array.isArray(activeKey)) {
        activeKey = [activeKey]
      }

      if (accordion && activeKey.length > 1) {
        activeKey = [activeKey[0]]
      }

      activeKey = activeKey.map(v => v.toString());

      return activeKey;
    },

    toggle (data) {
      const name = data.name.toString();
      let newActiveKey = [];
      if (this.accordion) { // 手风琴模式
        if (data.isActive) {
          newActiveKey.push(name)
        }
      } else {  //非手风琴模式
        newActiveKey = this.getActiveKey();

        if (data.isActive) {
          newActiveKey.push(name)
        } else {
          const index = newActiveKey.indexOf(name)

          if (index > -1) {
            newActiveKey.splice(index, 1);
          }
        }
      }

      this.currentValue = newActiveKey;
      this.$emit('input', newActiveKey);
      this.$emit('on-change', newActiveKey);
    },
  },

  computed: {

  },

  watch: {
      currentValue() {
        this.setActive();
      },
      value() {
        this.currentValue = this.value;
      }
  },

  mounted() {
    this.setActive();
  }
}
</script>

<style lang="css">
@import '../../common/style/variable.css';

@component-namespace tap {
  @component collapse {
    background: $color-grey;
    background: #f7f7f7;
    border-radius: 3px;
    border: 1px solid #dddee1;
    box-sizing: border-box;
  }
}

</style>
