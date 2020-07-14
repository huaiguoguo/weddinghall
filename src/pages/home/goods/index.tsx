import React, { useState, useEffect } from 'react'

import { View, Text, Image, Input } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import http from '@api/interceptor'

import './index.scss'

interface IGoods {
  imageurl: string
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
  pid: number
  name: string
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
    // const res = await http.get('/goods.type/getMainType', {})
    setFilter([
      {
        pid: 1,
        name: '礼服',
      },
      {
        pid: 2,
        name: '场景',
      },
      {
        pid: 3,
        name: '鲜花',
      },
    ])
  }

  const getGoods = async (cid: number) => {
    // const res = await http.get('/goods.lists/index', {
    //   tid: cid,
    //   title: '',
    //   page: 1,
    //   order: 'create_time',
    //   sort: 'desc',
    // })
    const imgurl = 'http://wd.chenxianlei.com/wxchat/goods/'
    const scene: IGoods[] = []
    if (cid == 1) {
      ;[1, 2, 3, 4, 5, 6].map((item) => {
        scene.push({
          imageurl: `${imgurl}/dress/dress_${item}@2x.png`,
        })
      })
    } else if (cid == 2) {
      scene.push({
        imageurl: `${imgurl}/scene/scene@2x.png`,
      })
    } else if (cid == 3) {
      scene.push({
        imageurl: `${imgurl}/flower/flower_@2x.png`,
      })
    }

    setGoods(scene)
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
                  currentFilterId == item.pid
                    ? 'filter_item filter_active'
                    : 'filter_item'
                }
                onClick={() => getGoods(item.pid)}
              >
                <Text className='filter_item_title'>{item.name}</Text>
              </View>
            )
          })}
      </View>
      <View className='goods_container'>
        {currentFilterId == 1 && (
          <View className='goods_list dress_list'>
            {goods.length &&
              goods.map((item, index: number) => {
                return (
                  <View key={index} className='goods'>
                    <Image src={item.imageurl} className='goods_img' />
                  </View>
                )
              })}
          </View>
        )}

        {currentFilterId == 2 && (
          <View className='goods_list scene_list'>
            {goods.length &&
              goods.map((item, index: number) => {
                return (
                  <View key={index} className='goods'>
                    <Image src={item.imageurl} className='goods_img' />
                  </View>
                )
              })}
          </View>
        )}

        {currentFilterId == 3 && (
          <View className='goods_list flower_list'>
            {goods.length &&
              goods.map((item, index: number) => {
                return (
                  <View key={index} className='goods'>
                    <Image src={item.imageurl} className='goods_img' />
                  </View>
                )
              })}
          </View>
        )}
      </View>
      <View className='menu_container'>
        <View className='menu'>
          <Text className='menu_dress'>礼服</Text>
          <Text className='menu_sence'>场景</Text>
          <Text className='menu_flower'>鲜花</Text>
        </View>
        <View className='place_order'>
          <Text className='order_text'>下单</Text>
        </View>
      </View>
    </View>
  )
}

export default Goods
