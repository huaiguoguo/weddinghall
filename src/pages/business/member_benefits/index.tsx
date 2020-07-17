import React, { useState } from 'react'
import { View, Swiper, SwiperItem, Button, Text } from '@tarojs/components'

import './index.scss'

function Index() {
  const [swiperList, setSwiperList] = useState([
    {
      className: 'demo active',
      content: '这是测试内容One',
    },
    {
      className: 'demo',
      content: '这是测试内容2',
    },
    {
      className: 'demo',
      content: '这是测试内容3',
    },
    {
      className: 'demo',
      content: '这是测试内容4',
    },
  ])

  const [dx, setDx] = useState(19)

  const handleChangeStart = (e) => {}

  const handleTransition = (e) => {}

  const handleChangeFinish = ({ detail }) => {
    setSwiperList(
      swiperList.map((item, index) => {
        if (index == detail.current) {
          item.className = 'demo active'
        } else {
          item.className = 'demo'
        }
        return item
      })
    )
  }

  return (
    <View className='container'>
      <Swiper
        className='SwiperContainer'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        vertical={false}
        circular
        indicatorDots
        autoplay={false}
        previousMargin='50px'
        nextMargin='50px'
        easing-function='easeOutCubic'
        onChange={handleChangeStart}
        onTransition={handleTransition}
        onAnimationFinish={handleChangeFinish}
      >
        {swiperList.length > 0 &&
          swiperList.map((item, index) => {
            return (
              <SwiperItem key={index} className='item'>
                <View className={item.className}>{item.content}</View>
              </SwiperItem>
            )
          })}
      </Swiper>
      <View className='btn_container' style={{ marginTop: '43px' }}>
        <View className='btn'>
          <Text className='btn_text'>充值会员</Text>
        </View>
      </View>
    </View>
  )
}

export default Index
