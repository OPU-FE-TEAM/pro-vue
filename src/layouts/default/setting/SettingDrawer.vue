<template>
  <a-drawer
    width="350"
    placement="right"
    @close="onClose"
    :visible="visible"
    title="项目配置"
    :bodyStyle="{ padding: 0 }"
  >
    <div class="setting-box">
      <div class="setting-item">
        <a-divider orientation="center">布局风格</a-divider>
        <div class="content">
          <block-check
            v-model="theme.layoutMode"
            :data="layouts"
            @change="onLayoutModeChange"
          />

          <cell-group :border="false">
            <cell title="拆分菜单" :border="false">
              <span>
                <a-switch
                  v-model="theme.menuSplit"
                  :disabled="theme.layoutMode === 'topmenu'"
                  @change="onThemeChange"
                />
              </span>
            </cell>
            <cell title="主题样式" :border="false">
              <span>
                <a-select
                  v-model="copyThemeStyle.theme"
                  size="small"
                  style="width:100px"
                  @change="onThemeStyleChange"
                >
                  <a-select-option
                    v-for="(item, index) in themeStyleData.themeStyleList"
                    :key="index"
                    :value="item.value"
                    >{{ item.text }}</a-select-option
                  >
                </a-select>
              </span>
            </cell>
            <cell title="导航样式" :border="false">
              <span>
                <a-select
                  v-model="copyThemeStyle.sidebar"
                  size="small"
                  style="width:100px"
                  @change="val => onThemeDetailStyleChange(val, 'sidebar')"
                >
                  <a-select-option
                    v-for="(item,
                    index) in themeStyleData.sidebarThemeStyleList"
                    :key="index"
                    :value="item.value"
                    >{{ item.text }}</a-select-option
                  >
                </a-select>
              </span>
            </cell>
            <cell title="表头样式" :border="false">
              <span>
                <a-select
                  v-model="copyThemeStyle.table"
                  size="small"
                  style="width:100px"
                  @change="val => onThemeDetailStyleChange(val, 'table')"
                >
                  <a-select-option
                    v-for="(item, index) in themeStyleData.tableThemeStyleList"
                    :key="index"
                    :value="item.value"
                    >{{ item.text }}</a-select-option
                  >
                </a-select>
              </span>
            </cell>
            <!-- <cell title="顶部栏主题" :border="false">
              <span>
                <a-select
                  v-model="theme.headerTheme"
                  size="small"
                  style="width:100px"
                  @change="onThemeChange"
                >
                  <a-select-option key="light" value="light"
                    >亮色</a-select-option
                  >
                  <a-select-option key="dark" value="dark"
                    >暗色</a-select-option
                  >
                </a-select>
              </span>
            </cell>
            <cell title="侧边栏主题" :border="false">
              <span>
                <a-select
                  v-model="theme.sideTheme"
                  size="small"
                  style="width:100px"
                  @change="onThemeChange"
                >
                  <a-select-option key="light" value="light"
                    >亮色</a-select-option
                  >
                  <a-select-option key="dark" value="dark"
                    >暗色</a-select-option
                  >
                </a-select>
              </span>
            </cell> -->
            <cell title="工具栏位置" :border="false">
              <span>
                <a-select
                  v-model="theme.headerActionPosition"
                  size="small"
                  style="width:100px"
                  @change="onThemeChange"
                >
                  <a-select-option key="header" value="header"
                    >顶部栏</a-select-option
                  >
                  <a-select-option key="multiTabs" value="multiTabs"
                    >页签栏</a-select-option
                  >
                </a-select>
              </span>
            </cell>
          </cell-group>
        </div>
      </div>

      <div class="setting-item">
        <a-divider orientation="center">界面功能</a-divider>
        <div class="content">
          <cell-group :border="false">
            <cell title="侧边栏拖拽" :border="false">
              <span>
                <a-switch
                  v-model="theme.sideDragWidth"
                  @change="onThemeChange"
                />
              </span>
            </cell>
            <cell title="菜单搜索" :border="false">
              <span>
                <a-switch
                  v-model="theme.showMenuSearch"
                  @change="onThemeChange"
                />
              </span>
            </cell>
            <cell title="保留展开的菜单" :border="false">
              <span>
                <a-switch
                  v-model="theme.retainOpenKeys"
                  @change="onThemeChange"
                />
              </span>
            </cell>
            <cell title="固定header" :border="false">
              <span>
                <a-switch v-model="theme.layoutFixed" @change="onThemeChange" />
              </span>
            </cell>
            <cell title="内容区宽度" :border="false">
              <span>
                <a-select
                  v-model="theme.contentMode"
                  size="small"
                  style="width:100px"
                  @change="onThemeChange"
                >
                  <a-select-option key="full" value="full"
                    >流式</a-select-option
                  >
                  <a-select-option key="fixed" value="fixed"
                    >固定</a-select-option
                  >
                </a-select>
              </span>
            </cell>

            <cell title="侧边栏展开宽度" :border="false">
              <span>
                <a-input-number
                  size="small"
                  style="width:100px"
                  v-model="theme.sideDefaultWidth"
                  @change="onThemeChange"
                  :min="150"
                  :max="500"
                  :step="10"
                  :formatter="value => `${value}px`"
                  :parser="value => value.replace('px', '')"
                ></a-input-number>
              </span>
            </cell>
            <cell title="切换动画" :border="false">
              <span>
                <a-select
                  v-model="theme.routerTransition"
                  size="small"
                  style="width:120px"
                  @change="onThemeChange"
                >
                  <a-select-option
                    v-for="item in routerTransitions"
                    :key="item"
                    :value="item"
                    >{{ item }}</a-select-option
                  >
                </a-select>
              </span>
            </cell>
          </cell-group>
        </div>
      </div>

      <div class="setting-item">
        <a-divider orientation="center">界面显示</a-divider>
        <div class="content">
          <cell-group :border="false">
            <cell title="面包屑导航" :border="false">
              <span>
                <a-switch
                  v-model="theme.showBreadCrumb"
                  @change="onThemeChange"
                />
              </span>
            </cell>
            <cell title="多页签" :border="false">
              <span>
                <a-switch v-model="theme.multiTab" @change="onThemeChange" />
              </span>
            </cell>
            <cell title="顶部栏" :border="false">
              <span>
                <a-switch v-model="theme.headerShow" @change="onThemeChange" />
              </span>
            </cell>
            <cell title="Logo" :border="false">
              <span>
                <a-switch v-model="theme.showLogo" @change="onThemeChange" />
              </span>
            </cell>
            <cell title="灰色模式" :border="false">
              <span>
                <a-switch v-model="theme.greyMode" @change="onThemeChange" />
              </span>
            </cell>
          </cell-group>
        </div>
      </div>

      <a-divider />

      <a-button block @click="doCopy">
        <a-icon type="copy" />拷贝设置参数
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
import BlockCheck from "@/components/tools/block-check";
import cloneDeep from "lodash/cloneDeep";
// import { CellGroup, CellItem } from "@/components/tools/cell";
import { layouts, routerTransitions } from "./settingConfig";
import { THEME, THEMESTYLE } from "@/store/mutation-types";
import { ls } from "@/utils/cache";
import { utils } from "opu-components-vue";
import themeStyleData from "@/layouts/theme/config.js";
import themeStyleUpdateData from "@/layouts/theme/";

