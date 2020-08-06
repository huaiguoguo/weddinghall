import React, { useState } from 'react'

import {
  View,
  Text,
  Image,
  Input,
  Swiper,
  SwiperItem,
} from '@tarojs/components'

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

interface IGoodsList {
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
  const [isPopup, setIsPopup] = useState<number>(0)
  const [suitsTotal, setSuitsTotal] = useState<string>('2')

  const [goodsList, setGoodsList] = useState<IGoodsList[]>([])
  const [agreement, setAgreement] = useState<string>('')

  const [currentFlowerIndex, setCurrentFlowerIndex] = useState(0)
  const [currentShuttleService, setCurrentShuttleService] = useState<number>(0)
  const [currentCaterService, setCurrentCaterService] = useState<number>(0)
  const [pptList, setPPtList] = useState<IPPtList[]>([])

  useDidShow(async () => {
    const { data } = await http.get('/adszone/getAdsByMark', {
      mark: 'dress_main',
    })
    setPPtList(data)

    const { goods } = await http.get('/goods.lists/index', {
      tid: 4,
    })
    setGoodsList(goods)

    const { content } = await http.get('/article/detailByName', {
      name: 'fuwumianzexieyi',
    })
    console.log(content)

    setAgreement(content)
  })

  const setShuttleService = (id: number) => {
    if (id == currentShuttleService) {
      setCurrentShuttleService(0)
      return false
    }
    setCurrentShuttleService(id)
  }

  const setCaterService = (id: number) => {
    if (id == currentCaterService) {
      setCurrentCaterService(0)
      return false
    }
    setCurrentCaterService(id)
  }

  const redirectUrl = (url: string) => {
    Taro.navigateTo({ url })
  }

  const confirm = (e) => {
    e.stopPropagation()
    setIsPopup(2)
  }

  const setSuitsReducer = () => {
    if (parseInt(suitsTotal) <= 0) {
      return
    }
    const suits = parseInt(suitsTotal) - 1
    setSuitsTotal(suits.toString())
  }

  const setSuitsPlus = () => {
    if (parseInt(suitsTotal) >= 10) {
      return
    }
    const suits = parseInt(suitsTotal) + 1
    setSuitsTotal(suits.toString())
  }

