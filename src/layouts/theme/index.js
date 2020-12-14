import themeStyleData from "@/layouts/theme/config.js";

function themeStyleUpdate(data) {
  let lessVar = {};
  for (let i in data) {
    switch (i) {
      case "sidebar":
        lessVar = {
          ...lessVar,
          ...themeStyleData.sidebarThemeStyleList[0],
          ...themeStyleData.sidebarThemeStyleList[data[i]].data
        };
        break;
      case "table":
        lessVar = {
          ...lessVar,
          ...themeStyleData.tableThemeStyleList[0],
          ...themeStyleData.tableThemeStyleList[data[i]].data
        };
        break;
    }
  }

  less.modifyVars(lessVar).then(() => {
    console.log("改变成功");
  });
}

export default themeStyleUpdate;
