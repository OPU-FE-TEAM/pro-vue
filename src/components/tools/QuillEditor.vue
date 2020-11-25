<!--
 * @Description: 
 * @Author: HG
 * @Date: 2019-08-12 09:50:20
 * @LastEditors: HG
 * @LastEditTime: 2020-03-17 15:45:11
 -->
<template>
  <div>
    <a-upload
      style="display:none;"
      name="file"
      class="editorUpLoad"
      :action="editorOption.serverUrl"
      :beforeUpload="beforeUpload"
    >
      <a-button>Click to Upload</a-button>
    </a-upload>
    <quill-editor
      v-model="data"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";

import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import globalApi from "@/api/global";

export default {
  name: "QuillEditor",
  components: {
    quillEditor
  },
  props: {
    // option: {
    //   type: Object,
    //   default() {
    //     return {};
    //   }
    // },
    value: String
  },
  model: {
    prop: "value",
    event: "update"
  },
  data() {
    return {
      data: "",
      imageList: [],
      quillUpdateImg: false,
      loadingKey: "uploadImage",
      editorOption: {
        theme: "snow", // or 'bubble'
        placeholder: "点击编辑详情",
        serverUrl: "globalApi.upload",
        header: {
          Authorization: "token"
        },
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction
              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],
              ["link", "image"],
              ["clean"] // remove formatting button
            ],
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件

                  document
                    .querySelector(".editorUpLoad .ant-upload input")
                    .click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  watch: {
    value() {
      this.data = cloneDeep(this.value);
    }
  },
  created() {
    // const user = cache.get("user");
    // if (user) {
    //   const token = user.Token;
    //   if (token) {
    //     // this.editorOption.serverUrl =
    //     //   this.$config.serverUrl + urls["Common_upLoadFile"];
    //     // this.editorOption.header = {
    //     //   Authorization: token
    //     // };
    //   }
    // }
    this.data = cloneDeep(this.value);
  },
  methods: {
    onEditorBlur() {
      //失去焦点事件
      // debugger;
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
      // this.$emit("input", this.content);
      this.$emit("change", this.data);
    },
    getData() {
      return this.data;
    },
    setData(data) {
      this.data = data;
    },
    getRef(refName) {
      return this.$refs[refName];
    },
    beforeUpload(file) {
      const formData = new FormData();
      formData.append("file", file);
      this.quillUpdateImg = true;
      this.$message.loading({ content: "图片上传中...", key: this.loadingKey });
      globalApi
        .upload(formData)
        .then(res => {
          this.$message.success({
            content: "上传成功",
            key: this.loadingKey,
            duration: 2
          });
          if (res.data && res.data.url) {
            // eslint-disable-next-line no-undef
            const imageUrl = res.data.url;
            // 获取光标所在位置
            let quill = this.$refs.myQuillEditor.quill;
            let length = quill.getSelection().index;
            // 插入图片  res.url为服务器返回的图片地址
            quill.insertEmbed(length, "image", imageUrl);
            // 调整光标到最后
            quill.setSelection(length + 1);
            this.quillUpdateImg = false;
          }
        })
        .catch(() => {
          this.$message.error({
            content: "上传失败",
            key: this.loadingKey,
            duration: 2
          });
          this.$message.error("图片插入失败");
        });
      return false;
    },

    // 富文本图片上传前
    // beforeUpload() {
    //   // 显示loading动画
    //   this.quillUpdateImg = true;
    // },
    // imagesUploadSuccess({ fileList }) {
    //   this.imageList = fileList;
    // },

    // uploadSuccess(res) {
    //   if (res && res.file && res.file.response) {
    //     // res为图片服务器返回的数据
    //     // 获取富文本组件实例
    //     let quill = this.$refs.myQuillEditor.quill;
    //     // 如果上传成功
    //     if (res.file.response.Code == 0) {
    //       const url = res.file.response.Data;
    //       const fileUrl = url;
    //       // 获取光标所在位置
    //       let length = quill.getSelection().index;
    //       // 插入图片  res.url为服务器返回的图片地址
    //       quill.insertEmbed(length, "image", fileUrl);
    //       // 调整光标到最后
    //       quill.setSelection(length + 1);
    //     } else {
    //       this.$message.error("图片插入失败");
    //     }
    //     // loading动画消失
    //     this.quillUpdateImg = false;
    //   }
    // },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败2222");
    }
  }
};
</script>

<style lang="less">
.ql-editor {
  min-height: 300px;
}
.ql-snow .ql-color-picker .ql-picker-label,
.ql-snow .ql-icon-picker .ql-picker-label {
  line-height: 10px;
}
.ql-snow .ql-picker-label::before {
  position: absolute;
  top: 2px;
}
.ql-toolbar.ql-snow .ql-picker-label {
  border: 1px solid #ddd;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
