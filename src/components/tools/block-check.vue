<template>
  <div class="block-check-box">
    <Tooltip v-for="(item, index) in data" :key="index">
      <template slot="title">
        {{ item.text }}
      </template>
      <div class="block-check-item" @click="setValue(item)">
        <img v-if="item.img" :src="item.img" :alt="item.text" />
        <div v-else class="block-check-text">{{ item.text }}</div>
        <div class="block-check-checked" v-if="value == item[valueField]">
          <Icon type="check" class="block-check-icon" />
        </div>
      </div>
    </Tooltip>
  </div>
</template>

<script>
import { Icon, Tooltip } from "ant-design-vue";

export default {
  name: "BlockCheck",
  components: {
    Icon,
    Tooltip
  },
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    valueField: {
      type: String,
      default: "value"
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  // watch: {
  //   data() {
  //     debugger;
  //     this.data = this.data;
  //   }
  // },
  model: {
    prop: "value",
    event: "update"
  },
  created() {},
  methods: {
    setValue(item) {
      this.$emit("update", item[this.valueField]);
      this.$emit("change", item);
    }
  }
};
</script>

<style lang="less" scoped>
.block-check-box {
  .block-check-item {
    display: inline-block;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    & + .block-check-item {
      margin-left: 10px;
    }
    .block-check-checked {
      width: 100%;
      height: 100%;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.1);
      .block-check-icon {
        font-size: 18px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -10px;
        margin-left: -10px;
        color: #fff;
      }
    }
  }
}
</style>
