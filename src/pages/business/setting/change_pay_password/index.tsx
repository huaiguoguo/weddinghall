import React from 'react'
import { View, Text, Image, Input } from '@tarojs/components'

import { imageUrl } from '@api/baseUrl'

import './index.scss'

function Index(props: any) {
  return (
    <View className='container'>
      <View className='user_container'>
        <View className='avatar_container'>
          <Image
            className='avatar'
            src={`${imageUrl}business/setting/avatar@2x.png`}
          />
        </View>
      </View>
      <View className='form_container'>
        <View className='form_item'>
          <Input
            className='form_input'
            type='number'
            name='service_mobile'
            placeholder='请输入客服电话'
          />
          <Image
            className='remove'
            src={`${imageUrl}business/setting/remove@2x.png`}
          />
        </View>
        <View className='form_item'>
          <Input
            className='form_input'
            type='text'
            name='service_mobile'
            placeholder='请输入新密码'
          />
        </View>
        <View className='form_item'>
          <Input
            className='form_input'
            type='text'
            password
            name='service_mobile'
            placeholder='请再次输入新密码'
          />
        </View>
      </View>
      <View className='btn_container'>
        <View className='submit_btn'>
          <Text className='submit_btn_text'>确认修改</Text>
        </View>
      </View>
    </View>
  )
}

export default Index
