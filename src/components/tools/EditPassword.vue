<template>
  <div>
    <Modal
      title="修改密码"
      :width="500"
      :visible="visible"
      :destroyOnClose="true"
      :maskClosable="false"
      @ok="onSubmit"
      @cancel="handleCancel"
    >
      <data-form
        ref="editForm"
        :items="items"
        :colspan="1"
        :titleWidth="100"
        size='small'
      />
    </Modal>
  </div>
</template>

<script>
import { Modal } from "ant-design-vue"; 
import { mapState } from "vuex";
import md5 from "js-md5";
// import configApi from "@/api/config";
export default {
  name: "EditPassword",
  components: { 
    Modal
  },
  data() {
    return {
      visible: false,
      loading: false,
      items: [ 
        {
          title: "账号",
          field: "operatorName",
          option: { initialValue: "2222" },
          itemRender: {
            name: "a-input", 
            props: {  
              disabled: true
            },
          } 
        },
        { 
          field: "operatorId",
          type: "hidden"
        },
        {
          title: "原密码",
          field: "oldPassword", 
          itemRender: {
            name: "a-input-password",  
          },
          option:{
            rules: [{ required: true, message: "请输入原密码!" }]
          }
        },
        {
          title: "新密码",
          field: "newPassword", 
          itemRender: {
            name: "a-input-password",  
          } 
        }
      ]
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.info
    })
  },
  created() {},
  methods: {
    show() {
      this.visible = true;
      const user = this.userInfo;
      if (user) {
        const data = {
          operatorName: user.username,
          operatorId: user.id,
          oldPassword: "",
          newPassword: ""
        };
        this.$nextTick(() => { 
          this.$refs.editForm.setData(data);
        });
      }
    },
    onSubmit() {
      const values = this.$refs.editForm.getData();

      if (values.oldPassword && values.oldPassword.trim()) {
        values.oldPassword = md5(values.oldPassword);
      } else {
        values.oldPassword = "";
      }
      if (values.newPassword && values.newPassword.trim()) {
        values.newPassword = md5(values.newPassword);
      } else {
        values.newPassword = "";
      }
      const json = {
        ...values,
        Id: values.operatorId
      };
      // configApi
      //   .userChangePassword(json)
      //   .then(res => {
      //     this.$message.success("修改成功！");
      //     this.visible = false;
      //   })
      //   .catch(() => {});
    },
    handleCancel() {
      this.visible = false;
    }
  }
};
</script>

<style lang="less" scoped></style>
