import Taro from '@tarojs/taro'
// import baseUrl from './baseUrl'

interface method {
  OPTIONS: string
  GET: string
  POST: string
  PUT: string
  HEAD: string
  DELETE: string
  TRACE: string
  CONNECT: string
}

const Request = (
  url: string,
  method: keyof method,
  data: any,
  header: any
): Promise<any> => {
  Taro.showLoading({
    title: '加载中...',
    mask: true,
  })

  return new Promise((resolve, reject) => {
    Taro.request({
      url: `https://wd.chenxianlei.com/api/${url}`,
      data: data,
      method: method,
      header: header,
      success: function (res) {
        const { code, msg, data: dataObject } = res.data
        if (code != 1) {
          Taro.showModal({
            title: '提示',
            content: msg,
          })

          return reject(res.data)
        }
        return resolve(dataObject)
      },
      fail: function (error) {
        Taro.showModal({
          title: '提示',
          content: '网络错误',
        })
      },
      complete: function () {
        Taro.hideLoading()
      },
    })
  })
}

const get = (url: string, data?: any, header?: any) => {
  return Request(url, 'GET', data, header)
}

const post = (url: string, data?: any, header?: any) => {
  return Request(url, 'POST', data, header)
}

export default { get, post }
