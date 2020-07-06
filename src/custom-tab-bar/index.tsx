import React, { useState, useRef } from 'react'
import Taro from '@tarojs/taro'
import { View, CoverView, CoverImage } from '@tarojs/components'
import './tabbar.scss'

interface IItem {
  index: number
  iconPath: string
  selectedIconPath: string
  pagePath: string
  text: string
}

interface ITabBar {
  selected: number
  color: string
  selectedColor: string
  list: IItem[]
}

function CustomTabBar(props: any) {
  const [selected, setSelected] = useState<number>(10)
  const [color, setColor] = useState<string>('black')
  const [selectedColor, setSelectedColor] = useState<string>('blue')
  const [tabBarList, setTabBarList] = useState<IItem[]>([
    {
      index: 1,
      iconPath: '/assets/images/abc_1.png',
      selectedIconPath: '/assets/images/abc_1.png',
      pagePath: 'pages/home/index',
      text: '婚嫁馆',
    },
    {
      index: 2,
      iconPath: '/assets/images/abc_1.png',
      selectedIconPath: '/assets/images/abc_1.png',
      pagePath: 'pages/appointment/index',
      text: '专属热线',
    },
    {
      index: 3,
      iconPath: '/assets/images/abc_2.png',
      selectedIconPath: '/assets/images/ttt.png',
      pagePath: 'pages/business/index',
      text: '商家中心',
    },
  ])

  const switchTab = (item: IItem) => {
    if (item.text == '专属热线') {
      Taro.makePhoneCall({
        phoneNumber: '18xxxxxxxx',
      })
      return false
    }

    console.log('=================这是index值:', item.index)
    setSelected(item.index)
    console.log('=================这是selected:', selected)
    const url = '/' + item.pagePath
    Taro.switchTab({
      url: url,
    })
  }

  return (
    <View>
      <CoverView className='bottom-tab'>
        {tabBarList.map((item, index) => {
          console.log(
            '这是遍历索引: ',
            index,
            '++++++++这是selected:',
            selected
          )
          return (
            <CoverView
              className='bottom-tab-item'
              onClick={() => switchTab(item)}
              data-path={item.pagePath}
              key={item.text}
            >
              <CoverImage
                className='bottom-tab-item-img'
                src={
                  selected === index + 1 ? item.selectedIconPath : item.iconPath
                }
              />
              <CoverView
                className='bottom-tab-item-text'
                style={{
                  color: selected === index + 1 ? selectedColor : color,
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
