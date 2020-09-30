<template>
  <div class="home">
    <div class="left" style="width:280px;">
      <tree
        :option="option"
        :selectedKeys.sync="selectedKeys"
        v-model="checkedKeys"
        @initSelect="initSelect"
        :selectLv="0"
      ></tree>
    </div>
    <div>选择:{{ selectedKeys }}</div>
    <div>多选:{{ checkedKeys }}</div>
  </div>
</template>
<script>
import { tree } from "@/components/tree";
// import tree from "ant-design-vue/es/tree";
import "ant-design-vue/lib/tree/style/css";

const treeData = [
  {
    title: "中国",
    key: "0",
    children: [
      {
        title: "广西",
        key: "0-1",
        children: [
          { title: "桂林", key: "0-1-1", disabled: true },
          { title: "南宁", key: "0-1-2" },
          { title: "崇左", key: "0-1-3" }
        ]
      },
      {
        title: "广东",
        key: "0-2",
        children: [
          { title: "广州", key: "0-2-1" },
          { title: "深圳", key: "0-2-2" },
          { title: "湛江", key: "0-2-3" }
        ]
      },
      {
        title: "四川",
        key: "0-3"
      }
    ]
  },
  {
    title: "欧洲",
    key: "1",
    children: [
      { title: "英国", key: "1-1" },
      { title: "德国", key: "1-2" },
      { title: "法国", key: "1-3" }
    ]
  },
  {
    title: "北美洲",
    key: "3"
  },
  {
    title: "南极洲",
    key: "4"
  },
  {
    title: "奥洲",
    key: "5"
  },
  {
    title: "非洲",
    key: "6"
  }
];

export default {
  name: "home",
  components: { tree },
  data() {
    return {
      option: {
        props: {
          treeData: treeData,
          checkable: true
          // replaceFields: { children: "children", title: "title", key: "key" }
        },
        on: {
          check: e => {
            console.log(e);
          },
          select: (selectedKeys, info) => {
            console.log("select", selectedKeys);
            console.log("select", info);
          }
        }
      },
      checkedKeys: [],
      selectedKeys: []
    };
  },
  watch: {},
  mounted() {},
  methods: {
    onExpand(expandedKeys) {
      console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      // this.expandedKeys = expandedKeys;
      // this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      console.log("onCheck", checkedKeys);
      // this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      // this.selectedKeys = selectedKeys;
    },
    initSelect(e) {
      console.log(e);
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  text-align: initial;
}
</style>
