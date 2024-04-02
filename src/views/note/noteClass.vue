<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { noteGetClassService, noteDeleteClassService } from '@/api/note'
import classEdit from '@/views/note/components/classEdit.vue'

//笔记分类表
const tableData = ref([])

const dialog = ref()

//得到笔记分类的数据
const getTableData = async () => {
  const res = await noteGetClassService('/noteclass')
  console.log(res)
  tableData.value = res.data
}
getTableData()

//增加笔记分类
const onAddClass = () => {
  dialog.value.open({})
}
//编辑笔记分类
const onEditClass = (row) => {
  dialog.value.open(row)
}
//删除笔记分类
const onDelClass = async (row) => {
  console.log(row)
  await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async () => {
      await noteDeleteClassService(`/noteclass/${row.id}`)
      getTableData()
      ElMessage({ type: 'success', message: '删除成功' })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '你已取消删除'
      })
    })
}

const onSuccess = () => {
  getTableData()
}
</script>

<template>
  <page-container title="笔记分类">
    <template #extra>
      <el-button @click="onAddClass">添加分类</el-button>
    </template>
    <el-table :data="tableData" height="70vh" style="width: 100%">
      <el-table-column label="序号" width="100" type="index" />
      <el-table-column prop="classname" label="分类名称" />
      <el-table-column prop="classsecondname" label="分类别名" />
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditClass(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelClass(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <class-edit ref="dialog" @success="onSuccess"></class-edit>
  </page-container>
</template>
