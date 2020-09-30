<template>
  <Upload
    name="file"
    listType="picture-card"
    class="avatar-uploader"
    :showUploadList="false"
    :beforeUpload="beforeUpload"
  >
    <img
      v-if="imageUrl"
      :src="env.API_HOST + imageUrl"
      style="width:100%;height:86px;"
    />
    <div v-else>
      <Icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">{{ text }}</div>
    </div>
  </Upload>
</template>

<script>
import { Upload, Icon } from "ant-design-vue";

// import { ls } from "@/utils/cache";
// import { mapState } from "vuex";
import globalApi from "@/api/global";

export default {
  name: "upLoadImage",
  components: {
    Icon,
    Upload
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: "选择图片"
    }
  },
  model: {
    prop: "value",
    event: "update"
  },
  // computed: {
  //   ...mapState({
  //     token: state => state.user.token
  //   })
  // },
  watch: {
    value(val) {
      this.imageUrl = val;
    }
  },
  data() {
    return {
      // eslint-disable-next-line no-undef
      env,
      imageUrl: "",
      loading: false
    };
  },
  created() {
    this.imageUrl = this.value;

    // if (this.token) {
    //   this.actionUrl = globalApi.upload;
    //   this.header = {
    //     Authorization: this.token
    //   };
    // }
  },
  methods: {
    beforeUpload(file) {
      const formData = new FormData();
      formData.append("file", file);
      globalApi.upload(formData).then(res => {
        if (res.data && res.data) {
          this.imageUrl = res.data;
          this.$emit("update", res.data);
        }
      });
      return false;
    }
    // handleChange(res) {
    //   if (res && res.file && res.file.response) {
    //     // 如果上传成功
    //     if (res.file.response.code == 0) {
    //       const url = res.file.response.data;
    //       const fileUrl = url;
    //       this.imageUrl = fileUrl;
    //       this.$emit("update", fileUrl);
    //     }
    //   }
    // }
  }
};
</script>
