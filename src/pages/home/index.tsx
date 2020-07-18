import React, { useState } from 'react'
import Taro, { useDidShow, redirectTo } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import http from '@api/interceptor'
import { imageUrl } from '@api/baseUrl'
import SwiperCustom, { ISwiperItem } from '@components/Swiper/Swiper'

import './index.scss'

function Index() {
  const [swiperList, setSwiperList] = useState<ISwiperItem[]>()

  useDidShow(async () => {
    const { data } = await http.get('/adszone/getAdsByMark', {
      mark: 'wxapp_index',
    })
    setSwiperList(data)
  })

  const category = () => {
    Taro.redirectTo({
      url: '/pages/home/category/index',
    })
  }

  const redirectUrl = (url: string) => {
    if (!url) {
      Taro.showToast({
        title: '正在开发中...',
      })
      return false
    }
    Taro.navigateTo({
      url,
    })
    return false
  }

  return (
    <View className='container'>
      {!!swiperList && <SwiperCustom data={swiperList} />}
      <View className='logo_container'>
        <Image src={`${imageUrl}enjoy.png`} className='leftLogo' />
        <Image src={`${imageUrl}millennium.png`} className='rightLogo' />
      </View>
      <View className='menu'>
        <View className='item dress' onClick={category}>
          <View className='item_content_top'>
            <Image src={`${imageUrl}dress.png`} className='title_icon' />
            <Text className='title_text'>礼服预约</Text>
          </View>
          <View className='item_content_bottom'>
            <Text className='item_content_bottom_text'>
              The Dress To Make An Appointment
            </Text>
          </View>
        </View>
        <View className='item scene' onClick={category}>
          <View className='item_content_top'>
            <Image src={`${imageUrl}scene.png`} className='title_icon' />
            <Text className='title_text'>场景预约</Text>
          </View>
          <View className='item_content_bottom'>
            <Text className='item_content_bottom_text'>
              The Scene To Make An Appointment
            </Text>
          </View>
        </View>
        <View className='item flower' onClick={category}>
          <View className='item_content_top'>
            <Image src={`${imageUrl}flower.png`} className='title_icon' />
            <Text className='title_text'>鲜花预约</Text>
          </View>
          <View className='item_content_bottom'>
            <Text className='item_content_bottom_text'>
              Flowers To Make An Appointment
            </Text>
          </View>
        </View>
      </View>
      <View
        className='coupon_container'
        onClick={() => redirectUrl('/pages/business/member_benefits/index')}
      >
        <Text className='coupon_text'>会员权益</Text>
      </View>
    </View>
  )
}

export default Index
