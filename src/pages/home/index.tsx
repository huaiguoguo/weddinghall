import React, { useState, useEffect } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import http from '../../api/interceptor'

import Swiper, { ISwiperItem } from '../../components/Swiper/Swiper'
import dress from '../../assets/images/dress.png'
import scene from '../../assets/images/scene.png'
import flower from '../../assets/images/flower.png'

import enjoy from '../../assets/images/enjoy.png'
import millennium from '../../assets/images/millennium@2x.png'

import './index.scss'

function Index() {
  const [swiperList, setSwiperList] = useState<ISwiperItem[]>([])

  useDidShow(() => {
    http
      .get('/adszone/getAdsByMark', {
        mark: 'wxapp_index',
      })
      .then((res) => {
        console.log(res.data)
        setSwiperList(res.data)
      })
  })

  return (
    <View className='container'>
      <Swiper data={swiperList} />
      <View className='logo_container'>
        <Image src={enjoy} className='leftLogo' />
        <Image src={millennium} className='rightLogo' />
      </View>
      <View className='menu'>
        <View className='item dress'>
          <View className='item_content_top'>
            <Image src={dress} className='title_icon' />
            <Text className='title_text'>礼服预约</Text>
          </View>
          <View className='item_content_bottom'>
            <Text className='item_content_bottom_text'>
              The Dress To Make An Appointment
            </Text>
          </View>
        </View>
        <View className='item scene'>
          <View className='item_content_top'>
            <Image src={scene} className='title_icon' />
            <Text className='title_text'>场景预约</Text>
          </View>
          <View className='item_content_bottom'>
            <Text className='item_content_bottom_text'>
              The Scene To Make An Appointment
            </Text>
          </View>
        </View>
        <View className='item flower'>
          <View className='item_content_top'>
            <Image src={flower} className='title_icon' />
            <Text className='title_text'>鲜花预约</Text>
          </View>
          <View className='item_content_bottom'>
            <Text className='item_content_bottom_text'>
              Flowers To Make An Appointment
            </Text>
          </View>
        </View>
      </View>
      <View className='coupon_container'>
        <Text className='coupon_text'>会员优惠</Text>
      </View>
    </View>
  )
}

export default Index
