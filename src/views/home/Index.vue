<template>
  <div>
    <DataTable
      border
      show-overflow
      keep-source
      ref="xGrid"
      height="460"
      :loading="loading"
      :data="tableData"
      :columns="tableColumn"
      :edit-config="{ trigger: 'click', mode: 'row' }"
    />
  </div>
</template>

<script>
// import { DataTable } from "opu-components-vue";
// import "opu-components-vue/lib/dataTable/style";

function getData(arr) {
  return new Promise(resolve => {
    setTimeout(() => {
      const list = Array.from({ length: arr.pageSize }, (_, key) => ({
        id: key,
        name: `name_${arr.pageIndex}_${key}`
      }));
      const json = {
        data: list,
        total: 100
      };
      resolve(json);
    }, 500);
  });
}

export default {
  components: {
    // DataTable
  },
  data() {
    return {
      loading: false,
      tableColumn: [
        { type: "checkbox", width: 60 },
        { type: "seq", title: "Number", width: 80 },
        {
          field: "name",
          title: "Number",
          minWidth: 140,
          editRender: { name: "AInput" }
        }
        // { field: 'age', title: 'InputNumber', width: 160, editRender: { name: 'InputNumber', props: { max: 35, min: 18 } } },
        // { field: 'sex', title: 'Select', width: 140, editRender: { name: 'Select', options: [] } },
        // { field: 'sex2', title: 'Select', width: 140, editRender: { name: 'Select', optionGroups: [], props: { clearable: true } } },
        // { field: 'region', title: 'Cascader', width: 200, editRender: { name: 'Cascader', props: { data: [] } } },
        // { field: 'date', title: 'DatePicker', width: 200, editRender: { name: 'DatePicker', props: { type: 'date', format: 'yyyy/MM/dd' } } },
        // { field: 'date1', title: 'TimePicker', width: 200, editRender: { name: 'TimePicker', props: { type: 'time' } } },
        // { field: 'flag', title: 'iSwitch', width: 100, cellRender: { name: 'iSwitch' } },
        // { field: 'rate', title: 'Rate', width: 200, cellRender: { name: 'Rate' } }
      ],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        align: "left",
        pageSizes: [10, 20, 50, 100, 200, 500],
        layouts: [
          "Sizes",
          "PrevJump",
          "PrevPage",
          "Number",
          "NextPage",
          "NextJump",
          "FullJump",
          "Total"
        ],
        perfect: true
      },
      tableData: []
    };
  },
  created() {
    this.findList();
  },
  methods: {
    findList() {
      // 模拟后台接口
      this.loading = true;
      getData({
        pageIndex: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize
      })
        .then(res => {
          this.tableData = res.data;
          this.tablePage.total = res.total;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    searchEvent() {
      this.tablePage.currentPage = 1;
      this.findList();
    },
    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.findList();
    }
  }
  // render(){
  //   return(
  //     <div>
  //       <data-table/>
  //       <div>666</div>
  //     </div>
  //   )
  // }
};
</script>
