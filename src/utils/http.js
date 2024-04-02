//引入安装好的axios插件
import request from '@/utils/request'

const get = (url, params) => {
  return request.get(url, { params })
}

const post = (url, data) => {
  return request.post(url, data)
}

const patch = (url, data) => {
  return request.patch(url, data)
}

const del = (url) => {
  return request.delete(url)
}
//将二次封装好的axios导出
export { get, post, patch, del }
