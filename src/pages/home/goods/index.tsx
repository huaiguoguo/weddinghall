import React, { useState, useEffect } from 'react'

import { View, Text, Image, Input } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import http from '@api/interceptor'

interface IGoods {}

function Goods(props: any) {
  const [goods, setGoods] = useState<IGoods[]>([])

  useDidShow(async () => {
    const res = await http.get('/goods.lists/index', {
      tid: 1,
      title: '',
      page: 1,
      order: 'create_time',
      sort: 'desc',
    })
    setGoods(res)
  })
  return (
    <View className='goodsContainer'>
      <View className='category'></View>
      <View className='filter_goods'>
        <View className='filter'>这是筛选导航</View>
        <View className='goods_list'>
          {goods.length && (
            <View className='goods'>
              <Image src='' className='goods_img' />
              <View>
                <Image src='' className='reduce' />
                <Input name='goods_num' value='1' />
                <Image src='plus' />
              </View>
            </View>
          )}
        </View>
      </View>
      <View>
        <View className='menu'>
          <Text>礼服</Text>
          <Text>场景</Text>
          <Text>鲜花</Text>
        </View>
        <View className='btn'>
          <Text>下单</Text>
        </View>
      </View>
    </View>
  )
}

export default Goods
