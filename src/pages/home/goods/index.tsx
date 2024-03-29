import React, { useState, useEffect } from 'react'

import { View, Text, Image } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import http from '@api/interceptor'

import './index.scss'

interface IGoodsFilter {
  tid: string
  order: string
  sort: string
}

interface IGoods {
  id: number
  general_code: string
  title: string
  category_ids: string
  price: string
  brand_id: number
  images: string[]
}

interface IImages {
  id: number
  title: string
  imageurl: string
  linkurl: string
  target: string
  expiretime: number
  weigh: number
}

interface IFilter {
  id: number
  name: string
  en_name: string
}

function Goods(props: any) {
  const [currentFilterId, setCurrentFilterId] = useState<number>(1)
  const [goods, setGoods] = useState<IGoods[]>([])
  const [filter, setFilter] = useState<IFilter[]>([])

  useDidShow(async () => {
    getFilter()
    getGoods(1)
  })

  const getFilter = async () => {
    const res = await http.get('goods.type/getGoodsType', {})
    console.log(res)
    setFilter(res)
  }

  const getGoods = async (cid: number) => {
    const res = await http.get('/goods.lists/index', {
      tid: cid,
      title: '',
      page: 1,
      order: 'create_time',
      sort: 'desc',
    })

    setGoods(res.goods)
    setCurrentFilterId(cid)
  }

  return (
    <View className='goodsContainer'>
      <View className='filter'>
        {filter.length > 0 &&
          filter.map((item, index: number) => {
            return (
              <View
                key={index}
                className={
                  currentFilterId == item.id
                    ? 'filter_item filter_active'
                    : 'filter_item'
                }
                onClick={() => getGoods(item.id)}
              >
                <Text className='filter_item_title'>{item.name}</Text>
              </View>
            )
          })}
      </View>
      <View className='goods_container'>
        {currentFilterId == 1 && (
          <View className='goods_list dress_list'>
            {goods.length > 0 &&
              goods.map((item, index: number) => {
                return (
                  <View key={index} className='goods'>
                    <Image
                      src={item.images.length > 0 ? item.images[0] : ''}
                      className='goods_img'
                    />
                  </View>
                )
              })}
          </View>
        )}

        {currentFilterId == 2 && (
          <View className='goods_list scene_list'>
            {goods.length > 0 &&
              goods.map((item, index: number) => {
                return (
                  <View key={index} className='goods'>
                    <Image
                      src={item.images.length > 0 ? item.images[0] : ''}
                      className='goods_img'
                    />
                  </View>
                )
              })}
          </View>
        )}

        {currentFilterId == 3 && (
          <View className='goods_list flower_list'>
            {goods.length > 0 &&
              goods.map((item, index: number) => {
                return (
                  <View key={index} className='goods'>
                    <Image
                      src={item.images.length > 0 ? item.images[0] : ''}
                      className='goods_img'
                    />
                  </View>
                )
              })}
          </View>
        )}
      </View>
      <View className='menu_container'>
        <View className='menu'>
          {filter.length > 0 &&
            filter.map((item, index) => {
              return (
                <Text key={index} className='menu_dress'>
                  {item.name}
                </Text>
              )
            })}
        </View>
        <View className='place_order'>
          <Text className='order_text'>下单</Text>
        </View>
      </View>
    </View>
  )
}

export default Goods
