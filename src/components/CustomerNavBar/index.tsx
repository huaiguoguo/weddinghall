import React from 'react'

import { View, Image, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { imageUrl } from '@api/baseUrl'
import useNavInfo from '@hooks/useNavInfo'

import './index.scss'

function Index(props: any) {
  const redirectBack = () => {
    Taro.navigateBack()
  }

  // const { appHeaderHeight, capsuleWidth, capsuleHeight } = useNavInfo()

  const {
    statusBarHeight,
    screenWidth,
    screenHeight,
    windowHeight,
  } = Taro.getSystemInfoSync()
  const {
    width,
    height,
    left,
    top,
    right,
  } = Taro.getMenuButtonBoundingClientRect()

  const { appHeaderHeight } = useNavInfo()

  const customerNavContainerStyle = {
    height: 5 + appHeaderHeight + 'px',
  }

  const customerNavBarStyle = {
    top: top + 'px',
  }

  return (
    <View className='customerNavContainer' style={customerNavContainerStyle}>
      <View className='customerNavBar' style={customerNavBarStyle}>
        <Image
          onClick={redirectBack}
          className='left_arrow'
          src={`${imageUrl}business/order/left_arrow@2x.png`}
        />
        <View className='searchContainer'>
          <Image
            className='magnifier'
            src={`${imageUrl}business/order/magnifier@2x.png`}
          />
          <Input
            placeholder-class='placeholder'
            name='search'
            placeholder='搜索我的预约'
            className='search'
          />
        </View>
      </View>
    </View>
  )
}

export default Index
