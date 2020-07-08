import React from 'react'
import Taro, { useTabItemTap } from '@tarojs/taro'
import { Swiper, SwiperItem, Image } from '@tarojs/components'
import './swiper.scss'

export interface ISwiperItem {
  id: number
  title: string
  imageurl: string
  linkurl: string
  target: string
  expiretime: string
  weigh: number
}

function SwiperCustom(props: any) {
  const { data } = props

  return (
    <Swiper
      className='swiperContent'
      indicatorColor='#999'
      indicatorActiveColor='#333'
      vertical={false}
      circular
      indicatorDots
    >
      {data &&
        data.map((item: ISwiperItem, index: number) => {
          return (
            <SwiperItem key={index} className='swiper-item'>
              <Image src={item.imageurl} className='item-img' />
            </SwiperItem>
          )
        })}
    </Swiper>
  )
}

export default SwiperCustom
