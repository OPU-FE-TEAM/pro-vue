import { cookie } from "./cache";
/**
 * @description: tree转数组
 * @param {type}
 * @return:
 * @use:
 */
export const treeToArray = (tree, key) => {
  return [].concat(
    ...tree.map(item => {
      if (item[key] && item[key].length) {
        return [].concat(item, ...treeToArray(item[key]));
      } else {
        return item;
      }
    })
  );
};

export const listToTree = (list = [], pidField = "parentId") => {
  const data = JSON.parse(JSON.stringify(list)); // 浅拷贝不改变源数据
  const result = [];
  if (!Array.isArray(data)) {
    return result;
  }
  data.forEach(item => {
    delete item.children;
  });
  const map = {};
  data.forEach(item => {
    map[item.id] = item;
  });
  data.forEach(item => {
    const parent = map[item[pidField]];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
};

//根据key获取对象值
export const getObj = (key, obj) => {
  let value = obj;
  if (key.indexOf(".") > -1) {
    const keysArr = key.split(".");
    for (let i = 0; i < keysArr.length; i++) {
      const k = keysArr[i];
      value = value[k];
    }
  } else {
    value = value[key];
  }
  return value;
};

//数组去重
export const arrayUnique = arr => {
  var hash = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) == arr.lastIndexOf(arr[i])) {
      hash.push(arr[i]);
    }
  }
  return hash;
};

// 拖拽改变数组排序
export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];
  let itemToAdd = payload;
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }
  return result;
};

// 设置当前url
export const setCurrentUrl = url => {
  window.history.replaceState(
    {
      path: url
    },
    "",
    url
  );
};

// 获取树形数据子节点的父级节点
export function treeFindPath(tree, func, path = [], field = "name") {
  if (!tree) return [];
  for (const data of tree) {
    // 这里按照你的需求来存放最后返回的内容吧
    path.push(data[field]);
    if (func(data)) return path;
    if (data.children) {
      const findChildren = treeFindPath(data.children, func, path);
      if (findChildren.length) return findChildren;
    }
    path.pop();
  }
  return [];
}

//导出数据下载
export const exportsDownLoad = (url, json) => {
  let token = cookie.get("token");
  if (token) {
    url += "?Token=" + token;
  } else {
    url += "?";
    for (let i in json) {
      url += i + "=" + json[i] + "&";
    }
    url += "Token=" + token;
  }
  // url = url.substring(0, url.length - 1);

  let link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
