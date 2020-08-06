import React, { useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import SwiperCustom, { ISwiperItem } from '@components/Swiper/Swiper'

import { imageUrl } from '@api/baseUrl'
import http from '@api/interceptor'

import './index.scss'

function Index() {
  const [swiperList, setSwiperList] = useState<ISwiperItem[]>()

  useDidShow(async () => {
    const { data } = await http.get('/adszone/getAdsByMark', {
      mark: 'wxapp_index',
    })

    setSwiperList(data)
    // console.log(swiperList)
    // Taro.login({
    //   success: async function (res) {
    //     const test = await http.post('wxuser/getTokenByWxcode', {
    //       code: res.code,
    //     })
    //   },
    // })
  })

  const category = (url: string) => {
    Taro.redirectTo({ url })
  }

  const redirectUrl = (url: string) => {
    if (!url) {
      Taro.showToast({
        title: '正在开发中...',
      })
      return false
    }
    Taro.redirectTo({
      url,
    })
    return false
  }

  return (
    <View className='container'>
      {!!swiperList && <SwiperCustom data={swiperList} />}
      <View className='logo_container'>
        <Image src={`${imageUrl}home/enjoy_travel@2x.png`} className='logo' />
      </View>
      <View className='menu'>
        <View
          className='item dress'
          onClick={() => category('/pages/home/order/index')}
        >
          <View className='item_content_top'>
            <Image
              src={`${imageUrl}home/clock@2x.png`}
              className='title_icon'
            />
            <Text className='title_text'>立即预约</Text>
          </View>
          <View className='item_content_bottom'>
            <Text className='item_content_bottom_text'>
              To Make An Appointment Immediately
            </Text>
          </View>
        </View>
        <View
          className='item scene'
          onClick={() => category('/pages/business/selection/index')}
        >
          <View className='item_content_top'>
            <Image
              src={`${imageUrl}home/photograph@2x.png`}
              className='title_icon'
            />
            <Text className='title_text'>选片预约</Text>
          </View>
          <View className='item_content_bottom'>
            <Text className='item_content_bottom_text'>
              Selected Photos To Make An Appointment
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
