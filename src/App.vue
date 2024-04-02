<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import { useUserStore } from '@/stores'
// import { ref } from 'vue'

// const userStore = useUserStore()
// const user = ref({ username: 111, password: 222 })
</script>

<template>
  <!-- <div>App</div>
  {{ userStore.user }}
  <button @click="userStore.setUser(user)">添加</button>
  <button @click="userStore.removeUser()">删除</button> -->

  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
