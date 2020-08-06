import React, { useState } from 'react'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { imageUrl } from '@api/baseUrl'
import http from '@api/interceptor'

import './index.scss'

interface IPPtList {
  expiretime: string
  id: number
  imageurl: string
  linkurl: string
  target: string
  title: string
  weigh: number
}

interface ISceneList {
  brand_id: number
  category_ids: string
  general_code: string
  id: number
  images: string[]
  price: string
  sku: {
    sku_id: number
    goods_id: number
    selling_price: string
    stocks: number
  }
  title: string
}

function Index(props: any) {
  const [currentSelect, setCurrentSelect] = useState<number[]>([])
  const [pptList, setPPtList] = useState<IPPtList[]>([])
  const [sceneList, setSceneList] = useState<ISceneList[]>([])

  useDidShow(async () => {
    const { data: pptData } = await http.get('/adszone/getAdsByMark', {
      mark: 'scenario_main',
    })

    const { goods } = await http.get('/goods.lists/index', {
      tid: 3,
    })

    setPPtList(pptData)
    setSceneList(goods)
  })

  const pushSelected = (selectId: number) => {
    if (!currentSelect.includes(selectId)) {
      setCurrentSelect([...currentSelect, selectId])
    } else {
      const index = currentSelect.indexOf(selectId)
      currentSelect.splice(index, 1)
      setCurrentSelect([...currentSelect])
    }
  }

  return (
    <View className='container'>
      <View className='swiperContainer'>
        <Swiper
          className='ppt_content'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
        >
          {pptList.length > 0 &&
            pptList.map((item, index: number) => {
              return (
                <SwiperItem key={index} className='ppt_item'>
                  <Image className='ppt_item_img' src={item.imageurl} />
                </SwiperItem>
              )
            })}
        </Swiper>
      </View>
      <View className='content'>
        <View className='user'>
          <View className='left'>
            <Image
              className='user_avatar'
              src={`${imageUrl}business/avatar@2x.png`}
            />
            <View className='user_info'>
              {/* <Text className='user_info_item user_company'>
                xxxxx婚纱摄影公司
              </Text> */}
              <Text className='user_info_item user_name'>阿訾姑凉</Text>
              <Text className='user_info_item user_notice'>
                您尚未绑定会员,绑定后可享更多优惠!
              </Text>
            </View>
          </View>
          <View className='right'>
            <View className='bind_btn'>
              <Text className='bind_btn_text'>去绑定</Text>
            </View>
          </View>
        </View>
        <View className='scene_container'>
          {sceneList.length > 0 &&
            sceneList.map((item, index: number) => {
              return (
                <View
                  key={index}
                  className={
                    currentSelect.includes(item.id)
                      ? 'scene_item scene_item_active'
                      : 'scene_item'
                  }
                >
                  <View
                    className='scene_item_title'
                    onClick={() => pushSelected(item.id)}
                  >
                    <View className='title_text_content'>
                      <Text className='title_text'>{item.title}</Text>
                    </View>
                    <View className='title_arrow_content'>
                      {currentSelect.includes(item.id) ? (
                        <Image
                          className='title_arrow'
                          src={`${imageUrl}arrow_bottom@2x.png`}
                        />
                      ) : (
                        <Image
                          className='title_arrow'
                          src={`${imageUrl}arrow_right@2x.png`}
                        />
                      )}
                    </View>
                  </View>
                  {currentSelect.includes(item.id) && (
                    <View className='scene_item_content'>
                      <Swiper
                        className='scene_item_swiper'
                        indicatorColor='#999'
                        indicatorActiveColor='#333'
                        vertical={false}
                        circular
                        indicatorDots
                      >
                        {item.images.length > 0 &&
                          item.images.map((imgItem, imgIndex: number) => {
                            return (
                              <SwiperItem
                                key={imgIndex}
                                className='swiper_item'
                              >
                                <Image
                                  className='swiper_item_img'
                                  src={imgItem}
                                />
                              </SwiperItem>
                            )
                          })}
                      </Swiper>
                    </View>
                  )}
                </View>
              )
            })}
        </View>

        <View className='btn_container'>
          <View className='btn' onClick={() => Taro.navigateBack()}>
            <Text className='btn_text'>确认场景</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
