<script setup>
import { ref } from 'vue'
import { noteEditClassService, noteAddClassService } from '@/api/note'

const haveDialog = ref(false)
const formModel = ref({
  classname: '',
  classsecondname: ''
})
const formRef = ref()

const rules = {
  classname: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  classsecondname: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
}

const open = async (row) => {
  haveDialog.value = true
  formModel.value = { ...row }
  // console.log(row)
}
defineExpose({
  open
})

const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  // console.log(formModel.value.id)
  formModel.value.id
    ? await noteEditClassService(
        `/noteclass/${formModel.value.id}`,
        formModel.value
      )
    : await noteAddClassService(formModel.value)
  ElMessage({
    type: 'success',
    message: formModel.value.id ? '编辑成功' : '添加成功'
  })
  haveDialog.value = false
  emit('success')
}
</script>

<template>
  <el-dialog
    v-model="haveDialog"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30vw"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      style="padding: 30px"
    >
      <el-form-item label="分类名称" prop="classname">
        <el-input
          v-model="formModel.classname"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="classsecondname">
        <el-input
          v-model="formModel.classsecondname"
          placeholder="请输入分类别名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="haveDialog = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
