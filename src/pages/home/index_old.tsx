import React, { useState } from 'react'
import Taro, { useDidShow, redirectTo } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import http from '@api/interceptor'
import { baseUrl, imageUrl } from '@api/baseUrl'
import SwiperCustom, { ISwiperItem } from '@components/Swiper/Swiper'

import useNavInfo from '@hooks/useNavInfo'

import './index.scss'

function Index() {
  const [swiperList, setSwiperList] = useState<ISwiperItem[]>()

  useDidShow(async () => {
    const { data } = await http.get('/adszone/getAdsByMark', {
      mark: 'wxapp_index',
    })
    setSwiperList(data)

    Taro.login({
      success: async function (res) {
        const test = await http.post('wxuser/getTokenByWxcode', {
          code: res.code,
        })
      },
    })
  })

  const category = () => {
    Taro.redirectTo({
      url: '/pages/home/category/index',
    })
  }

  const redirectUrl = (url: string) => {
    if (!url) {
      Taro.showToast({
        title: '正在开发中...',
      })
      return false
    }
    Taro.navigateTo({
      url,
    })
    return false
  }

  const { appHeaderHeight } = useNavInfo()
  const { height } = Taro.getMenuButtonBoundingClientRect()

  const StatusNavStyle = {
    height: height,
    top: appHeaderHeight - height - 2 + 'px',
  }

  return (
    <View className='container'>
      <View className='navigationBarTitle' style={StatusNavStyle}>
        <Text className='navigationBarTitleText'>婚嫁馆</Text>
      </View>
      {!!swiperList && <SwiperCustom data={swiperList} />}
      <View className='logo_container'>
        <Image src={`${imageUrl}enjoy.png`} className='leftLogo' />
        <Image src={`${imageUrl}millennium.png`} className='rightLogo' />
      </View>
      <View className='menu'>
        <View className='menu_container'>
          <View className='item' onClick={category}>
            <Image
              src={`${imageUrl}home/dress@2x.png`}
              className='title_icon'
            />
            <Text className='title_text'>礼服预约</Text>
          </View>
          <View className='item' onClick={category}>
            <Image
              src={`${imageUrl}home/scene@2x.png`}
              className='title_icon'
            />
            <Text className='title_text'>场景预约</Text>
          </View>
          <View className='item' onClick={category}>
            <Image
              src={`${imageUrl}home/flower@2x.png`}
              className='title_icon'
            />
            <Text className='title_text'>鲜花预约</Text>
          </View>
          <View className='item' onClick={category}>
            <Image
              src={`${imageUrl}home/selection@2x.png`}
              className='title_icon'
            />
            <Text className='title_text'>选片预约</Text>
          </View>
          <View className='item' onClick={category}>
            <Image src={`${imageUrl}home/car@2x.png`} className='title_icon' />
            <Text className='title_text'>接送预约</Text>
          </View>
          <View className='item' onClick={category}>
            <Image
              src={`${imageUrl}home/catering@2x.png`}
              className='title_icon'
            />
            <Text className='title_text'>配餐预约</Text>
          </View>
          <View className='item'></View>
          <View className='item'></View>
        </View>
      </View>
      <View
        className='coupon_container'
        onClick={() => redirectUrl('/pages/business/member_benefits/index')}
      >
        <Text className='coupon_text'>会员权益</Text>
      </View>
    </View>
  )
}

export default Index
