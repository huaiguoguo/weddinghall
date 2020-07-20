import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'

import './index.scss'
import { imageUrl } from '@api/baseUrl'

function Index(props: any) {
  const [qsList, setQsList] = useState([
    {
      title: '订单问题',
      content: '订单问题,订单问题,订单问题,订单问题,订单问题,',
    },
    {
      title: '支付问题',
      content: '支付问题,支付问题,支付问题,支付问题,支付问题,',
    },
    {
      title: '费用问题',
      content: '费用问题,费用问题,费用问题,费用问题,费用问题,',
    },
    {
      title: '物流问题',
      content: '物流问题,物流问题,物流问题,物流问题,物流问题,',
    },
  ])
  return (
    <View className='container'>
      <View className='head'>
        <Image className='head_image' src='' />
      </View>
      <View className='content'>
        <View className='qs_list'>
          {qsList.length > 0 &&
            qsList.map((item, index: number) => {
              return (
                <View key={index} className='item'>
                  <View className='item_title'>
                    <Text className='title'>{item.title}</Text>
                    <Image
                      className='arrow_icon'
                      src={`${imageUrl}arrow_right@2x.png`}
                    />
                  </View>
                  <View className='item_content'></View>
                </View>
              )
            })}
        </View>
      </View>
    </View>
  )
}

export default Index