  return (
    <View className='container'>
      <View className='swiper_container'>
        <Swiper
          className='swiper_content'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
        >
          {pptList.length > 0 &&
            pptList.map((item, index: number) => {
              return (
                <SwiperItem key={index} className='swiper_item'>
                  <Image className='swiper_item_image' src={item.imageurl} />
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

        <View className='business'>
          <View className='list'>
            <View className='list_item'>
              <View className='item_label'>
                <Text className='item_label_text'>商家店名</Text>
              </View>
              <View className='item_input'>
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  placeholder='请输入您的店铺名称'
                />
              </View>
            </View>

            <View className='list_item'>
              <View className='item_label'>
                <Text className='item_label_text'>商家电话</Text>
              </View>
              <View className='item_input'>
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  placeholder='请输入您的电话号码'
                />
              </View>
            </View>

            <View className='list_item'>
              <View className='item_label'>
                <Text className='item_label_text'>选服装日期时间</Text>
              </View>
              <View className='item_input'>
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  placeholder='请选择挑选服装的日期时间'
                />
              </View>
            </View>

            <View className='list_item'>
              <View className='item_label'>
                <Text className='item_label_text'>拍摄日期</Text>
              </View>
              <View className='item_input'>
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  placeholder='请选择日期'
                />
              </View>
            </View>

            <View className='list_item'>
              <View className='item_label'>
                <Text className='item_label_text'>客户姓名</Text>
              </View>
              <View className='item_input'>
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  placeholder='请输入客户姓名'
                />
              </View>
            </View>

            <View className='list_item'>
              <View className='item_label'>
                <Text className='item_label_text'>具体场景</Text>
              </View>
              <View
                className='item_input'
                onClick={() =>
                  redirectUrl('/pages/home/order/scene_selection/index')
                }
              >
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  placeholder='请选择场景'
                />
                <Image
                  className='item_input_arrow'
                  src={`${imageUrl}arrow_right@2x.png`}
                />
              </View>
            </View>

            <View className='list_item suits'>
              <View className='item_label'>
                <Text className='item_label_text'>服装套数</Text>
              </View>
              <View className='item_input'>
                <View
                  className='item_input_reducer_ctn'
                  onClick={setSuitsReducer}
                >
                  <Image
                    className='item_input_reducer'
                    src={`${imageUrl}reducer@2x.png`}
                  />
                </View>
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  value={suitsTotal}
                />
                <View className='item_input_plus_ctn' onClick={setSuitsPlus}>
                  <Image
                    className='item_input_plus'
                    src={`${imageUrl}plus@2x.png`}
                  />
                </View>
              </View>
            </View>

            <View className='list_item'>
              <View className='item_label'>
                <Text className='item_label_text'>备注</Text>
              </View>
              <View className='item_input'>
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  placeholder='请输入备注'
                />
              </View>
            </View>
          </View>
        </View>
        <View className='goods'>
          <View className='goods_item goods_flower'>
            <View className='goods_item_head'>
              <View className='goods_item_head_left'>
                <Text className='goods_item_head_left_text'>鲜花</Text>
              </View>
              <View className='goods_item_head_right'>
                {goodsList.length > 0 &&
                  goodsList.map((item, index: number) => {
                    return (
                      <View
                        key={index}
                        className={
                          currentFlowerIndex == index
                            ? 'goods_item_head_right_btn active'
                            : 'goods_item_head_right_btn'
                        }
                        onClick={() => setCurrentFlowerIndex(index)}
                      >
                        <Text className='goods_item_head_right_btn_text'>
                          {item.title}
                        </Text>
                      </View>
                    )
                  })}
              </View>
            </View>

            <View className='goods_item_content'>
              {goodsList.length > 0 &&
                goodsList[currentFlowerIndex].images &&
                goodsList[currentFlowerIndex].images.length > 0 &&
                goodsList[currentFlowerIndex].images.map(
                  (item, index: number) => {
                    return (
                      <Image
                        key={index}
                        className='goods_item_img'
                        src={item}
                      />
                    )
                  }
                )}
            </View>
          </View>

          <View className='goods_item goods_shuttle'>
            <View className='goods_item_head'>
              <View className='goods_item_head_title'>
                <Text className='goods_item_head_title_text'>接送车服务</Text>
              </View>
              <View className='goods_item_head_right'>
                <Image
                  className='head_arrow_right'
                  src={`${imageUrl}arrow_bottom@2x.png`}
                />
              </View>
            </View>
            <View className='goods_item_content'>
              <View
                onClick={() => setShuttleService(1)}
                className={
                  currentShuttleService == 1
                    ? 'content_item active'
                    : 'content_item'
                }
              >
                <Text className='content_item_text'>1天</Text>
              </View>
              <View
                onClick={() => setShuttleService(2)}
                className={
                  currentShuttleService == 2
                    ? 'content_item active'
                    : 'content_item'
                }
              >
                <Text className='content_item_text'>2天</Text>
              </View>
              <View
                onClick={() => setShuttleService(3)}
                className={
                  currentShuttleService == 3
                    ? 'content_item active'
                    : 'content_item'
                }
              >
                <Text className='content_item_text'>3天</Text>
              </View>
            </View>
          </View>
          <View className='goods_item goods_shuttle'>
            <View className='goods_item_head'>
              <View className='goods_item_head_title'>
                <Text className='goods_item_head_title_text'>配餐</Text>
              </View>
              <View className='goods_item_head_right'>
                <Image
                  className='head_arrow_right'
                  src={`${imageUrl}arrow_bottom@2x.png`}
                />
              </View>
            </View>
            <View className='goods_item_content'>
              <View
                className={
                  currentCaterService == 1
                    ? 'content_item active'
                    : 'content_item'
                }
                onClick={() => setCaterService(1)}
              >
                <Text className='content_item_text'>1天</Text>
              </View>
              <View
                className={
                  currentCaterService == 2
                    ? 'content_item active'
                    : 'content_item'
                }
                onClick={() => setCaterService(2)}
              >
                <Text className='content_item_text'>2天</Text>
              </View>
              <View
                className={
                  currentCaterService == 3
                    ? 'content_item active'
                    : 'content_item'
                }
                onClick={() => setCaterService(3)}
              >
                <Text className='content_item_text'>3天</Text>
              </View>
            </View>
          </View>
        </View>
        <View className='insurance'>
          <View className='insurance_tab'>
            <View className='tab active'>
              <Text className='tab_amount'>¥ 10元起</Text>
              <Text className='tab_title'>乐享旅拍 (A) </Text>
            </View>
            <View className='tab'>
              <Text className='tab_amount'>¥ 5元起</Text>
              <Text className='tab_title'>乐享旅拍 (B) </Text>
            </View>
            <View className='tab'>
              <Text className='tab_amount'>¥ 3元起</Text>
              <Text className='tab_title'>乐享旅拍 (C) </Text>
            </View>
          </View>
          <View className='insurance_content'>
            <View className='content_item'>
              <View className='content_item_label'>
                <Text className='label_text'>意外身故、残疾、烫伤每份保额</Text>
              </View>
              <View className='content_item_value'>
                <Text className='content_item_value_title'>保额:</Text>
                <Text className='content_item_value_amount'>1000000元</Text>
              </View>
            </View>
            <View className='content_item'>
              <View className='content_item_label'>
                <Text className='label_text'>意外医疗每份保额</Text>
              </View>
              <View className='content_item_value'>
                <Text className='content_item_value_title'>保额:</Text>
                <Text className='content_item_value_amount'>10000元</Text>
              </View>
            </View>
            <View className='content_item'>
              <View className='content_item_label'>
                <Text className='label_text'>意外医疗给付比例</Text>
              </View>
              <View className='content_item_value'>
                <Text className='content_item_value_title'>保额:</Text>
                <Text className='content_item_value_amount'>80%元</Text>
              </View>
            </View>
            <View className='content_item'>
              <View className='content_item_label'>
                <Text className='label_text'>意外医疗免赔偿</Text>
              </View>
              <View className='content_item_value'>
                <Text className='content_item_value_title'>保额:</Text>
                <Text className='content_item_value_amount'>1000元</Text>
              </View>
            </View>
          </View>
        </View>
        <View className='agreement'>
          <View className='agreement_left'>
            <View className='agreement_check'>
              <Image className='checked' src={`${imageUrl}right_red@2x.png`} />
            </View>
            <View
              className='agreement_content_text'
              onClick={() => setIsPopup(1)}
            >
              <Text className='agreement_title'>我已阅读并同意</Text>
              <Text className='agreement_exemption'>《服务免责协议》</Text>
            </View>
          </View>
          <View className='agreement_right'>
            <Image
              className='arrow_right'
              src={`${imageUrl}arrow_right@2x.png`}
            />
          </View>
        </View>
        <View className='button'>
          <View
            className='btn'
            onClick={() => redirectUrl('/pages/business/order/detail/index')}
          >
            <Text className='btn_text'>提交预约</Text>
          </View>
        </View>
      </View>

      <View
        className={
          isPopup == 1
            ? 'popupBox popupBoxShow'
            : isPopup == 2
            ? 'popupBox popupBoxHidden'
            : 'popupBox'
        }
      >
        <View
          className={
            isPopup == 1
              ? 'popup_container popup_container_up'
              : isPopup == 2
              ? 'popup_container popup_container_down'
              : 'popup_container'
          }
        >
          {/* <Text className='popup_type'>取消预约</Text> */}
          <View className='popup_content' onClick={confirm}>
            <Text
              dangerouslySetInnerHTML={{ __html: agreement }}
              className='popup_content_item popup_text'
            />
            {/* <Text className='popup_content_item order_sn'>210234567821035</Text>
            <Text className='popup_content_item popup_text'>的预约吗?</Text> */}
          </View>
          {/* <View className='popup_btn_content'>
            <View className='btn_item back' onClick={cancel}>
              <Text className='btn_item_text'>返回</Text>
            </View>
            <View className='btn_item confirm' onClick={confirm}>
              <Text className='btn_item_text'>确定</Text>
            </View>
          </View> */}
        </View>
      </View>
    </View>
  )
}

export default Index
