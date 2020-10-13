<template>
  <Drawer
    width="350"
    placement="right"
    @close="onClose"
    :closable="false"
    :visible="visible"
  >
    <div class="setting-box">
      <div class="setting-item">
        <Divider orientation="left">布局风格</Divider>
        <div class="content">
          <block-check
            v-model="theme.layoutMode"
            :data="layouts"
            @change="onThemeChange"
          />
        </div>
      </div>

      <div class="setting-item">
        <Divider orientation="left">导航模式</Divider>
        <div class="content">
          <block-check
            v-model="theme.menuMode"
            :data="menuModes"
            @change="onThemeChange"
          />
        </div>
      </div>

      <div class="setting-item">
        <Divider orientation="left">主题配色</Divider>

        <div class="content">
          <div class="color-list">
            <div class="color-list-item">
              <Tooltip>
                <template slot="title">
                  主题颜色
                </template>
                <div>
                  <ColorPicker
                    v-model="theme.mainColor"
                    @change="onThemeChange"
                  />
                </div>
              </Tooltip>
            </div>

            <div class="color-list-item">
              <Tooltip>
                <template slot="title">
                  导航颜色
                </template>
                <div>
                  <ColorPicker
                    v-model="theme.menuBackground"
                    @change="onThemeChange"
                  />
                </div>
              </Tooltip>
            </div>

            <div class="color-list-item">
              <Tooltip>
                <template slot="title">
                  导航文本色
                </template>
                <div>
                  <ColorPicker
                    v-model="theme.menuTextColor"
                    @change="onThemeChange"
                  />
                </div>
              </Tooltip>
            </div>

            <div class="color-list-item">
              <Tooltip>
                <template slot="title">
                  导航高亮背景
                </template>
                <div>
                  <ColorPicker
                    v-model="theme.menuActiveBackground"
                    @change="onThemeChange"
                  />
                </div>
              </Tooltip>
            </div>

            <!-- <div
              class="color-list-item"
              v-if="
                theme.layoutMode === 'sidemenu' ||
                  theme.layoutMode === 'sidetopmenu'
              "
            >
              <Tooltip>
                <template slot="title">
                  头部背景色
                </template>
                <div>
                  <ColorPicker
                    v-model="theme.headerBackground"
                    @change="onThemeChange"
                  />
                </div>
              </Tooltip>
            </div>
            <div
              class="color-list-item"
              v-if="
                theme.layoutMode === 'sidemenu' ||
                  theme.layoutMode === 'sidetopmenu'
              "
            >
              <Tooltip>
                <template slot="title">
                  头部文本色
                </template>
                <div>
                  <ColorPicker
                    v-model="theme.headerTextColor"
                    @change="onThemeChange"
                  />
                </div>
              </Tooltip>
            </div> -->
          </div>
        </div>
      </div>

      <div class="setting-item">
        <Divider orientation="left">其它配置</Divider>
        <div class="content">
          <cell-group>
            <cell-item label="固定布局">
              <span slot="value">
                <ASwitch v-model="theme.layoutFixed" @change="onThemeChange" />
              </span>
            </cell-item>

            <!-- <cell-item label="固定侧边栏">
              <span slot="value">
                <ASwitch v-model="theme.sideFixed" @change="onThemeChange" />
              </span>
            </cell-item> -->

            <cell-item label="色弱模式">
              <span slot="value">
                <ASwitch v-model="theme.colorWeak" @change="onThemeChange" />
              </span>
            </cell-item>

            <cell-item label="多页签模式">
              <span slot="value">
                <ASwitch v-model="theme.multiTab" @change="onThemeChange" />
              </span>
            </cell-item>
          </cell-group>
        </div>
      </div>

      <Divider />

      <Button block @click="doCopy"><Icon type="copy" />拷贝设置参数</Button>
      <div style="margin-top:26px;">
        <!-- <a-alert
          v-if="theme.devType === 'development'"
          description="复制参数粘贴到 vue.config.js 设置默认配置"
          type="warning"
        />
        <a-alert
          v-else
          description="复制参数粘贴到根目录下 config.json 设置默认配置"
          type="warning"
        /> -->
      </div>
    </div>
  </Drawer>
</template>

<script>
import {
  Button,
  Drawer,
  Divider,
  Tooltip,
  Switch as ASwitch,
  Icon
} from "ant-design-vue";

import BlockCheck from "@/components/tools/block-check";
import ColorPicker from "@/components/tools/color-picker";
import { CellGroup, CellItem } from "@/components/tools/cell";

import { updateTheme, layouts, menuModes } from "./settingConfig";
import { mixin } from "../Utils/mixin";
export default {
  components: {
    Button,
    Drawer,
    Divider,
    Tooltip,
    ASwitch,
    Icon,
    BlockCheck,
    ColorPicker,
    CellGroup,
    CellItem
  },
  mixins: [mixin],
  data() {
    return {
      visible: true,
      layouts,
      menuModes
    };
  },
  created() {},
  watch: {},
  mounted() {
    // updateTheme(this.theme);
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    toggle() {
      this.visible = !this.visible;
    },
    onThemeChange() {
      updateTheme(this.theme);
    },
    doCopy() {
      const text = `
        isUserSet: ${this.theme.isUserSet},
        layoutMode: "${this.theme.layoutMode}",
        menuMode: "${this.theme.menuMode}",
        menuBackground: "${this.theme.menuBackground}",
        mainColor: "${this.theme.mainColor}",
        menuActiveBackground: "${this.theme.menuActiveBackground}",
        menuTextColor: "${this.theme.menuTextColor}", 
        headerBackground: "${this.theme.headerBackground}",
        headerTextColor: "${this.theme.headerTextColor}",
        layoutFixed: ${this.theme.layoutFixed},
        colorWeak: ${this.theme.colorWeak},
        multiTab: ${this.theme.multiTab}
      `;
      this.$copyText(text)
        .then(message => {
          this.$message.success("复制完毕");
        })
        .catch(err => {
          this.$message.error("复制失败");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.setting-box {
  .setting-item {
    margin-bottom: 26px;

    .content {
      .color-list {
        &-item {
          display: inline-block;
          & + .color-list-item {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
