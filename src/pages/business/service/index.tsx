import React, { useState } from 'react'
import { View, Text, Image, RichText } from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'

import interceptor from '@api/interceptor'
import { imageUrl } from '@api/baseUrl'

import './index.scss'

interface IQsList {
  id: number
  name: string
  title: string
  thumbnail: string
  content: string
}

function Index(props: any) {
  const [active, setActive] = useState(0)
  const [phoneNumberValue, setPhoneNumber] = useState<string>('')
  const [qsList, setQsList] = useState<IQsList[]>([])

  useReady(async () => {
    const responseQsList = await interceptor.get('faq/index')
    setQsList(responseQsList)
    console.log(responseQsList)

    const initInfo = await interceptor.get('common/init')
    setPhoneNumber(initInfo?.tel)
  })

  const toggleHandle = (id: number) => {
    if (active == id) {
      setActive(0)
      return
    }
    setActive(id)
  }

  const callPhone = () => {
    Taro.makePhoneCall({
      phoneNumber: phoneNumberValue,
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
                    {/* <Text
                      className='item_content_text'
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    ></Text> */}
                    <RichText
                      className='item_content_text'
                      nodes={item.content}
                    />
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
