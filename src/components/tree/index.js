import Tree from "./Tree.vue";

const DTree = {
  install: function(Vue) {
    Vue.component("tree", Tree);
  }
};
export const tree = Tree;
export default DTree;
