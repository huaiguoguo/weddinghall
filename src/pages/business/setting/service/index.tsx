import React from 'react'
import { View, Text, Image } from '@tarojs/components'

import './index.scss'

function Index(props: any) {
  return (
    <View className='container'>
      <View className='head'>
        <Image className='head_image' src='' />
      </View>
      <View className='content'>
        <View className='qs_list'>
          <View className='item'>
            <View className='item_title'></View>
            <View className='item_content'></View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
