import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import coupon from '../../assets/images/coupon.png'
import dress_appointment from '../../assets/images/dress_appointment_bg@2x.png'
import scene_appointment from '../../assets/images/scene_appointment_bg@2x.png'
import flower_appointment from '../../assets/images/flower_appointment_bg@2x.png'
import './index.scss'

import Swiper from '../../components/Swiper/Swiper'

function Index() {
  return (
    <View className='index'>
      <Swiper />
      <View className='logo'></View>
      <View className='menu'>
        <View className='item dress'>
          <Image src={dress_appointment} className='item_bg' />
          <View className='item_content'>
            <Image src='' className='title_icon' />
            <Text className='title_text'>礼服预约</Text>
          </View>
        </View>
        <View className='item scene'>
          <Image src={scene_appointment} className='item_bg' />
          <View className='item_content'>
            <Image
              src={require('../../assets/images/scene.png')}
              className='title_icon'
            />
            <Text className='title_text'>场景预约</Text>
          </View>
        </View>
        <View className='item flower'>
          <Image src={flower_appointment} className='item_bg' />
          <View className='item_content'>
            <Image
              src={require('../../assets/images/flower.png')}
              className='title_icon'
            />
            <Text className='title_text'>鲜花预约</Text>
          </View>
        </View>
      </View>
      <View>
        <Image src={coupon} />
      </View>
    </View>
  )
}

export default Index
