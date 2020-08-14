import Taro, { getStorageSync } from '@tarojs/taro'
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
  data: {},
  header: {} = {}
): Promise<any> => {
  Taro.showLoading({
    title: '加载中...',
    mask: true,
  })

  const token = getStorageSync('token')

  const head = Object.assign(header, {
    token,
    'content-type': 'application/json',
  })

  return new Promise((resolve, reject) => {
    Taro.request({
      url: `https://api.wd.chenxianlei.com/${url}`,
      data: data,
      method: method,
      header: head,
      success: function (res) {
        const { code, msg, data: dataObject } = res.data
        if (code == 1) {
          resolve(dataObject)
        } else {
          Taro.showModal({
            title: '提示',
            content: msg,
            showCancel: false,
            success: function (confirmRes) {
              if (confirmRes.confirm) {
                reject(res.data)
              }
            },
          })
          // Taro.navigateBack()
          // return reject(res.data)
        }
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

const get = (url: string, data?: any, header?: {}) => {
  return Request(url, 'GET', data, header)
}

const post = (url: string, data?: any, header?: {}) => {
  return Request(url, 'POST', data, header)
}

export default { get, post }
