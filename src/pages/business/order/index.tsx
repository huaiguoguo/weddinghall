import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import NavBar from '@components/CustomerNavBar/index'
import { imageUrl } from '@api/baseUrl'

import useNavInfo from '@hooks/useNavInfo'

import './index.scss'

function Index(props: any) {
  const [currentNav, setCurrentNav] = useState(1)
  const [orderList, setOrderList] = useState([
    {
      status: 1,
      userInfo: {
        username: '张三',
      },
      goods: [
        {
          goods_image: `${imageUrl}business/order/ttt@2x.png`,
          goods_name: '场景XXXXXXXXXX',
        },
        {
          goods_image: `${imageUrl}business/order/ttt@2x.png`,
          goods_name: '场景XXXXXXXXXX',
        },
        {
          goods_image: `${imageUrl}business/order/ttt@2x.png`,
          goods_name: '场景XXXXXXXXXX',
        },
      ],
    },
    {
      status: 1,
      userInfo: {
        username: '张三',
      },
      goods: [
        {
          goods_image: `${imageUrl}business/order/ttt@2x.png`,
          goods_name: '场景XXXXXXXXXX',
        },
        {
          goods_image: `${imageUrl}business/order/ttt@2x.png`,
          goods_name: '场景XXXXXXXXXX',
        },
        {
          goods_image: `${imageUrl}business/order/ttt@2x.png`,
          goods_name: '场景XXXXXXXXXX',
        },
      ],
    },
    {
      status: 1,
      userInfo: {
        username: '张三',
      },
      goods: [
        {
          goods_image: `${imageUrl}business/order/ttt@2x.png`,
          goods_name: '场景XXXXXXXXXX',
        },
        {
          goods_image: `${imageUrl}business/order/ttt@2x.png`,
          goods_name: '场景XXXXXXXXXX',
        },
        {
          goods_image: `${imageUrl}business/order/ttt@2x.png`,
          goods_name: '场景XXXXXXXXXX',
        },
      ],
    },
  ])

  const redirectUrl = (url: string) => {
    if (url) {
      Taro.navigateTo({
        url,
      })
      return false
    }

    Taro.showToast({
      title: '正在开发中......',
    })
    return false
  }

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

  const headContainerStyle = {
    top: 5 + appHeaderHeight + 'px',
  }

  const StatusNavStyle = {
    top: 5 + 30 + appHeaderHeight + 'px',
  }

  const orderContainerStyle = {
    marginTop: 5 + 80 + appHeaderHeight + 'px',
  }

  return (
    <View className='container'>
      <NavBar />
      <View className='head_container' style={headContainerStyle}>
        <View className='head_item'>
          <Text className='head_item_label'>本周:</Text>
          <Text className='head_item_total'>5单</Text>
        </View>
        <View className='head_item'>
          <Text className='head_item_label'>本月:</Text>
          <Text className='head_item_total'>20单</Text>
        </View>
      </View>
      <View className='status_nav' style={StatusNavStyle}>
        <View
          className={currentNav == 1 ? 'status active' : 'status'}
          onClick={() => setCurrentNav(1)}
        >
          <Text className='status_text'>全部</Text>
        </View>
        <View
          className={currentNav == 2 ? 'status active' : 'status'}
          onClick={() => setCurrentNav(2)}
        >
          <Text className='status_text'>待确认</Text>
        </View>
        <View
          className={currentNav == 3 ? 'status active' : 'status'}
          onClick={() => setCurrentNav(3)}
        >
          <Text className='status_text'>待拍照</Text>
        </View>
        <View
          className={currentNav == 4 ? 'status active' : 'status'}
          onClick={() => setCurrentNav(4)}
        >
          <Text className='status_text'>待选片</Text>
        </View>
        <View
          className={currentNav == 5 ? 'status active' : 'status'}
          onClick={() => setCurrentNav(5)}
        >
          <Text className='status_text'>已邮寄</Text>
        </View>
      </View>
      <View className='order_container' style={orderContainerStyle}>
        <View className='order_list'>
          {orderList.length > 0 &&
            orderList.map((item, index: number) => {
              return (
                <View
                  key={index}
                  className='order_item'
                  onClick={() =>
                    redirectUrl('/pages/business/order/detail/index')
                  }
                >
                  <View className='item_header'>
                    <View className='item_user'>
                      <Image
                        className='photo_icon'
                        src={`${imageUrl}business/order/photograph_icon@2x.png`}
                      />
                      <View className='user_info'>
                        <Text className='user_info_labe'>客户姓名: </Text>
                        <Text className='user_info_name'>&nbsp;张某</Text>
                      </View>
                    </View>
                    <View className='item_status'>
                      <Text className='item_status_text'>订单完成</Text>
                    </View>
                  </View>
                  <View className='item_content'>
                    <View className='item_goods'>
                      {item.goods.length > 0 &&
                        item.goods.map((goods_item, goods_index: number) => {
                          return (
                            <View key={goods_index} className='goods_item'>
                              <Image
                                className='goods_image'
                                src={`${imageUrl}business/order/dress@2x.png`}
                              />
                              <Text className='goods_name'>
                                婚纱XXXXXXXXXXXX
                              </Text>
                            </View>
                          )
                        })}
                    </View>
                  </View>
                  <View className='item_footer'>
                    <View className='total'>
                      <Text className='total_text'>共3件商品</Text>
                    </View>
                    <View className='footer'>
                      <Button className='footer_btn look_logistics'>
                        查看物流
                      </Button>
                      <Button className='footer_btn confirm_receipt'>
                        确认收货
                      </Button>
                      <Button className='footer_btn delete_order'>
                        删除订单
                      </Button>
                    </View>
                  </View>
                </View>
              )
            })}
        </View>
      </View>
    </View>
  )
}

export default Index
