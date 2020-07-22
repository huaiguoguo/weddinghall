import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { imageUrl } from '@api/baseUrl'
import './index.scss'

function Index(props: any) {
  const [active, setActive] = useState(0)
  const [qsList, setQsList] = useState([
    {
      id: 1,
      title: '预约问题',
      content:
        '预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,预约问题,',
    },
    {
      id: 2,
      title: '支付问题',
      content: '支付问题,支付问题,支付问题,支付问题,支付问题,',
    },
    {
      id: 3,
      title: '费用问题',
      content: '费用问题,费用问题,费用问题,费用问题,费用问题,',
    },
    {
      id: 4,
      title: '物流问题',
      content: '物流问题,物流问题,物流问题,物流问题,物流问题,',
    },
  ])

  const toggleHandle = (id: number) => {
    if (active == id) {
      setActive(0)
      return
    }
    setActive(id)
  }

  const callPhone = () => {
    Taro.makePhoneCall({
      phoneNumber: '88888888',
    })
    return false
  }

  return (
    <View className='container'>
      <View className='head'>
        <Image
          className='head_image'
          src={`${imageUrl}business/service_head@2x.png`}
        />
        <View className='head_btn' onClick={callPhone}>
          <Image
            className='head_btn_icon'
            src={`${imageUrl}business/service_headset@2x.png`}
          />
          <Text className='head_btn_text'>客服热线</Text>
        </View>
      </View>
      <View className='content'>
        <View className='qs_list'>
          {qsList.length > 0 &&
            qsList.map((item, index: number) => {
              return (
                <View
                  key={index}
                  className={active == item.id ? 'item active' : 'item'}
                  onClick={() => toggleHandle(item.id)}
                >
                  <View className='item_title'>
                    <Text className='title'>{item.title}</Text>
                    <Image
                      className='arrow_icon'
                      src={`${imageUrl}arrow_right@2x.png`}
                    />
                  </View>
                  <View className='item_content'>
                    <Text className='item_content_text'>{item.content}</Text>
                  </View>
                </View>
              )
            })}
        </View>
      </View>
    </View>
  )
}

export default Index
