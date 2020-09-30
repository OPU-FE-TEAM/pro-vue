<script>
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import tree from "ant-design-vue/es/tree";
import "ant-design-vue/es/tree/style/css";
import input from "ant-design-vue/es/input";
import "ant-design-vue/es/input/style/css";
import Button from "ant-design-vue/es/button";
import "ant-design-vue/es/button/style/css";
import Checkbox from "../dataForm/extends/Checkbox";

export default {
  name: "Tree",
  components: {
    "a-tree": tree,
    "a-input-search": input.Search,
    "a-button": Button,
    "a-button-group": Button.Group
  },
  props: {
    option: {
      type: Object,
      default: () => ({})
    },
    searchOption: {
      type: Object,
      default: () => ({
        props: {
          showSelectAll: true,
          searchIds: false //是否搜索出对应项id数组
        }
      })
    },
    //搜索模式
    searchMode: {
      type: Number,
      default: 1
      /**
       * 0  关闭搜索
       * 1  展示搜索  全选按钮横向
       * 2  展示搜索  全选按钮竖向
       */
    },
    //多选选中项
    checkedKeys: {
      type: Array,
      default: () => []
    },
    //单选选中项
    selectedKeys: {
      type: Array,
      default: () => []
    },
    //禁用等级
    disabledLv: {
      type: Number,
      default: 0
    },
    //是否展开全部
    expandAll: {
      type: Boolean,
      default: true
    },
    //树形数据
    treeData: {
      type: Array,
      default: () => []
    },
    //默认选中等级
    selectLv: {
      type: Number,
      default: -1
    }
  },
  model: {
    prop: "checkedKeys",
    event: "update"
  },
  data() {
    return {
      copyTreeData: [],
      copyOption: {},
      copyCheckedKeys: [],
      searchValue: "",
      expandedKeys: []
    };
  },
  watch: {
    treeData() {
      this.copyTreeDataRender();
    },
    option() {
      this.copyOptionRender();
    },
    checkedKeys(val) {
      this.copyCheckedKeys = val;
    },
    copyCheckedKeys(val) {
      this.$emit("update", val);
    }
  },
  computed: {
    defaultExpandAll() {
      let props = this.copyOption.props;
      return props && props.defaultExpandAll
        ? props.defaultExpandAll
        : this.expandAll;
    },
    dataList() {
      return this.generateList(this.copyTreeData);
    },
    checkable() {
      let props = this.copyOption.props;
      return props && props.checkable ? props.checkable : false;
    },
    keyField() {
      let props = this.copyOption.props;
      return props && props.replaceFields ? props.replaceFields.key : "key";
    },
    childrenField() {
      let props = this.copyOption.props;
      return props && props.replaceFields
        ? props.replaceFields.children
        : "children";
    },
    titleField() {
      let props = this.copyOption.props;
      return props && props.replaceFields ? props.replaceFields.title : "title";
    }
  },
  created() {
    this.copyCheckedKeys = this.checkedKeys;
    this.copyOptionRender();
    this.copyTreeDataRender();
  },
  mounted() {},
  updated() {},
  methods: {
    getRow(id) {
      let { dataList, keyField } = this;
      var index = dataList.findIndex(p => p[keyField] == id);
      return index > -1 ? dataList[index] : undefined;
    },
    selectAll(e) {
      if (e) {
        this.copyCheckedKeys = this.findAllIds([], this.copyTreeData);
      } else {
        this.copyCheckedKeys = [];
      }
    },
    allCheck() {
      this.copyCheckedKeys = this.findAllIds([], this.copyTreeData);
    },
    allUnCheck() {
      this.copyCheckedKeys = [];
    },
    findAllIds(arr, data) {
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        if (!item.disabled) {
          arr.push(item.key);
        }
        if (item.children && item.children.length > 0) {
          arr = this.findAllIds(arr, item.children);
        }
      }
      return arr;
    },
    getSearchIds(data, val, ids = []) {
      let { keyField, childrenField, titleField } = this;
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let child = item[childrenField];
        val = val && val.trim();
        if (
          (!item.disabled && val && item[titleField].indexOf(val) > -1) ||
          val.trim() == ""
        ) {
          ids.push(item[keyField]);
        }
        if (child && child.length > 0) {
          ids = this.getSearchIds(child, val, ids);
        }
      }
      return ids;
    },
    searchExpand() {
      let { searchValue, copyTreeData, dataList, titleField } = this;
      let expandedKeys = [];
      if (searchValue) {
        dataList.map(p => {
          if (!p.disabled && p[titleField].indexOf(searchValue) > -1) {
            expandedKeys = expandedKeys.concat(p.pIds);
          }
        });
      } else {
        expandedKeys = this.expandALlIds(expandedKeys, copyTreeData);
      }
      this.expandedKeys = expandedKeys;
    },
    expandALlIds(arr, data) {
      let { keyField, childrenField } = this;
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        if (item[childrenField] && item[childrenField].length > 0) {
          arr.push(item[keyField]);
          arr = this.expandALlIds(arr, item[childrenField]);
        }
      }
      return arr;
    },
    generateList(data) {
      let { childrenField } = this;
      let list = [];
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        list.push(item);
        if (item[childrenField]) {
          list = list.concat(this.generateList(item[childrenField]));
        }
      }
      return list;
    },
    copyTreeDataRender() {
      let { treeData, copyOption } = this;
      let { data, selectedRow } = this.disabledData(
        this.dataRender({ data: cloneDeep(treeData) })
      );
      this.copyTreeData = data;
      if (copyOption.props.autoExpandParent != false) this.searchExpand();
      this.$emit("update:selectedKeys", selectedRow.key);
      this.$emit("initSelect", selectedRow);
    },
    copyOptionRender() {
      let copyOption = cloneDeep(this.option);
      this.copyOption = copyOption;
    },
    dataRender({ data, selectedRow = {} }, pindex = [], pIds = [], lv = 0) {
      let { keyField, childrenField, selectLv } = this;
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let index = pindex.concat([i]);
        let ids = pIds.concat([item[keyField]]);
        if (
          selectLv > -1 &&
          selectLv == lv &&
          !item.disabled &&
          isEmpty(selectedRow)
        ) {
          selectedRow = {
            row: item,
            key: [item[keyField]]
          };
        }
        item.scopedSlots = { title: "title" };
        item.pindex = pindex;
        item.index = index;
        item.ids = ids;
        item.pIds = pIds;
        if (item[childrenField] && item[childrenField].length > 0) {
          let obj = this.dataRender(
            { data: item[childrenField], selectedRow },
            index,
            ids,
            lv + 1
          );
          item[childrenField] = obj.data;
          selectedRow = obj.selectedRow;
        }
      }
      return {
        data,
        selectedRow
      };
    },
    disabledData({ data, selectedRow }, lv = 0) {
      if (this.disabledLv == lv) return { data, selectedRow };
      let childrenField = this.childrenField;
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let child = item[childrenField];
        item.disabled = true;
        if (child) child = this.disabledData(child, lv + 1);
      }
      return { data, selectedRow };
    },
    searchBoxRender() {
      let { searchOption, searchMode } = this;
      if (searchMode < 1) return;
      let searchBtn = "";
      let mode = searchMode == 1;
      let searchOp = {
        props: {
          ...{ placeholder: "请输入搜索内容" },
          ...searchOption.props
        },
        on: {
          ...searchOption.on,
          change: e => {
            let on = searchOption.on;
            let val = e.target.value;
            this.searchValue = val;
            this.searchExpand();

            if (searchOption.on && on.change) {
              let ids;
              if (searchOption.props && searchOption.props.searchIds) {
                ids = this.getSearchIds(this.treeData, val);
              }
              on.change(e, ids);
            }
          }
        }
      };

      if (
        this.checkable &&
        this.searchOption.props &&
        this.searchOption.props.showSelectAllBtn
      ) {
        searchBtn = (
          //按钮组方式显示是否全选
          <a-button-group class="checked-btn">
            <a-button
              {...{
                props: {
                  type: "primary"
                },
                class: "btn",
                on: {
                  click: this.allCheck
                }
              }}
            >
              全选
            </a-button>
            <a-button
              {...{
                class: "btn",
                on: {
                  click: this.allUnCheck
                }
              }}
            >
              取消
            </a-button>
          </a-button-group>
        );
        //checkbox方式显示是否全选
        if (this.searchOption.props.showCheckAllbox) {
          searchBtn = (
            <div class="check-all-box">
              全选：
              <Checkbox {...{ on: { change: this.selectAll } }} />
            </div>
          );
        }
      }

      return (
        <div class={{ "saerch-box": true, inline: mode }}>
          <a-input-search {...searchOp} class="saerch" /> {searchBtn}
        </div>
      );
    },
    treeOptionRender() {
      let that = this;
      let {
        selectedKeys,
        copyOption: option,
        expandedKeys,
        copyTreeData
      } = that;
      let op = {
        props: {
          ...{ autoExpandParent: true, showLine: true },
          ...option.props,
          ...(selectedKeys ? { selectedKeys } : {}),
          ...{ expandedKeys },
          ...{ treeData: copyTreeData }
        },
        on: {
          ...option.on,
          "update:expandedKeys": val => {
            that.expandedKeys = val;
          },
          "update:selectedKeys": val => {
            this.$emit("update:selectedKeys", val);
          },
          select: (key, e) => {
            let on = that.option.on;
            e.row = that.getRow(key);
            on && on.select && on.select(key, e);
          }
        },
        scopedSlots: {
          title: props => {
            let title = props.title;
            let val = this.searchValue && this.searchValue.trim();
            if (!props.disabled && val && title.indexOf(val) > -1) {
              return (
                <span>
                  {title.substr(0, title.indexOf(val))}
                  <span style="color: #f50">{val}</span>
                  {title.substr(title.indexOf(val) + val.length)}
                </span>
              );
            } else {
              return title;
            }
          }
        }
      };
      return <a-tree {...op} vModel={this.copyCheckedKeys} />;
    }
  },
  render() {
    let tree = this.treeOptionRender();
    let saerchBox = this.searchBoxRender();
    const style = this.copyOption.props && this.copyOption.props.style;
    return (
      <div class="tree-wrapper">
        {saerchBox}
        <div style={style}> {tree}</div>
      </div>
    );
  }
};
</script>

<style lang="less" scoped>
.tree-wrapper {
  text-align: initial;
  padding-right: 5px;
  .saerch-box {
    &.inline {
      display: flex;
      .saerch {
        flex: 1;
      }
    }
    .checked-btn {
      display: flex;
      .btn {
        flex: 1;
      }
    }
  }
  .check-all-box {
    line-height: 32px;
    margin-left: 3px;
  }
}
</style>
