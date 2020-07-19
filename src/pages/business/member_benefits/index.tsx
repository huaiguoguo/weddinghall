import React, { useState } from 'react'
import {
  View,
  Swiper,
  SwiperItem,
  Button,
  Text,
  Image,
} from '@tarojs/components'

import './index.scss'
import { imageUrl } from '@api/baseUrl'

function Index() {
  const [swiperList, setSwiperList] = useState([
    {
      type: 'vip',
      typeBtn: 'card_btn_container_vip',
      typeName: '至尊会员',
      className: 'demo active',
      interestsList: ['会员权益1', '会员权益2', '会员权益3', '会员权益4'],
    },
    {
      type: 'gold',
      typeBtn: 'card_btn_container_gold',
      typeName: '黄金会员',
      className: 'demo',
      interestsList: ['会员权益1', '会员权益2', '会员权益3', '会员权益4'],
    },
    {
      type: 'diamonds',
      typeBtn: 'card_btn_container_diamonds',
      typeName: '钻石会员',
      className: 'demo',
      interestsList: ['会员权益1', '会员权益2', '会员权益3', '会员权益4'],
    },
  ])

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
      <View className='head_bg'>
        <Image
          src={`${imageUrl}business/head_bg@2x.png`}
          className='head_bg_img'
        />
      </View>
      <Swiper
        className='SwiperContainer'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        vertical={false}
        circular
        indicatorDots
        autoplay={false}
        previousMargin='55px'
        nextMargin='55px'
        easing-function='easeOutCubic'
        onChange={handleChangeStart}
        onTransition={handleTransition}
        onAnimationFinish={handleChangeFinish}
      >
        {swiperList.length > 0 &&
          swiperList.map((item, index) => {
            return (
              <SwiperItem key={index} className='item'>
                <View className={item.className + ' ' + item.type}>
                  <View className='hot'>
                    <Image
                      className='fire'
                      src={`${imageUrl}business/fire@2x.png`}
                    />
                  </View>
                  <View className='member_title_container'>
                    <Text className='member_title'>{item.typeName}</Text>
                  </View>
                  <View className='membership_card'>
                    <Image src='' />
                  </View>
                  <View className='content'>
                    {item.interestsList.length > 0 &&
                      item.interestsList.map((interest, index_x) => {
                        return (
                          <Text key={index_x} className='content_item'>
                            {interest}
                          </Text>
                        )
                      })}
                  </View>
                  <View className={'card_btn_container ' + item.typeBtn}>
                    <Text className='card_btn_text'>￥20000</Text>
                  </View>
                </View>
              </SwiperItem>
            )
          })}
      </Swiper>
      <View className='btn_container'>
        <View className='btn'>
          <Text className='btn_text'>充值会员</Text>
        </View>
      </View>
    </View>
  )
}

export default Index
