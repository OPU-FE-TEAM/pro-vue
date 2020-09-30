<!--
 * @Description: 
 * @Author: HG
 * @Date: 2019-08-08 17:37:44
 * @LastEditors: HG
 * @LastEditTime: 2019-09-02 10:00:43
 -->
I<template>
  <div class="cell-item">
    <label v-if="$slots.title" class="title"><slot name="title"></slot></label>
    <label v-else class="title">{{ label }}</label>
    <span
      v-if="$slots.value"
      class="value"
      :style="{ 'text-align': valueAlign }"
      ><slot name="value"></slot
    ></span>
    <span v-else class="value" :style="{ 'text-align': valueAlign }">{{
      value
    }}</span>
  </div>
</template>

<script>
export default {
  name: "CellItem",
  props: {
    label: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    },
    valueAlign: {
      type: String,
      default: "right"
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
.cell-item {
  padding: 10px 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  .title {
    display: inline-block;
    width: 160px;
  }
  .value {
    display: inline-block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
}
</style>
