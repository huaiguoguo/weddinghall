import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'

import http from '../../../api/interceptor'

interface ICategory {
  imageUlr: string
  titleEn: string
  title: string
}

function Category(props: any) {
  const [category, setCategory] = useState<ICategory[]>([])

  useDidShow(() => {
    http.get('', {}).then((res) => {
      setCategory(res.data)
    })
  })

  return (
    <View className='categoryContainer'>
      {category &&
        category.map((item: ICategory, index: number) => {
          return (
            <View className='itemContainer' key={index}>
              <View className='itemContainerContent'>
                <Text className='titleEn'>{item.titleEn}</Text>
                <Text className='title'>{item.title}</Text>
                <Text className='btn'>点击查看</Text>
              </View>
              <View className='itemContainerImg'>
                <Image className='img' src={item.imageUlr} />
              </View>
            </View>
          )
        })}
    </View>
  )
}

export default Category
