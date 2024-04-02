<script setup>
import { ref } from 'vue'
import { userChangePasswordService, userGetMessageService } from '@/api/user'
import { useUserStore } from '@/stores'

//规则
const formRules = {
  password: [
    { required: true, message: '请输入旧的密码', trigger: 'blur' },
    {
      pattern: /(^\S{6,15}$)/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== user.value.password) {
          callback(new Error('你输入的密码与旧的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  newpassword: [
    { required: true, message: '请输入新的密码', trigger: 'blur' },
    {
      pattern: /(^\S{6,15}$)/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  identifypassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {
      pattern: /(^\S{6,15}$)/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.newpassword) {
          callback(new Error('你输入的密码与上一次不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const formRef = ref()
const form = ref({
  password: '',
  newpassword: '',
  identifypassword: ''
})

const userStore = useUserStore()
// console.log(userStore.token)
const user = ref({})
const getUser = async () => {
  const res = await userGetMessageService(`/user/${userStore.token}`)
  // console.log(res)
  user.value = res.data
  // console.log(user.value)
}
getUser()

const onSubmit = async () => {
  await formRef.value.validate()
  await userChangePasswordService(`/user/${user.value.id}`, {
    password: form.value.newpassword,
    repassword: form.value.identifypassword
  })
  console.log(formRef.value)
  form.value = {
    password: '',
    newpassword: '',
    identifypassword: ''
  }
}
</script>

<template>
  <el-form :model="form" :rules="formRules" ref="formRef" label-position="top">
    <el-form-item label="账号名称">
      <el-input :value="user.username" :disabled="true" />
    </el-form-item>
    <el-form-item label="旧的密码" prop="password">
      <el-input v-model="form.password" />
    </el-form-item>
    <el-form-item label="新的密码" prop="newpassword">
      <el-input v-model="form.newpassword" type="password" show-password />
    </el-form-item>
    <el-form-item label="确认密码" prop="identifypassword">
      <el-input v-model="form.identifypassword" type="password" show-password />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
