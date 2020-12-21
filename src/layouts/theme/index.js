import themeStyleData from "@/layouts/theme/config.js";

function themeStyleUpdate(data) {
  let lessVar = {};
  for (let i in data) {
    switch (i) {
      case "leftSidebar":
        lessVar = {
          ...lessVar,
          ...themeStyleData.leftSidebar[0],
          ...themeStyleData.leftSidebar[data[i]].data
        };
        break;
      case "headerSidebar":
        lessVar = {
          ...lessVar,
          ...themeStyleData.headerSidebar[0],
          ...themeStyleData.headerSidebar[data[i]].data
        };
        break;
      case "table":
        lessVar = {
          ...lessVar,
          ...themeStyleData.table[0],
          ...themeStyleData.table[data[i]].data
        };
        break;
    }
  }

  less.modifyVars(lessVar).then(() => {
    console.log("改变成功");
  });
}

export default themeStyleUpdate;
