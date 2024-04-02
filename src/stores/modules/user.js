import { defineStore } from 'pinia'
import { ref } from 'vue'

//用户
export const useUserStore = defineStore(
  'root',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const user = ref({})
    const setUser = (obj) => {
      user.value = obj
    }
    const removeUser = () => {
      user.value = {}
    }
    return {
      user,
      setUser,
      removeUser,
      token,
      setToken,
      removeToken
    }
  },
  {
    persist: true
  }
)
