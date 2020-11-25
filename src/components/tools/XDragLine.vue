<template>
  <div
    class="x-handle"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
    :style="{ left: lastX + 'px' }"
  ></div>
</template>

<script>
export default {
  name: "XHandle",
  data() {
    return {
      lastX: ""
    };
  },

  methods: {
    mouseDown(event) {
      document.addEventListener("mousemove", this.mouseMove);
      this.lastX = event.screenX;
    },
    mouseMove(event) {
      this.lastX = event.screenX;
    },
    mouseUp() {
      if (this.lastX < 150) {
        this.lastX = 150;
      } else if (this.lastX > 500) {
        this.lastX = 500;
      }
      this.$emit("widthChange", this.lastX);
      document.removeEventListener("mousemove", this.mouseMove);
    }
  }
};
</script>
<style lang="less">
.x-handle {
  position: absolute;
  top: 0;
  right: -2px;
  z-index: 100;
  width: 2px;
  height: 100%;
  cursor: col-resize;
  border-top: none;
  border-bottom: none;

  &.hide {
    display: none;
  }

  &:hover {
    background: #1890ff;
    box-shadow: 0 0 4px 0 rgba(28, 36, 56, 0.15);
  }
}
</style>
