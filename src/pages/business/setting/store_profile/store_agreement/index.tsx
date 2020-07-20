import React from 'react'

import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { imageUrl } from '@api/baseUrl'

import './index.scss'

function Index(props: any) {
  const redirectUrl = (url: string) => {
    if (url) {
      Taro.navigateTo({
        url,
      })
      return false
    }
    Taro.showToast({
      title: '正在开发中......',
    })
  }
  return (
    <View className='container'>
      <View className='content'>
        <View className='item'>
          <Text className='title'>《入驻会员协议》</Text>
          <Image className='arrow_icon' src={`${imageUrl}arrow_right@2x.png`} />
        </View>
        <View className='item'>
          <Text className='title'>《预存消费协议》</Text>
          <Image className='arrow_icon' src={`${imageUrl}arrow_right@2x.png`} />
        </View>
        <View className='item'>
          <Text className='title'>《服务免责协议》</Text>
          <Image className='arrow_icon' src={`${imageUrl}arrow_right@2x.png`} />
        </View>
      </View>
      <View className='btn_container'>
        <View
          className='upload_agreement'
          onClick={() => redirectUrl('/pages/business/setting/agreement/index')}
        >
          <Image
            className='upload_icon'
            src={`${imageUrl}business/setting/agreement/upload_icon@2x.png`}
          />
          <Text className='upload_text'>上传协议</Text>
        </View>
      </View>
    </View>
  )
}

export default Index
