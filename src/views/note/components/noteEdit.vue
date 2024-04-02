<script setup>
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import amendSelect from './amendSelect.vue'
import {
  noteGetNoteService,
  noteAddNoteService,
  noteEditNoteService,
  noteGetClassService
} from '@/api/note'
import formateDate from '@/utils/time'

//富文本编辑器
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef()

const form = ref()

// 内容 HTML=>formModel.content

// 模拟 ajax 异步获取内容
onMounted(() => {
  // setTimeout(() => {
  //   valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  // }, 1500)
})

// 编辑器配置
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    /* 菜单配置 */
  }
}

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
//

const haveDrawer = ref(false)
//数据
const formModel = ref({
  id: '',
  classname: '',
  classsecondname: '',
  notetitle: '',
  notecontent: '',
  time: ''
})

//发布笔记
const emit = defineEmits(['success'])
const onPublish = async () => {
  if (formModel.value.id) {
    await form.value.validate()
    // console.log('编辑操作')
    await noteEditNoteService(
      `/notelist/${formModel.value.id}`,
      formModel.value
    )
    ElMessage.success('修改成功')
    haveDrawer.value = false
    emit('success', 'edit')
  } else {
    await form.value.validate()
    // 添加请求
    formModel.value.id = (Math.floor(Math.random() * 8999) + 1000).toString()
    formModel.value.time = formateDate().split('/')[0]
    const res = await noteGetClassService(
      `/noteclass?classsecondname=${formModel.value.classsecondname}`
    )
    console.log(res)
    formModel.value.classname = res.data[0].classname
    console.log(formModel.value)
    await noteAddNoteService(formModel.value)
    ElMessage.success('添加成功')
    haveDrawer.value = false
    emit('success', 'add')
  }
}

const open = async (row) => {
  haveDrawer.value = true

  if (row.id) {
    const res = await noteGetNoteService(`/notelist/${row.id}`)
    // console.log(res)
    formModel.value = res.data
    console.log(formModel.value)
  } else {
    formModel.value = {
      id: '',
      classname: '',
      classsecondname: '',
      notetitle: '',
      notecontent: '',
      time: ''
    }
  }
}
defineExpose({
  open
})

const rules = {
  notetitle: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  classsecondname: [{ required: true, message: '请选择分类', trigger: 'blur' }]
}
</script>

<template>
  <el-drawer
    v-model="haveDrawer"
    :title="formModel.id == null ? '编辑笔记' : '添加笔记'"
    :with-header="true"
    size="85vw"
    :open-delay="500"
  >
    <el-form :model="formModel" :rules="rules" ref="form">
      <el-form-item label="笔记标题：" prop="notetitle">
        <el-input
          v-model="formModel.notetitle"
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="笔记分类：" prop="classsecondname">
        <amend-select v-model="formModel.classsecondname"></amend-select>
      </el-form-item>

      <!-- 富文本 -->
      <el-form-item label="笔记内容：" prop="notecontent">
        <div style="border: 1px solid #ccc">
          <!-- 工具栏 -->
          <Toolbar :editor="editorRef" style="border-bottom: 1px solid #ccc" />
          <!-- 编辑器 -->
          <Editor
            v-model="formModel.notecontent"
            :defaultConfig="editorConfig"
            style="height: 50vh; overflow-y: hidden"
            @onCreated="handleCreated"
          />
        </div>
      </el-form-item>

      <!-- 发布 -->
      <el-form-item>
        <el-button @click="onPublish()" type="primary" style="margin: 0 40vw"
          >发布</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped></style>
