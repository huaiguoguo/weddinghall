import React from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './index.scss'

function Index(props: any) {
  const completeAddBank = () => {
    Taro.redirectTo({
      url: '/pages/business/setting/bank/index',
    })
  }

  return (
    <View className='container'>
      <View className='password_notice_container'>
        <View className='notice_container'>
          <Text className='notice'>
            请设置支付密码,建议勿与银行卡取款密码相同
          </Text>
        </View>
        <View className='password_container'>
          <Input className='passwordItem' />
          <Input className='passwordItem' />
          <Input className='passwordItem' />
          <Input className='passwordItem' />
          <Input className='passwordItem' />
          <Input className='passwordItem' />
        </View>
      </View>
      <View className='btn_container'>
        <View className='btn' onClick={completeAddBank}>
          <Text className='btn_text'>完成</Text>
        </View>
      </View>
    </View>
  )
}

export default Index
