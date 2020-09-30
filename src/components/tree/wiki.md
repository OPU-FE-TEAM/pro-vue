## 介绍

tree组件用于更快速的构建,单选或者多选以及搜索查询。
注意: 不支持拖拽功能,如需使用,请用ant-design原组件

### 使用

全局调用

```javascript
import tree  from "ant-design-vue-tree";
vue.use(tree);
```

局部调用

```javascript
import { tree } from "ant-design-vue-tree";
```

#### API

参数  | 说明  | 类型  | 默认值
----  | ----  | ----  | ----
searchMode  | 搜索功能模式 | Number  | 1
option  | tree主要参数配置,详情见下文  | Object  | {}
checkedKeys  | ( v-model ) 多选开启时选中值数组集合  | Array  | []
selectedKeys  | ( .sync ) 单选选中项的值  | Array  | []
disabledLv  |  禁用层级,用于禁用选项,0表示不禁用 | Number  | 0
selectLv  | 默认初始化选中值的层级,-1为不默认选中  | Number  | -1

`{ searchMode }`

值  | 说明
----  | ----
0 | 关闭搜索功能
1  | 启用搜索功能,全选按钮横向
1  | 启用搜索功能,全选按钮竖向

`{ option.props }`

参考 https://www.antdv.com/components/tree-cn/#api


#### 事件

参数  | 说明  | 回调参数
----  | ----  | ----
initSelect  | 当 selectLv > -1时启用  | function(key,row)

`{ initSelect }` 返回参数

参数  | 说明
----  | ----
key  | 当前选中项的key值
row  | row参数详情见下文

`{ option.on }`

参数  | 说明  | 回调参数
----  | ----  | ----
check  | 多选选中时触发,参数与官网一致 | function(checkedKeys, e:{checked: bool, checkedNodes, node, event})
select  | 单选选中时触发,参数e中的row详情见下文  | function(key,e:{checked: bool, checkedNodes, node, event,row})

`{ row }` 参数详解

参数  | 说明 | 类型 | 示例
----  | ---- | ---- | ----
ids  | 值的树形层级集合 | Array | [1,2,3]
pIds  | 值的父级树形层级集合 | Array | [1,2,3]
index  | 值的树形索引集合 | Array | [1,2,3]
pindex  | 值的父级树形索引集合 | Array | [1,2,3]
