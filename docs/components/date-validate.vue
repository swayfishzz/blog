<template>
  <el-form :model="form" :rules="rules" label-width="120px" ref="formRef" class="code-view">
    <el-form-item label="入学日期" prop="start">
      <el-date-picker
        v-model="form.start"
        type="date"
        format="YYYY 年 MM 月 DD 日"
        value-format="x"
        placeholder="选择入学日期"
      />
    </el-form-item>
    <el-form-item label="毕业日期" prop="end">
      <el-date-picker
        v-model="form.end"
        type="date"
        format="YYYY 年 MM 月 DD 日"
        value-format="x"
        placeholder="选择毕业日期"
      />
    </el-form-item>
    <el-form-item>
      <el-button @click="submit(formRef)" type="primary">提交</el-button>
      <el-button @click="formRef.resetFields()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const form = reactive({ start: '', end: '' })
const rules = reactive({
  start: [{ required: true, message: '请选择入学日期', trigger: 'blur' }],
  end: [{ required: true, validator: validateEndDate, trigger: 'blur' }],
})
const formRef = ref()

function validateEndDate(_rule, value, callback) {
  if (!value) {
    return callback(new Error('请选择毕业日期'))
  }
  if (!form.start) {
    return
  }
  const threeYears = 3 * 365 * 24 * 60 * 60 * 1000
  if (value - form.start < threeYears) {
    return callback(new Error('毕业时间不正确'))
  }
  callback()
}

const submit = async (formEl) => {
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessage.success('submit')
    } else {
      console.log('err', fields)
    }
  })
}
</script>
