import CellBoxComponent from "./CellBox.vue";
import CellItemComponent from "./CellItem.vue";

const cell = {
  install: function(Vue) {
    Vue.component("cellGroup", CellBoxComponent);
    Vue.component("cellItem", CellItemComponent);
  }
};
export const CellGroup = CellBoxComponent;
export const CellItem = CellItemComponent;

export default cell;
