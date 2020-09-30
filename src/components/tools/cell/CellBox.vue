<template>
  <div
    class="cell-box"
    :class="{ border: border }"
    :style="{ 'grid-template-columns': formColnumStyle }"
  >
    <slot name="default"></slot>
  </div>
</template>

<script>
export default {
  name: "CellGroup",
  props: {
    column: {
      type: Number,
      default: 1
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formColnumStyle() {
      let str = "";
      for (let i = 0; i < this.column; i++) {
        str += " 1fr";
      }
      return str;
    }
  }
};
</script>

<style lang="less" scoped>
.cell-box {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  font-size: 0.35rem;
  &.border {
    .cell-item {
      border-bottom: 1px solid #f1f1f1;
    }
  }
}
</style>
