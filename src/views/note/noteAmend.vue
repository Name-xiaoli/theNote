<script setup>
import { ref } from 'vue'
import amendSelect from './components/amendSelect.vue'
import noteEdit from './components/noteEdit.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import {
  noteGetNoteService,
  noteDeleteNoteService
  // noteEditNoteService
} from '@/api/note'

//
const noteEditRef = ref({})

// 定义请求参数对象
const params = ref({
  _page: 1,
  _limit: 5,
  classsecondname: ''
})

//定义tableData表格数据
const total = ref(0)
const tableData = ref([])

//得到tableData表格数据
const getNoteList = async () => {
  //检验路径
  // console.log(
  //   params.value.classsecondname
  //     ? `/notelist?classsecondname=${params.value.classsecondname}`
  //     : '/notelist'
  // )
  const res = await noteGetNoteService(
    params.value.classsecondname
      ? `/notelist?classsecondname=${params.value.classsecondname}`
      : '/notelist'
  )
  // console.log(res)
  total.value = res.data.length
  // console.log(total.value)
  //按照分页逻辑切割
  const startIndex = (params.value._page - 1) * params.value._limit
  const endIndex = startIndex + params.value._limit
  tableData.value = res.data.slice(startIndex, endIndex)
}
getNoteList()

//添加笔记
const onAddNote = () => {
  noteEditRef.value.open({})
}
//搜索
const onSearch = () => {
  params.value._page = 1 // 重置页面
  getNoteList()
}
//重置
const onReset = () => {
  params.value._page = 1
  params.value.classsecondname = ''
  getNoteList()
}

//编辑笔记
const onEditNote = async (row) => {
  // console.log(row)
  noteEditRef.value.open(row)
}
//删除笔记
const onDelNote = async (row) => {
  // console.log(row)
  // await noteDeleteNoteService(`/notelist/${row.id}`)
  // getNoteList()
  ElMessageBox.confirm('确认要删除笔记吗?', '温馨提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await noteDeleteNoteService(`/notelist/${row.id}`)
      getNoteList()
      ElMessage({
        type: 'success',
        message: '你已删除该条笔记'
      })
    })
    .catch(() => {})
}

//分页逻辑
const handleSizeChange = (size) => {
  params.value._page = 1
  params.value._limit = size
  getNoteList()
}
const handleCurrentChange = (page) => {
  params.value._page = page
  getNoteList()
}

//添加编辑成功方法
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / params.value._limit)
    params.value._page = lastPage
  }
  getNoteList()
}
</script>
<template>
  <page-container title="笔记修改">
    <template #extra>
      <el-button @click="onAddNote">添加笔记</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <amend-select
          v-model="params.classsecondname"
          style="width: 20vw"
        ></amend-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="tableData" style="width: 100%" height="55vh">
      <el-table-column prop="notetitle" label="笔记标题" />
      <el-table-column prop="classname" label="笔记分类" />
      <el-table-column prop="time" label="发布时间" />
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditNote(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelNote(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params._page"
      v-model:page-size="params._limit"
      :page-sizes="[3, 5, 10]"
      :disabled="false"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 4vh; justify-content: flex-end"
    />

    <!-- 笔记抽屉部分 -->
    <note-edit width="80%" @success="onSuccess" ref="noteEditRef"></note-edit>
  </page-container>
</template>
