<script setup>
import { ref, watch, onMounted } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { userRegisterService, userLoginService } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

//登录注册切换
const isRegister = ref(false)

const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

const form = ref()

//记住我功能
const ischeck = ref(false)

//规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 5,
      max: 10,
      message: '用户名必须是5-10位的字符',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /(^\S{6,15}$)/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

//注册事件
const register = async () => {
  await form.value.validate()
  let res = await userRegisterService(formModel.value)
  console.log(res)
  ElMessage.success('注册成功')
  isRegister.value = !isRegister.value
}

//登录事件
const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()
  let res = await userLoginService(formModel.value)
  console.log('res', res.data)
  userStore.setToken(res.data[0].id)
  ElMessage.success('登录成功')
  if (ischeck.value) {
    userStore.setUser({
      username: formModel.value.username,
      password: formModel.value.password
    })
  }
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
  router.push('/')
}

//监听注册事件，注册完成清空formModel内容
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})

//记住我功能
onMounted(() => {
  //在setup中，用来加载页面时，查看账户密码是否存在
  if (userStore.user.username != null && userStore.user.password != null) {
    ischeck.value = true
    formModel.value.username = userStore.user.username
    formModel.value.password = userStore.user.password
  } else {
    ischeck.value = false
  }
})
</script>

<template>
  <div class="bg">
    <!-- 注册模块 -->
    <el-form
      :model="formModel"
      :rules="rules"
      ref="form"
      class="login_form"
      v-if="isRegister"
      size="large"
    >
      <el-form-item>
        <h1>注 册</h1>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          v-model="formModel.username"
          placeholder="请输入用户名"
          :prefix-icon="User"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formModel.password"
          type="password"
          show-password
          placeholder="请输入密码"
          :prefix-icon="Lock"
        ></el-input>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input
          v-model="formModel.repassword"
          type="password"
          placeholder="请输入再次密码"
          show-password
          :prefix-icon="Lock"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="button" type="primary" @click="register">
          注册
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-link type="primary" :underline="false" @click="isRegister = false">
          去登录
        </el-link>
      </el-form-item>
    </el-form>
    <!-- 登录模块 -->
    <el-form
      class="login_form"
      v-else
      :model="formModel"
      :rules="rules"
      ref="form"
      size="large"
    >
      <el-form-item>
        <h1>登 录</h1>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          v-model="formModel.username"
          placeholder="请输入用户名"
          :prefix-icon="User"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formModel.password"
          type="password"
          show-password
          placeholder="请输入密码"
          :prefix-icon="Lock"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div>
          <el-checkbox v-model="ischeck">记住我</el-checkbox>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="button" type="primary" @click="login">
          登入
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-link type="primary" :underline="false" @click="isRegister = true">
          去注册
        </el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  min-height: 100vh;
  background: url('@/assets/login.jpg') no-repeat fixed;
  background-size: 100% 100%;
  .login_form {
    width: 25vw;
    padding: 2% 5% 0 5%;
    background-color: rgba(255, 255, 255, 0.6);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h1 {
      font-size: 36px;
      margin: 0 auto;
      color: rgba(0, 128, 255, 0.8);
    }
    .button {
      width: 100%;
    }
  }
}
</style>
