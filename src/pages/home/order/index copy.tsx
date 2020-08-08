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
import refreshToken from '@utils/token'

import qs from 'qs'

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

interface IGoods {
  brand_id: number
  category_ids: string
  general_code: string
  goods_type_id: number
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

const initValue = {
  brand_id: 0,
  category_ids: '',
  general_code: '',
  goods_type_id: 0,
  id: 0,
  images: [],
  price: '',
  sku: {
    sku_id: 0,
    goods_id: 0,
    selling_price: '',
    stocks: 0,
  },
  title: '',
}

function Index(props: any) {
  const [isPopup, setIsPopup] = useState<number>(0)
  const [suitsTotal, setSuitsTotal] = useState<string>('0')

  const [storeName, setStoreName] = useState<string>('')
  const [storeMobile, setStoreMobile] = useState<string>('')
  const [customerName, setCustomerName] = useState<string>('')
  const [selectClothingDate, setSelectClothingDate] = useState<string>('')
  const [shotDate, setShotDate] = useState<string>('')
  const [remark, setRemark] = useState<string>('')

  const [clothing, setClothing] = useState<IGoods>(initValue)
  const [flowerList, setFlowerList] = useState<IGoods[]>([])
  const [shuttle, setShuttle] = useState<IGoods>(initValue)
  const [cater, setCater] = useState<IGoods>(initValue)
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

    const goodsUrl = '/goods.lists/index'
    const { goods } = await http.get(goodsUrl)

    const goodsFlowers: IGoods[] = []

    goods.map((item: IGoods, index: number) => {
      if (item.goods_type_id == 1) {
        setClothing(item)
      } else if (item.goods_type_id == 4) {
        goodsFlowers.push(item)
      } else if (item.goods_type_id == 9) {
        setShuttle(item)
      } else if (item.goods_type_id == 10) {
        setCater(item)
      }
    })

    setFlowerList(goodsFlowers)

    const { content } = await http.get('/article/detailByName', {
      name: 'fuwumianzexieyi',
    })
    setAgreement(content)
  })

  const setShuttleService = (num: number) => {
    if (num == currentShuttleService) {
      setCurrentShuttleService(0)
      return false
    }
    setCurrentShuttleService(num)
  }

  const setCaterService = (num: number) => {
    if (num == currentCaterService) {
      setCurrentCaterService(0)
      return false
    }
    setCurrentCaterService(num)
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

  const submitForm = () => {
    // const token = refreshToken()

    // console.log(token)
    // return false

    //先请求 添加购物车

    const datas: { id: number; num: number }[] = []

    datas.push({
      id: flowerList[currentFlowerIndex].sku.sku_id,
      num: 1,
    })

    datas.push({
      id: shuttle.sku.sku_id,
      num: currentShuttleService,
    })

    datas.push({
      id: cater.sku.sku_id,
      num: currentCaterService,
    })

    //服装套数
    datas.push({
      id: clothing.sku.sku_id,
      num: parseInt(suitsTotal),
    })

    const sceneList = Taro.getStorageSync('sceneIds')
    if (!sceneList) {
      Taro.showModal({
        title: '请选择场景',
      })
      return false
    }
    sceneList.map((item: number) => {
      datas.push({
        id: item,
        num: 1,
      })
    })

    const dataStringify = JSON.stringify(datas)

    http.post('cart/addsome', { datas: dataStringify }).then((res) => {
      // console.log(res)
      // Taro.showModal({
      //   title: '订单成功...',
      // })
    })

    // Taro.removeStorageSync('sceneIds')
    // 再请求 提交订单接口
    const orderData = {
      fitting_time: selectClothingDate,
      photo_time: shotDate,
      client_name: customerName,
    }
    const orderDataStr = qs.stringify(orderData)

    http.post('cart/done', orderDataStr).then((res) => {
      console.log(res)
    })
    // redirectUrl('/pages/business/order/detail/index')
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
                  onInput={(e) => setStoreName(e.detail.value)}
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
                  onInput={(e) => setStoreMobile(e.detail.value)}
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
                  onInput={(e) => setSelectClothingDate(e.detail.value)}
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
                  placeholder='请选择拍摄日期'
                  onInput={(e) => setShotDate(e.detail.value)}
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
                  onInput={(e) => setCustomerName(e.detail.value)}
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
                  onInput={(e) => setRemark(e.detail.value)}
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
                {flowerList.length > 0 &&
                  flowerList.map((item, index: number) => {
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
              {flowerList.length > 0 &&
                flowerList[currentFlowerIndex].images &&
                flowerList[currentFlowerIndex].images.length > 0 &&
                flowerList[currentFlowerIndex].images.map(
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
          <View className='btn' onClick={submitForm}>
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
