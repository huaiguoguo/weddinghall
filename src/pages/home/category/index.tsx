import React, { useState } from 'react'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'

import { ISwiperItem } from '@components/Swiper/Swiper'
import CustomTabBar from '@components/CustomerTabBar'
import http from '@api/interceptor'

import './index.scss'

export interface ICategoryItem {
  id: number
  pid: string
  name: string
  en_name: string
  desc: string
  images: ISwiperItem[]
}

function Category(props: any) {
  const [category, setCategory] = useState<ICategoryItem[]>([])

  useDidShow(() => {
    http.get('/goods.type/getMainType', {}).then((res) => {
      console.log(res)
      setCategory(res)
    })
  })

  const goodsList = () => {
    Taro.navigateTo({
      url: '/pages/home/goods/index',
    })
  }

  return (
    <View className='categoryContainer'>
      {category &&
        category.map((item: ICategoryItem, index: number) => {
          return (
            <View className='itemContainer' key={index} onClick={goodsList}>
              <View className='itemContainerContent'>
                <View className='itemContainerContentTop'>
                  <Text className='en_name'>{item.en_name}</Text>
                  <Text className='name'>{item.name}分类</Text>
                </View>
                <View className='itemContainerContentBottom'>
                  <Text className='btn'>点击查看</Text>
                </View>
              </View>
              <View className='itemContainerImg'>
                <Swiper
                  className='SwiperContainer'
                  indicatorColor='#999'
                  indicatorActiveColor='orange'
                  vertical={false}
                  circular
                  indicatorDots
                  autoplay
                >
                  {item.images.length &&
                    item.images.map((images, imageIndex) => {
                      return (
                        <SwiperItem key={imageIndex}>
                          <Image className='img' src={images.imageurl} />
                        </SwiperItem>
                      )
                    })}
                </Swiper>
              </View>
            </View>
          )
        })}
      <CustomTabBar />
    </View>
  )
}

export default Category
