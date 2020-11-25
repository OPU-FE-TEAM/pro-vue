import cloneDeep from "lodash/cloneDeep";
/**
 * @description: tree转数组
 * @param {type}
 * @return:
 * @use:
 */
export const treeTransArray = (tree, key) => {
  return [].concat(
    ...tree.map(item => {
      if (item[key] && item[key].length) {
        const currentItem = cloneDeep(item);
        delete currentItem[key];
        return [].concat(currentItem, ...treeTransArray(item[key], key));
      } else {
        return item;
      }
    })
  );
};

export const listToTree = (list = [], pidField = "parent_id") => {
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
