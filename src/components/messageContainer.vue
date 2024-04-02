<script setup>
import { ref } from 'vue'
import { noteGetNoteService } from '../api/note'

const msg = ref()
const getMsg = async () => {
  const res = await noteGetNoteService('/notelist')
  // console.log(res)s
  msg.value = res.data
  // console.log(msg.value)
}
getMsg()

const open = (row) => {
  // console.log(row)
  ElMessageBox.alert(row.notecontent, row.notetitle, {
    dangerouslyUseHTMLString: true
  })
    .then(() => {})
    .catch(() => {})
}
</script>

<template>
  <el-space wrap>
    <el-card
      style="width: 19.8vw"
      shadow="hover"
      v-for="message in msg"
      :key="message.id"
      body-style="padding:0"
      @click="open(message)"
    >
      <template #header>
        <div class="card-header">
          <span>{{ message.notetitle }}/{{ message.classname }}</span>
        </div>
      </template>
      <div class="notecontent">
        <span v-html="message.notecontent"></span>
      </div>
      <template #footer>{{ message.time }}</template>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss">
.notecontent {
  height: 20vh;
  max-height: 20vh;
  padding: 0 0 10px 0;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow-y: hidden;
}
</style>
