//获取时间

// 将小于10的数字前面补0
const complement = (value) => {
  return value < 10 ? `0${value}` : value.toString()
}
const formateDate = () => {
  const time = new Date()
  const year = time.getFullYear()
  const month = complement(time.getMonth() + 1)
  const day = complement(time.getDate())
  const hour = complement(time.getHours())
  const minute = complement(time.getMinutes())
  const second = complement(time.getSeconds())
  const week = '星期' + '日一二三四五六'.charAt(time.getDay())
  return `${year}年${month}月${day}日 / ${hour}:${minute}:${second} / ${week}`
}

export default formateDate
