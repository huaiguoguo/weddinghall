import Taro from '@tarojs/taro'
import http from '@api/interceptor'

function refreshToken() {
  const dateObj = new Date().getTime()
  const currentTime = Math.round(dateObj / 1000)

  const isLogin = Taro.getStorageSync('isLogin')
  let token = Taro.getStorageSync('token')
  let token_expire = Taro.getStorageSync('token_expire')

  if (isLogin) {
    if (token_expire < currentTime) {
      try {
        http.post('/token/refresh', { token }).then((response) => {
          Taro.setStorageSync('token', response.token)
          Taro.setStorageSync('token_expire', response.expiretime)
        })
      } catch (e) {
        console.log(e)
      }
    }
  } else {
    Taro.login({
      success: async function (res) {
        const response = await http.post('/wxuser/getTokenByWxcode', {
          code: res.code,
        })
        // console.log(response);
        console.log('================= start')
        console.log(response)
        console.log('================= end')
        try {
          Taro.setStorageSync('isLogin', 1)
          Taro.setStorageSync('token', response.token)
          Taro.setStorageSync('token_expire', response.expiretime)
          Taro.setStorageSync('company_name', response.company_name)
          Taro.setStorageSync('company_mobile', response.company_mobile)
        } catch (e) {
          console.log(e)
        }
      },
    })
  }

  Taro.getStorageSync('token')
  // Taro.getStorageSync('token_expire')
  return token
}

export default refreshToken
