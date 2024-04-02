<script setup>
import {
  Management,
  Checked,
  Message,
  UserFilled,
  MessageBox,
  Key,
  User,
  EditPen,
  SwitchButton,
  CaretBottom,
  Timer
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

import formateDate from '@/utils/time'
const router = useRouter()
const userStore = useUserStore()

//获取时间
import { ref, onMounted, onBeforeUnmount } from 'vue'
const nowTime = ref('')
let timer = 0
// 设置定时器
onMounted(() => {
  timer = setInterval(() => {
    nowTime.value = formateDate()
  }, 1000)
})
// 取消定时器
onBeforeUnmount(() => {
  clearInterval(timer) //清除定时器
  timer = 0
})

//跳转和退出
const handleCommand = (key) => {
  if (key === 'logout') {
    //退出
    ElMessageBox.confirm('确认要进行退出操作吗?', '温馨提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        ElMessage({
          type: 'success',
          message: '你已退出登录'
        })
        router.push('/login')
        userStore.removeToken()
      })
      .catch(() => {})
  } else {
    //跳转
    router.push(`/user/${key}`)
  }
}

import { userGetImgService } from '@/api/user'
const imageBase64 = ref('')
const getImageBase64 = async () => {
  const res = await userGetImgService('/img/1111')
  console.log(res)
  imageBase64.value = res.data.imageBase64
}
getImageBase64()
</script>

<template>
  <div class="common-layout">
    <el-container class="all_container">
      <el-aside width="15vw">
        <div class="note_img">
          <img src="@/assets/note.jpg" alt="" width="80vw" />
        </div>
        <el-divider />
        <el-menu
          active-text-color="red"
          background-color="rgb(255, 205, 138)"
          :default-active="$route.path"
          text-color="black"
          router
        >
          <el-menu-item index="/note/home">
            <el-icon><Management /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="/note">
            <template #title>
              <el-icon><Checked /></el-icon>
              <span>笔记管理</span>
            </template>
            <el-menu-item index="/note/class">
              <el-icon><MessageBox /></el-icon>
              <span>笔记分类</span>
            </el-menu-item>
            <el-menu-item index="/note/amend">
              <el-icon><EditPen /></el-icon>
              <span>笔记修改</span>
            </el-menu-item>
            <el-menu-item index="/note/message">
              <el-icon><Message /></el-icon>
              <span>笔记信息</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/user">
            <template #title>
              <el-icon><UserFilled /></el-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/user/password">
              <el-icon><Key /></el-icon>
              <span>重置密码</span>
            </el-menu-item>
            <el-menu-item index="/user/img">
              <el-icon><User /></el-icon>
              <span>修改头像</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="10vh"
          ><div class="time">
            <el-icon size="300%"><Timer /></el-icon>
            <span>&nbsp;&nbsp; {{ nowTime }}</span>
          </div>
          <el-dropdown placement="bottom-end" @command="handleCommand">
            <span class="el-dropdown__box">
              <el-avatar :src="imageBase64" />
              <el-icon><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="password" :icon="Key"
                  >重置密码</el-dropdown-item
                >
                <el-dropdown-item command="img" :icon="User"
                  >更换头像</el-dropdown-item
                >
                <el-dropdown-item command="logout" :icon="SwitchButton"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  .all_container {
    min-height: 100vh;
    .el-aside {
      background-color: rgb(255, 205, 138);
      .note_img {
        margin: 10%;
        text-align: center;
      }
    }
    .el-header {
      background: repeating-linear-gradient(
        to right,
        rgb(255, 205, 138),
        rgb(249, 141, 0)
      );
      display: flex;
      align-items: center;
      justify-content: space-between;
      .el-dropdown__box {
        display: flex;
        align-items: center;
        .el-icon {
          color: #999;
          margin-left: 10px;
        }

        &:active,
        &:focus {
          outline: none;
        }
      }
      .time {
        display: flex;
        align-items: center;
        justify-content: center;
        color: brown;
      }
    }
  }
}
</style>
