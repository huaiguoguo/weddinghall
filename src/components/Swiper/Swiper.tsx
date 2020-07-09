import React from 'react'
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
      indicatorActiveColor='orange'
      vertical={false}
      circular
      indicatorDots
      autoplay
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
