<template>
  <Cascader
    id="cityselect"
    :value="value"
    :options="citys"
    @change="onChange"
    placeholder="请选择城市"
  />
</template>

<script>
import { Cascader } from "ant-design-vue";
import citys from "../../../public/js/citys.json";

export default {
  name: "citySelect",
  components: {
    Cascader
  },
  props: {
    data: { type: [Array, String] }
  },
  model: {
    prop: "data",
    event: "updata"
  },
  data() {
    return {
      citys: citys,
      value: []
    };
  },
  methods: {
    onChange(value, selectedOptions) {
      let labels = [];
      if (value.length) {
        labels = selectedOptions.map(item => item.label);
      }
      this.$emit("updata", value);
      this.$emit("change", value, labels);
    },
    getData() {
      const arr = [];
      const aprovinceArr = this.getCity(this.value[0], citys);
      arr.push(aprovinceArr.label);
      const cityArr = this.getCity(this.value[1], aprovinceArr.children);
      arr.push(cityArr.label);
      const areaArr = this.getCity(this.value[2], cityArr.children);
      arr.push(areaArr.label);
      return { value: this.value, label: arr };
    },
    getCity(value, data) {
      let arr = {};
      if (data && data.length) {
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          if (item.value === value) {
            arr = item;
            break;
          }
        }
      }
      return arr;
    },
    copyData() {
      this.value = JSON.parse(JSON.stringify(this.data));
    }
  },
  watch: {
    data() {
      this.copyData();
    }
  },
  created() {
    this.copyData();
  }
};
</script>

<style lang="stylus" scoped></style>
