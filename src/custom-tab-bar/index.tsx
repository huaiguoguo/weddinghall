import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, CoverView, CoverImage } from '@tarojs/components'
import './tabbar.scss'
import { imageUrl } from '@api/baseUrl'

interface IItem {
  index: number
  iconPath: string
  selectedIconPath: string
  pagePath: string
  text: string
  color?: string
}

function CustomTabBar(props: any) {
  const [selected, setSelected] = useState<number>(10)
  const [color, setColor] = useState<string>('#ffffff')
  const [selectedColor, setSelectedColor] = useState<string>('blue')
  const [tabBarList, setTabBarList] = useState<IItem[]>([
    {
      index: 1,
      iconPath: `${imageUrl}home@2x.png`,
      selectedIconPath: `${imageUrl}home@2x.png`,
      pagePath: 'pages/home/index',
      text: '',
    },
    {
      index: 2,
      iconPath: `${imageUrl}phone@2x.png`,
      selectedIconPath: `${imageUrl}phone@2x.png`,
      pagePath: 'pages/appointment/index',
      text: '专属热线',
    },
    {
      index: 3,
      iconPath: `${imageUrl}business@2x.png`,
      selectedIconPath: `${imageUrl}business@2x.png`,
      pagePath: 'pages/business/index',
      text: '商家中心',
    },
  ])

  const switchTab = (item: IItem, index: number) => {
    if (item.text == '专属热线') {
      Taro.makePhoneCall({
        phoneNumber: '400800900',
      })
      return false
    }

    setSelected(index)
    const url = '/' + item.pagePath
    Taro.switchTab({
      url: url,
    })
  }

  return (
    <View>
      <CoverView className='bottom-tab'>
        {tabBarList.map((item, index) => {
          return (
            <CoverView
              className='bottom-tab-item'
              onClick={() => switchTab(item, index)}
              data-path={item.pagePath}
              key={item.text}
            >
              <CoverImage
                className='bottom-tab-item-img'
                src={selected === index ? item.selectedIconPath : item.iconPath}
              />
              <CoverView
                className='bottom-tab-item-text'
                style={{
                  color: 2 === index ? 'rgba(81,81,81,1)' : color,
                }}
              >
                {item.text}
              </CoverView>
            </CoverView>
          )
        })}
      </CoverView>
    </View>
  )
}

export default CustomTabBar
