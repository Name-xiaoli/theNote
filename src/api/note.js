import { get, post, patch, del } from '@/utils/http'
//得到笔记分类的接口
export const noteGetClassService = (url) => {
  return get(url)
}

//编辑分类
export const noteEditClassService = (url, data) => {
  return patch(url, data)
}

//添加分类
export const noteAddClassService = (data) => {
  return post('/noteclass', data)
}

//删除分类
export const noteDeleteClassService = (url) => {
  return del(url)
}

//得到笔记信息的接口
export const noteGetNoteService = (url) => {
  return get(url)
}

//删除笔记信息的接口
export const noteDeleteNoteService = (url) => {
  return del(url)
}

//编辑笔记信息的接口
export const noteEditNoteService = (url, data) => {
  return patch(url, data)
}

//增加笔记信息的接口
export const noteAddNoteService = (data) => {
  return post('/notelist', data)
}
