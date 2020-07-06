import React from 'react'
import Taro, { useDidShow } from '@tarojs/taro'

import { View, Text } from '@tarojs/components'

function Index() {
  useDidShow(() => {
    Taro.setTabBarItem({
      index: 3,
      iconPath: '/assets/images/abc_2.png',
      selectedIconPath: '/assets/images/ttt.png',
      text: 'text',
    })
  })

  return (
    <View>
      <Text>这是我的页面</Text>
    </View>
  )
}

export default Index
