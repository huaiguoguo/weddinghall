import React, { useState } from 'react'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
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

interface IScene {
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

interface ISceneSku {
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
  }[]
  title: string
}

interface ICurrentScene {
  id: number
  title: string
}

function Index(props: any) {
  const [currentSelectScenes, setCurrentSelectScenes] = useState<
    ICurrentScene[]
  >([])

  const [pptList, setPPtList] = useState<IPPtList[]>([])
  const [sceneList, setSceneList] = useState<IScene[]>([])

  useReady(async () => {
    const sceneIds = Taro.getStorageSync('selectedScene')
    if (sceneIds instanceof Array) {
      setCurrentSelectScenes(sceneIds)
    }

    const { data: pptData } = await http.get('/adszone/getAdsByMark', {
      mark: 'scenario_main',
    })

    const { goods } = await http.get('/goods.lists/index', {
      tid: 3,
    })

    const rawGoods: IScene[] = []
    goods.map((item: ISceneSku, index: number) => {
      const tempGoods: IScene = {
        id: item.id,
        brand_id: item.brand_id,
        images: item.images,
        general_code: item.general_code,
        title: item.title,
        category_ids: item.category_ids,
        price: item.price,
        sku: {
          sku_id: 0,
          goods_id: 0,
          selling_price: '',
          stocks: 0,
        },
      }
      if (item.sku.length > 0) {
        item.sku.map((skuItem, skuIndex: number) => {
          if (skuItem.selling_price == '0.00' || skuItem.selling_price == '') {
            tempGoods.sku = skuItem
          }
        })
      }
      rawGoods.push(tempGoods)
    })

    setPPtList(pptData)
    setSceneList(rawGoods)
  })

  const pushSelected = (selectId: number, selectTitle: string) => {
    const waitPush = { id: selectId, title: selectTitle }

    if (currentSelectScenes.length == 0) {
      setCurrentSelectScenes([waitPush])
    } else {
      let indexFlag = -1
      currentSelectScenes.filter((item, index: number) => {
        if (item.id == selectId && item.title == selectTitle) {
          indexFlag = index
          return
        }
      })

      if (indexFlag > -1) {
        currentSelectScenes.splice(indexFlag, 1)
        setCurrentSelectScenes([...currentSelectScenes])
      } else {
        setCurrentSelectScenes([...currentSelectScenes, waitPush])
      }
    }
  }

  const confirmScene = () => {
    Taro.setStorageSync('selectedScene', currentSelectScenes)
    Taro.navigateBack()
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
                    JSON.stringify(currentSelectScenes).indexOf(
                      JSON.stringify({
                        id: item.sku.sku_id,
                        title: item.title,
                      })
                    ) != -1
                      ? 'scene_item scene_item_active'
                      : 'scene_item'
                  }
                >
                  <View
                    className='scene_item_title'
                    onClick={() => pushSelected(item.sku.sku_id, item.title)}
                  >
                    <View className='title_text_content'>
                      <Text className='title_text'>{item.title}</Text>
                    </View>
                    <View className='title_arrow_content'>
                      {JSON.stringify(currentSelectScenes).indexOf(
                        JSON.stringify({
                          id: item.sku.sku_id,
                          title: item.title,
                        })
                      ) != -1 ? (
                        <Image
                          className='title_arrow'
                          src={`${imageUrl}arrow_top@2x.png`}
                        />
                      ) : (
                        <Image
                          className='title_arrow'
                          src={`${imageUrl}arrow_bottom@2x.png`}
                        />
                      )}
                    </View>
                  </View>
                  {JSON.stringify(currentSelectScenes).indexOf(
                    JSON.stringify({
                      id: item.sku.sku_id,
                      title: item.title,
                    })
                  ) != -1 && (
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
          <View className='btn' onClick={confirmScene}>
            <Text className='btn_text'>确认场景</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
