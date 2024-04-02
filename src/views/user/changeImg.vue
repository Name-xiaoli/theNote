<script setup>
import { ref } from 'vue'
import { userChangeImgService, userGetImgService } from '@/api/user'

const imageBase64 = ref('')
const getImageBase64 = async () => {
  const res = await userGetImgService('/img/1111')
  console.log(res)
  imageBase64.value = res.data.imageBase64
}
getImageBase64()

const handleFileChange = (event) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    imageBase64.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const saveImage = async () => {
  // 可以将imageBase64发送到后端保存或进行其他操作
  console.log('Image Base64:', imageBase64.value)
  await userChangeImgService('/img/1111', { imageBase64: imageBase64.value })
  location.reload()
}
</script>

<template>
  <div style="display: block; margin: 10px">
    <input type="file" @change="handleFileChange" />
    <br />
    <img
      v-if="imageBase64"
      :src="imageBase64"
      alt="Uploaded Image"
      style="margin: 10px 0"
    />
    <br />
    <button @click="saveImage">更新头像</button>
  </div>
</template>

<!-- <script>
export default {
  data() {
    return {
      imageBase64: ''
    }
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onload = (e) => {
        this.imageBase64 = e.target.result
      }

      reader.readAsDataURL(file)
    },
    saveImage() {
      // 可以将this.imageBase64发送到后端保存或进行其他操作
      console.log('Image Base64:', this.imageBase64)
    }
  }
}
</script> -->
