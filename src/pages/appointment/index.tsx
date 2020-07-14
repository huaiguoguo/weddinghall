import React from 'react'
import Taro, { useTabItemTap } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

function Index() {
  useTabItemTap(() => {
    Taro.makePhoneCall({
      phoneNumber: '18317183370',
    })
  })

  return (
    <View>
      <Text>这是专属热线页面</Text>
    </View>
  )
}

export default Index
