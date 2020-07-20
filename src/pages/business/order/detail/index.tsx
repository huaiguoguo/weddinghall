import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'

import './index.scss'

function Index(props: any) {
  const [orderDetail, setOrderDetail] = useState({
    order_sn: '210540384564125',
    order_status: 1,
    order_goods: [
      {
        goods_title: '',
        goods_image: '',
      },
    ],
  })

  return (
    <View className='container'>
      <View className='head_container'>这是订单详情页面</View>

      <View className='order_container'>
        <View className='order_goods'>
          {orderDetail.order_goods.length > 0 &&
            orderDetail.order_goods.map((item, index) => {
              return (
                <View key={index} className='goods_item'>
                  <Image className='goods_image' src={`${item.goods_image}`} />
                </View>
              )
            })}
        </View>
        <View className='order_content'>
          <View className='order_head'>
            <Text>订单信息</Text>
          </View>
          <View className='order_item'>
            <View className='item'>
              <Text>订单编号:</Text>
              <Text>{orderDetail.order_sn}</Text>
            </View>
            <View className='item'>
              <Text>商家店名:</Text>
              <Text>三年二班</Text>
            </View>
            <View className='item'>
              <Text>商家电话:</Text>
              <Text>17763962622</Text>
            </View>
            <View className='item'>
              <Text>选服装日期时间:</Text>
              <Text>6月6日 8点 - 9点</Text>
            </View>
            <View className='item'>
              <Text>客户姓名:</Text>
              <Text>沈玉蓉</Text>
            </View>
            <View className='item'>
              <Text>具体场景:</Text>
              <Text>三亚湾，礁石</Text>
            </View>
            <View className='item'>
              <Text>服装套数:</Text>
              <Text>3套</Text>
            </View>
            <View className='item'>
              <Text>备注:</Text>
              <Text>这是备注</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
