import React, { useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import './index.scss'

function Index() {
  const url = 'http://wd.chenxianlei.com/wxchat/business/'

  const [menu, setMenu] = useState([
    {
      name: '充值会员',
      icon: `${url}/wallet@2x.png`,
    },
    {
      name: '会员权益',
      icon: `${url}/an_crown@2x.png`,
    },
    {
      name: '预约选片',
      icon: `${url}/anappointment@2x.png`,
    },
    {
      name: '权限管理',
      icon: `${url}/lock@2x.png`,
    },
    {
      name: '客服帮助',
      icon: `${url}/service@2x.png`,
    },
  ])

  const [orderMenu, setOrderMenu] = useState([
    {
      name: '待确认',
      icon: `${url}/waitting@2x.png`,
    },
    {
      name: '待拍照',
      icon: `${url}/waitting_photo@2x.png`,
    },
    {
      name: '待选片',
      icon: `${url}/waitting_selecte@2x.png`,
    },
    {
      name: '已邮寄',
      icon: `${url}/mailed@2x.png`,
    },
  ])

  return (
    // 个人中心一共分为三部分 【顶部, 菜单, 订单菜单】
    <View className='container'>
      {/* 顶部 */}
      <View className='header_container'>
        <View className='userinfo_container'>
          <View className='user_info'>
            <Image src={`${url}avatar@2x.png`} className='avatar' />
            <View className='info'>
              <Text>xxxx婚纱摄影公司</Text>
              <Text>阿訾姑娘</Text>
            </View>
          </View>
          <View className='setting'>
            <Image src={`${url}setting@2x.png`} className='pic' />
          </View>
        </View>
        <View className='card_container'>
          <View className='card_box'>
            <Text className='card_text'>婚纱馆会员卡</Text>
          </View>
        </View>
        <View className='amount_container'>
          <View className='left'>
            <View className='amount'>
              <Text className='rmb'>¥</Text>
              <Text className='money'>15</Text>
              <Text className='decimal_point'>.00</Text>
            </View>
            <View>
              <Text>账户余额</Text>
            </View>
          </View>
          <View className='right'>
            <View className='amount'>
              <Text className='rmb'>¥</Text>
              <Text className='money'>15</Text>
              <Text className='decimal_point'>.00</Text>
            </View>
            <View>
              <Text>账户余额</Text>
            </View>
          </View>
        </View>
      </View>

      <View className='coupon_container'>
        <View className='coupon'></View>
      </View>

      {/* 菜单 */}
      <View className='menu_container'>
        {menu.length &&
          menu.map((item, index) => {
            return (
              <View key={index} className='menu_item'>
                <Image src={item.icon} className='menu_icon' />
                <Text className='menu_name'>{item.name}</Text>
              </View>
            )
          })}
      </View>

      {/* 我的订单菜单列有 */}
      {/* <View className='order_container'>
        <View className='order_header'>
          <View className='header_title'>
            <Text className='header_title_text'>我的订单</Text>
          </View>
          <View className='header_order_more'>
            <Text className='more_text'>全部订单</Text>
            <Image src={`${url}right@2x.png`} className='right_icon' />
          </View>
        </View>
        <View className='order_menu'>
          {orderMenu.length > 0 &&
            orderMenu.map((item, index) => {
              return (
                <View key={index} className='menu_item'>
                  <Image src={item.icon} className='menu_icon' />
                  <Text className='menu_name'>{item.name}</Text>
                </View>
              )
            })}
        </View>
      </View> */}
    </View>
  )
}

export default Index
