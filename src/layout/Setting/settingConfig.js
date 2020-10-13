// import { message } from "ant-design-vue/es";
// import defaultSettings from '../defaultSettings';

// let lessNodesAppended;
import { THEME } from "@/store/mutation-types";

import { message } from "ant-design-vue/es";
import { ls } from "@/utils/cache";
import themeColor from "./themeColor.js";
export const layouts = [
  {
    text: "侧边栏导航",
    value: "sidemenu",
    img: "/images/layout-side.png"
  },
  {
    text: "顶部栏导航",
    value: "topmenu",
    img: "/images/layout-top.png"
  }
  // {
  //   text: "顶部通栏导航",
  //   value: "sidetopmenu",
  //   img: "/images/layout-side-top.png"
  // }
];

export const menuModes = [
  {
    text: "默认",
    value: "basic",
    img: "/images/menu-base.png"
  },
  {
    text: "拆分",
    value: "split",
    img: "/images/menu-split.png"
  }
];

export const updateTheme = theme => {
  const hideMessage = message.loading("正在切换主题！", 0);
  let style = document.getElementById("themeStyle");
  if (!style) {
    style = document.createElement("style");
  }
  style.id = "themeStyle";
  style.type = "text/css";
  // .ant-menu-dark .ant-menu-sub{ background: ${this.theme.menuBackground};}
  // .ant-menu-horizontal > .ant-menu-item-selected > a{
  //   color: ${theme.menuActiveBackground}!important;
  //  }
  style.innerText = `
      .user-wrapper.top-header-user .action,.ant-layout-sider-trigger,.header-left .trigger{color: ${
        theme.menuTextColor
      };}
      .layout-logo .logo-text{color:${theme.menuTextColor}}
       .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected,.ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected{background: ${
         theme.menuActiveBackground
       }!important;}
       .layout-theme-sidemenu.layout-fixed .layout-side .sidemenu.smallMenuText > .menu-item a.router-link-active{
        background: ${theme.menuActiveBackground}!important;
       }
       
       .ant-menu-horizontal > .ant-menu-item-selected > a:after{
        background: ${theme.menuActiveBackground}!important;
       }
      .header-menu .header-menu-item,
      .layout-theme-sidetopmenu .header-flex,
      .layout-header,.user-wrapper.side-header-user .action{
        color:${theme.headerTextColor}!important;
      }
      .header-menu .header-menu-item.ant-menu-item-selected,
      .header-menu .header-menu-item.ant-menu-item:hover{
        border-bottom: 2px solid ${theme.headerTextColor}!important;
      }
      
      .ant-layout-sider-trigger{
        background:rgba(0,0,0,0.1);
      }
      .ant-menu-dark .ant-menu-inline.ant-menu-sub{
        background:rgba(0,0,0,0.1);
      }
      .ant-menu-dark .ant-menu-sub{
        background: ${theme.menuBackground};
      }
      `;
  document.getElementsByTagName("head")[0].appendChild(style);
  const bodyDom = document.getElementsByTagName("body")[0];
  if (theme.colorWeak) {
    bodyDom.classList.add("colorWeak");
  } else {
    bodyDom.classList.remove("colorWeak");
  }
  ls.set(THEME, theme);
  themeColor.changeColor(theme).finally(t => {
    hideMessage();
  });
};

// const updateColorWeak = colorWeak => {
//   // document.body.className = colorWeak ? 'colorWeak' : '';
//   colorWeak
//     ? document.body.classList.add("colorWeak")
//     : document.body.classList.remove("colorWeak");
// };

// export { updateTheme, colorList, updateColorWeak };
