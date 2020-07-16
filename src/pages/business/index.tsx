import React, { useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'

import './index.scss'

function Index() {
  const businessImageUrl = 'http://wd.chenxianlei.com/wxchat/business/'

  const [menu, setMenu] = useState([
    {
      name: '充值会员',
      icon: `${businessImageUrl}/wallet@2x.png`,
      url: '',
    },
    {
      name: '会员权益',
      icon: `${businessImageUrl}/an_crown@2x.png`,
      url: '',
    },
    {
      name: '预约选片',
      icon: `${businessImageUrl}/anappointment@2x.png`,
      url: '',
    },
    {
      name: '权限管理',
      icon: `${businessImageUrl}/lock@2x.png`,
      url: '/pages/business/authority/index',
    },
    {
      name: '客服帮助',
      icon: `${businessImageUrl}/service@2x.png`,
      url: '',
    },
  ])

  const [orderMenu, setOrderMenu] = useState([
    {
      name: '待确认',
      icon: `${businessImageUrl}/waitting@2x.png`,
      url: '',
    },
    {
      name: '待拍照',
      icon: `${businessImageUrl}/waitting_photo@2x.png`,
      url: '',
    },
    {
      name: '待选片',
      icon: `${businessImageUrl}/waitting_selecte@2x.png`,
      url: '',
    },
    {
      name: '已邮寄',
      icon: `${businessImageUrl}/mailed@2x.png`,
      url: '',
    },
  ])

  const redirectTo = (url: string) => {
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

  return (
    // 个人中心一共分为三部分 【顶部, 菜单, 订单菜单】
    <View className='container'>
      {/* 顶部 */}
      <View className='header_container'>
        <Image
          src={`${businessImageUrl}header_background@2x.png`}
          className='header_bg'
        />
        <View className='header_content'>
          <View className='userinfo_container'>
            <View className='user_info'>
              <Image
                src={`${businessImageUrl}avatar@2x.png`}
                className='avatar'
              />
              <View className='info'>
                <Text className='company'>xxxx婚纱摄影公司</Text>
                <Text className='username'>阿訾姑娘</Text>
              </View>
            </View>
            <View
              className='setting'
              onClick={() => redirectTo('/pages/business/setting/index')}
            >
              <Image
                src={`${businessImageUrl}setting@2x.png`}
                className='pic'
              />
            </View>
          </View>
          <View className='card_container'>
            <View className='card_box'>
              <Text className='card_text'></Text>
            </View>
          </View>
          <View className='amount_container'>
            <View className='left'>
              <View className='amount'>
                <Text className='rmb'>¥</Text>
                <Text className='money'>1556</Text>
                <Text className='decimal_point'>.00</Text>
              </View>
              <View className='account'>
                <Text>账户余额(元)</Text>
              </View>
            </View>
            <View className='right'>
              <View className='amount'>
                <Text className='rmb'>¥</Text>
                <Text className='money'>5689</Text>
                <Text className='decimal_point'>.00</Text>
              </View>
              <View className='account'>
                <Text>累积优惠(元)</Text>
              </View>
            </View>
          </View>
          <View className='coupon_container'>
            <Image
              src={`${businessImageUrl}coupon_bg@2x.png`}
              className='coupon_bg'
            />
            <View className='coupon_content'>
              <View className='coupon_content_left'>
                <Image
                  src={`${businessImageUrl}victory@2x.png`}
                  className='coupon_vip'
                />
                <Text className='coupon_text'>加入会员即可获得丰厚优惠</Text>
              </View>
              <View className='coupon_content_right'>
                <Text className='coupon_btn'>查看会员权益</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 菜单 */}
      <View className='menu_container'>
        {menu.length &&
          menu.map((item, index) => {
            return (
              <View
                key={index}
                className='menu_item'
                onClick={() => redirectTo(item.url)}
              >
                <Image src={item.icon} className='menu_icon' />
                <Text className='menu_name'>{item.name}</Text>
              </View>
            )
          })}
      </View>

      {/* 我的订单菜单列有 */}
      <View className='order_container'>
        <View className='order_header'>
          <View className='header_title'>
            <Text className='header_title_text'>我的订单</Text>
          </View>
          <View className='header_order_more'>
            <Text className='more_text'>全部订单</Text>
            <Image
              src={`${businessImageUrl}right@2x.png`}
              className='right_icon'
            />
          </View>
        </View>
        <View className='order_menu'>
          {orderMenu.length > 0 &&
            orderMenu.map((item, index) => {
              return (
                <View
                  key={index}
                  className='menu_item'
                  onClick={() => redirectTo(item.url)}
                >
                  <Image src={item.icon} className='menu_icon' />
                  <Text className='menu_name'>{item.name}</Text>
                </View>
              )
            })}
        </View>
      </View>
    </View>
  )
}

export default Index
