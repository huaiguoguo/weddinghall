import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro, { redirectTo } from '@tarojs/taro'
import { imageUrl } from '@api/baseUrl'

import './index.scss'

function Index(props: any) {
  const [menu_list, setMenuList] = useState([
    {
      menu_name: '商家资料',
      menu_url: '/pages/business/setting/store_profile/index',
      menu_icon: `${imageUrl}/business/setting/user@2x.png`,
    },
    {
      menu_name: '修改确认密码',
      menu_url: '/pages/business/setting/change_pay_password/index',
      menu_icon: `${imageUrl}/business/setting/password@2x.png`,
    },
    {
      menu_name: '用户协议',
      menu_url: '/pages/business/setting/agreement/index',
      menu_icon: `${imageUrl}/business/setting/lock@2x.png`,
    },
    {
      menu_name: '银行卡管理',
      menu_url: '/pages/business/setting/bank/index',
      menu_icon: `${imageUrl}/business/setting/bank@2x.png`,
    },
    {
      menu_name: '清理缓存',
      menu_url: '/pages/business/setting/clear/index',
      menu_icon: `${imageUrl}/business/setting/clear@2x.png`,
    },
  ])

  const redirectUrl = (url: string) => {
    if (!url) {
      Taro.showToast({
        title: '正在开发中',
      })
      return false
    }
    Taro.navigateTo({ url })
  }

  const handleLogout = () => {
    Taro.showToast({
      title: '正在开发.....',
    })
    return false
  }

  return (
    <View className='container'>
      <View className='menu_list'>
        {menu_list.length > 0 &&
          menu_list.map((item, index) => {
            return (
              <View
                key={index}
                className='item'
                onClick={() => redirectUrl(item.menu_url)}
              >
                <View className='item_left'>
                  <Image className='item_icon' src={item.menu_icon} />
                  <Text className='item_name'>{item.menu_name}</Text>
                </View>
                <View className='item_right'>
                  <Image
                    className='arrow_icon'
                    src={`${imageUrl}arrow_right@2x.png`}
                  />
                </View>
              </View>
            )
          })}
      </View>
      <View className='logout_container'>
        <View className='logout_btn' onClick={handleLogout}>
          <Text className='logout_btn_title'>退出登录</Text>
        </View>
      </View>
    </View>
  )
}

export default Index
