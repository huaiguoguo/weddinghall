import React, { useState } from 'react'

import {
  View,
  Text,
  Image,
  Input,
  Swiper,
  SwiperItem,
} from '@tarojs/components'

import Taro, { useDidShow, getStorageSync } from '@tarojs/taro'
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
  const [isActive, setIsActive] = useState<number>(0)
  const [suitsTotal, setSuitsTotal] = useState<string>('0')
  const [shuttleTotal, setShuttleTotal] = useState<string>('0')
  const [caterTotal, setCaterTotal] = useState<string>('0')

  const [storeName, setStoreName] = useState<string>('')
  const [storeMobile, setStoreMobile] = useState<string>('')
  const [customerName, setCustomerName] = useState<string>('')
  const [selectClothingDate, setSelectClothingDate] = useState<string>('')
  const [shotDate, setShotDate] = useState<string>('')
  const [remark, setRemark] = useState<string>('')

  const [clothing, setClothing] = useState<IGoods>(initValue)
  const [flowerList, setFlowerList] = useState<IGoods[]>([])
  const [shuttleList, setShuttleList] = useState<IGoods[]>([])
  const [caterList, setCaterList] = useState<IGoods[]>([])
  const [agreement, setAgreement] = useState<string>('')

  const [currentFlowerIndex, setCurrentFlowerIndex] = useState<number>(0)
  const [currentShuttleIndex, setCurrentShuttleIndex] = useState<number>(0)
  const [currentCaterIndex, setCurrentCaterIndex] = useState<number>(0)
  const [pptList, setPPtList] = useState<IPPtList[]>([])

  useDidShow(async () => {
    // Taro.navigateTo({
    //   url: '/pages/business/order/detail/index?order_id=22',
    // })
    refreshToken()
    const { data } = await http.get('/adszone/getAdsByMark', {
      mark: 'dress_main',
    })
    setPPtList(data)

    const company_name = getStorageSync('company_name')
    const company_mobile = getStorageSync('company_mobile')

    setStoreName(company_name)
    setStoreMobile(company_mobile)

    const goodsUrl = '/goods.lists/index'
    const { goods } = await http.get(goodsUrl)

    const goodsFlowers: IGoods[] = []
    const goodsShuttles: IGoods[] = []
    const goodsCaters: IGoods[] = []

    goods.map((item: IGoods, index: number) => {
      if (item.goods_type_id == 1) {
        setClothing(item)
      } else if (item.goods_type_id == 4) {
        goodsFlowers.push(item)
      } else if (item.goods_type_id == 9) {
        goodsShuttles.push(item)
      } else if (item.goods_type_id == 10) {
        goodsCaters.push(item)
      }
    })

    setFlowerList(goodsFlowers)
    setShuttleList(goodsShuttles)
    setCaterList(goodsCaters)

    const { content } = await http.get('/article/detailByName', {
      name: 'fuwumianzexieyi',
    })
    setAgreement(content)
  })

  const setCurrentShuttleService = (num: number) => {
    if (num == currentCaterIndex) {
      setCurrentShuttleIndex(0)
      return false
    }
    setCurrentShuttleIndex(num)
  }

  const setCurrentCaterService = (num: number) => {
    if (num == currentCaterIndex) {
      setCurrentCaterIndex(0)
      return false
    }
    setCurrentCaterIndex(num)
  }

  const redirectUrl = (url: string) => {
    Taro.navigateTo({ url })
  }

  // 协议确认
  const confirm = (e) => {
    e.stopPropagation()
    setIsPopup(2)
  }
  // 服装套数减
  const setSuitsReducer = () => {
    if (parseInt(suitsTotal) <= 0) {
      return
    }
    const suits = parseInt(suitsTotal) - 1
    setSuitsTotal(suits.toString())
  }

  // 服装套数加
  const setSuitsPlus = () => {
    if (parseInt(suitsTotal) >= 10) {
      return
    }
    const suits = parseInt(suitsTotal) + 1
    setSuitsTotal(suits.toString())
  }
  // 接送车服务减
  const setShuttleReducer = () => {
    if (parseInt(shuttleTotal) <= 0) {
      return
    }
    const shuttleTota = parseInt(shuttleTotal) - 1
    setShuttleTotal(shuttleTota.toString())
  }
  // 接送车服务加
  const setShuttlePlus = () => {
    if (parseInt(shuttleTotal) >= 10) {
      return
    }
    const shuttleTota = parseInt(shuttleTotal) + 1
    setShuttleTotal(shuttleTota.toString())
  }
  // 接送车服务减
  const setCaterReducer = () => {
    if (parseInt(caterTotal) <= 0) {
      return
    }
    const caterTota = parseInt(caterTotal) - 1
    setCaterTotal(caterTota.toString())
  }
  // 接送车服务加
  const setCaterPlus = () => {
    console.log(caterTotal)
    if (parseInt(caterTotal) >= 10) {
      return
    }
    const caterTota = parseInt(caterTotal) + 1
    setCaterTotal(caterTota.toString())
  }

  // 配餐服务
  const toggleActive = () => {
    if (isActive) {
      setCaterTotal('0')
      setIsActive(0)
    } else {
      setCaterTotal('5')
      setIsActive(1)
    }
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

    // 把接送车服务的数据加入 data数据包
    datas.push({
      id: shuttleList[currentShuttleIndex].sku.sku_id,
      num: parseInt(shuttleTotal),
    })

    // 把配餐的数据加入 data数据包
    datas.push({
      id: caterList[currentCaterIndex].sku.sku_id,
      num: parseInt(caterTotal),
    })

    // 服装套数
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
      const company_name = getStorageSync('company_name')
      const company_mobile = getStorageSync('company_mobile')

      const orderData = {
        fitting_time: selectClothingDate,
        photo_time: shotDate,
        client_name: customerName,
        company_name,
        company_mobile,
      }
      // const orderDataStr = qs.stringify(orderData)
      http.post('cart/done', orderData).then((doneRes) => {
        Taro.showToast({
          title: '订单提交成功',
          icon: 'success',
          duration: 5000,
          success: function () {
            // redirectUrl('/pages/business/order/detail/index')
            Taro.navigateTo({
              url:
                '/pages/business/order/detail/index?order_id=' +
                doneRes.order_id,
            })
          },
        })
      })
    })
    // Taro.removeStorageSync('sceneIds')
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
                  value={storeName}
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
                  value={storeMobile}
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

            {/* <View className='goods_item_content'>
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
            </View> */}
          </View>

          <View className='goods_item goods_shuttle'>
            <View className='goods_item_head'>
              <View className='goods_item_head_title'>
                <Text className='goods_item_head_title_text'>接送车服务</Text>
              </View>
              <View className='goods_item_head_right'>
                <View
                  className='item_input_reducer_ctn'
                  onClick={setShuttleReducer}
                >
                  <Image
                    className='item_input_reducer'
                    src={`${imageUrl}reducer@2x.png`}
                  />
                </View>
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  value={shuttleTotal}
                />
                <View className='item_input_plus_ctn' onClick={setShuttlePlus}>
                  <Image
                    className='item_input_plus'
                    src={`${imageUrl}plus@2x.png`}
                  />
                </View>
              </View>
            </View>
            <View className='goods_item_content'>
              {shuttleList.length > 0 &&
                shuttleList.map((item, index) => {
                  return (
                    <View
                      key={index}
                      onClick={() => setCurrentShuttleService(index)}
                      className={
                        currentShuttleIndex == index
                          ? 'content_item active'
                          : 'content_item'
                      }
                    >
                      <Text className='content_item_text'>{item.title}</Text>
                    </View>
                  )
                })}
            </View>
          </View>
          <View className='goods_item goods_shuttle'>
            <View
              className={
                isActive ? 'goods_item_head active' : 'goods_item_head'
              }
              onClick={toggleActive}
            >
              <View className='goods_item_head_title'>
                <Text className='goods_item_head_title_text'>配餐</Text>
              </View>
              <View className='goods_item_head_right'>
                <View
                  className='item_input_reducer_ctn'
                  onClick={setCaterReducer}
                >
                  <Image
                    className='item_input_reducer'
                    src={`${imageUrl}reducer@2x.png`}
                  />
                </View>
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  value={caterTotal}
                />
                <View className='item_input_plus_ctn' onClick={setCaterPlus}>
                  <Image
                    className='item_input_plus'
                    src={`${imageUrl}plus@2x.png`}
                  />
                </View>
              </View>
            </View>
            {/* <View className='goods_item_content'>
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
            </View> */}
          </View>
        </View>
        {/*  
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
        
      */}
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
