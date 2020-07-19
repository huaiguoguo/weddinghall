import React from 'react'
import { View, Text, Input, Textarea } from '@tarojs/components'

import './index.scss'

function Index(props: any) {
  return (
    <View className='container'>
      <View className='form_content'>
        <View className='form_item'>
          <Text className='item_label'>商家店名:</Text>
          <Input
            className='item_input'
            name='store_name'
            placeholder='请输入门店名称'
          />
        </View>
        <View className='form_item'>
          <Text className='item_label'>商家电话:</Text>
          <Input
            className='item_input'
            name='store_name'
            placeholder='请输入客服电话'
          />
        </View>
        <View className='form_item'>
          <Text className='item_label'>商家地址:</Text>
          <Textarea
            className='item_area'
            name='store_name'
            placeholder='请输商家地址'
          />
        </View>
        <View className='form_item'>
          <Text className='item_label'>相册邮寄地址:</Text>
          <Textarea
            className='item_area'
            name='store_name'
            placeholder='请输入相册邮寄地址'
          />
        </View>
      </View>
      <View className='next_btn_container'>
        <View className='next_content'>
          <Text className='notice'>
            温馨提示: 相册将邮寄到影楼, 请自行发放给新人
          </Text>
          <View className='btn'>
            <Text className='btn_text'>提交</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
