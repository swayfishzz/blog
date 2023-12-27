# ElementPlus 表格排序

在项目中通过拖拽的方式对表格进行排序是个较为常见的场景，通过 [Sortable.js](http://www.sortablejs.com/index.html) 库可以轻松完成，它是一个用于拖拽排序的库，配置简单易上手

## 安装

```bash
npm i sortablejs
```

## 使用

效果图

<img src="/md/el-table-sort.png" alt="效果" />

需要注意的是，结合 `el-table` 使用时需要添加 `row-key` 属性，以保证排序完成后 `el-table` 可以正常重新渲染数据

```vue
<template>
  <el-table :data="tableData" style="width: 100%" ref="tableRef" row-key="id">
    <el-table-column type="index" label="序号" width="60" align="center" />
    <el-table-column label="排序" width="60" align="center" class-name="drag-cell">
      <el-icon :size="16">
        <Rank />
      </el-icon>
    </el-table-column>
    <el-table-column prop="name" label="姓名" align="center" />
    <el-table-column prop="age" label="年龄" align="center" />
  </el-table>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Sortable from 'sortablejs'

const tableData = reactive([
  { id: 1, name: '张三', age: 20 },
  { id: 2, name: '李四', age: 21 },
  { id: 3, name: '王五', age: 22 },
  { id: 4, name: '赵六', age: 19 },
  { id: 5, name: '陈七', age: 20 },
])

const tableRef = ref()

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
    },
  })
})
</script>
```

关于更多详细的配置项见 http://www.sortablejs.com/options.html
