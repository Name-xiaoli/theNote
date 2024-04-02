import { get, post, patch } from '@/utils/http'

//注册接口
// const url = 'http://127.0.0.1:3000/user'
export const userRegisterService = ({ username, password, repassword }) => {
  return post('/user', { username, password, repassword })
}

//登录接口
export const userLoginService = ({ username, password }) => {
  return get('/user', { username, password })
}

//修改密码接口
export const userChangePasswordService = (url, data) => {
  return patch(url, data)
}

//得到用户信息
export const userGetMessageService = (url) => {
  return get(url)
}

//更新用户头像
export const userChangeImgService = (url, data) => {
  return patch(url, data)
}
//得到用户头像
export const userGetImgService = (url) => {
  return get(url)
}
