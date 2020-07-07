import React from 'react'
import Taro, { useTabItemTap } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import banner from '../../assets/images/business.png'
import './swiper.scss'

function SwiperCustom(props: any) {
  return (
    <Swiper
      className='swiper'
      indicatorColor='#999'
      indicatorActiveColor='#333'
      vertical={false}
      circular
      indicatorDots
    >
      <SwiperItem className='swiper-item'>
        <Image src={banner} className='item-img' />
      </SwiperItem>
    </Swiper>
  )
}

export default SwiperCustom
