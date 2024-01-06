# sortablejs

[SortableJS](http://www.sortablejs.com/index.html) 是一个简单而功能强大的 JavaScript 库，用于创建可拖拽和可排序的列表。

```bash
npm i sortablejs
```

## 常用配置

```js
import Sortable from 'sortablejs'

const table = document.querySelector('table tbody')

new Sortable(table, {
  disabled: false, // 为true时禁用排序功能
  animation: 150, // 排序动画持续时长（ms）
  draggable: '.item', // 允许拖拽的项目类名
  ghostClass: 'sortable-ghost', // 自定义拖拽时的样式类
  chosenClass: 'sortable-chosen', // 自定义选中时的样式类

  onStart(event) {}, // 拖动开始时触发
  onEnd(event) {
    // 拖动结束时触发
    event.from // 拖动开始时的列表容器
    event.to // 拖动结束后的列表容器
    event.oldIndex // 拖动开始前的索引
    event.newIndex // 拖动结束后的索引
  }
})
```

更多配置项：http://www.sortablejs.com/options.html

## 使用示例

下面是一个使用示例（示例代码使用 Vue3 + [ElementPlus](https://element-plus.gitee.io/zh-CN/) 的表格组件）

需要注意的是，结合 `el-table` 使用时需要添加 `row-key` 属性，以保证排序完成后 `el-table` 可以正常重新渲染数据

```vue
<template>
  <el-table ref="tableRef" :data="tableData" row-key="id">
    <el-table-column type="index" label="序号" />
    <!-- 为可拖动排序的列设置类名 -->
    <el-table-column label="排序" width="60" class-name="drag-cell">
      <el-icon :size="16"><Rank /></el-icon>
    </el-table-column>
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" />
  </el-table>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Sortable from 'sortablejs'

const tableRef = ref()
const tableData = reactive([
  { id: 1, name: '张三', age: 20 },
  { id: 2, name: '李四', age: 21 },
  { id: 3, name: '王五', age: 22 },
  { id: 4, name: '赵六', age: 19 },
  { id: 5, name: '陈七', age: 20 }
])

onMounted(() => {
  const table = tableRef.value.$el.querySelector('.el-table__body-wrapper tbody')
  new Sortable(table, {
    draggable: '.drag-cell', // 允许拖拽的元素类名
    // 结束拖拽时触发
    onEnd: (event) => {
      // 删除被拖动的元素
      const moveRow = tableData.splice(event.oldIndex, 1)[0]
      // 添加到新的位置
      tableData.splice(event.newIndex, 0, moveRow)
    }
  })
})
</script>
```