export default {
  components: {
    BlockCheck
    // CellGroup,
    // CellItem
  },
  props: {
    theme: {
      type: Object,
      default: () => {}
    },
    themeStyle: {
      type: Object,
      default: () => {}
    },
    setThemeStyle: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      visible: true,
      layouts,
      routerTransitions,
      themeStyleData,
      copyThemeStyle: {
        theme: 0,
        sidebar: 0,
        table: 0
      }
    };
  },
  created() {
    this.copyThemeStyle = cloneDeep(this.themeStyle);
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    toggle() {
      this.visible = !this.visible;
    },
    onThemeStyleChange(val) {
      let themeStyle = {
        theme: val,
        ...themeStyleData.themeStyleList[val].data
      };
      this.copyThemeStyle = themeStyle;
      this.setThemeStyle(themeStyle);
      themeStyleUpdateData(themeStyle);
      ls.set(THEMESTYLE, themeStyle);
    },
    onThemeDetailStyleChange(val, type) {
      let themeStyle = this.copyThemeStyle;
      themeStyle[type] = val;
      this.copyThemeStyle = themeStyle;
      this.setThemeStyle(themeStyle);
      themeStyleUpdateData(themeStyle);
      ls.set(THEMESTYLE, themeStyle);
    },
    onThemeChange() {
      if (this.theme.isUserSet) {
        // 允许用户配置存缓存
        ls.set(THEME, this.theme);
      }
    },
    onLayoutModeChange(obj) {
      if (obj.value === "topmenu") {
        this.theme.menuSplit = false;
      }
      this.onThemeChange();
    },
    doCopy() {
      const jsonStr = JSON.stringify(this.theme);
      const reg = /[,，]/g;
      const str = jsonStr
        .replace(/{/g, "{\r\n")
        .replace(reg, ",\r\n")
        .replace(/}/g, "\r\n}");

      if (utils.copyTextToClipboard(str)) {
        this.$message.success("复制完毕");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.setting-box {
  padding: 16px;
  height: calc(100vh - 55px);
  overflow-y: auto;

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
