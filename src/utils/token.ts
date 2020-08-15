import Taro from '@tarojs/taro'
import { baseUrl } from '@api/baseUrl'

function refreshToken() {
  const dateObj = new Date().getTime()
  const currentTime = Math.round(dateObj / 1000)

  const isLogin = Taro.getStorageSync('isLogin')
  let token = Taro.getStorageSync('token')
  let token_expire = Taro.getStorageSync('token_expire')

  if (!isLogin || !token) {
    Taro.login({
      success: async function (res) {
        const { data } = await Taro.request({
          url: `${baseUrl}/wxuser/getTokenByWxcode`,
          data: { code: res.code },
          method: 'POST',
        })
        if (data.code == 1) {
          try {
            Taro.setStorageSync('isLogin', 1)
            Taro.setStorageSync('token', data.data.token)
            Taro.setStorageSync('token_expire', data.data.expiretime)
            Taro.setStorageSync('company_name', data.data.company_name)
            Taro.setStorageSync('company_mobile', data.data.company_mobile)
            Taro.setStorageSync(
              'is_set_pay_password',
              data.data.is_set_pay_password
            )
          } catch (e) {
            console.log(e)
          }
        } else {
          Taro.showModal({ title: data.msg, showCancel: false })
        }
      },
    })
  } else {
    if (token_expire < currentTime) {
      try {
        Taro.request({
          url: `${baseUrl}/token/refresh`,
          data: { token },
          method: 'POST',
        }).then(({ data }) => {
          if (data.code == 1) {
            Taro.setStorageSync('token', data.token)
            Taro.setStorageSync('token_expire', data.expiretime)
          } else {
            Taro.showModal({ title: data.msg, showCancel: false })
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  Taro.getStorageSync('token')
  // Taro.getStorageSync('token_expire')
  return token
}

export default refreshToken
