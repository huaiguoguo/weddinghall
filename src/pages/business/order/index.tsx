import React, { useState } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'

import './index.scss'
import { imageUrl } from '@api/baseUrl'

function Index(props: any) {
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
      ],
    },
  ])

  return (
    <View className='container'>
      <View className='head_container'>
        <View className='head_item'>
          <Text className='head_item_label'>本周:</Text>
          <Text className='head_item_total'>5单</Text>
        </View>
        <View className='head_item'>
          <Text className='head_item_label'>本月:</Text>
          <Text className='head_item_total'>20单</Text>
        </View>
      </View>
      <View className='order_container'>
        <View className='status_nav'>
          <View className='status active'>
            <Text className='status_text'>全部</Text>
          </View>
          <View className='status'>
            <Text className='status_text'>待确认</Text>
          </View>
          <View className='status'>
            <Text className='status_text'>待拍照</Text>
          </View>
          <View className='status'>
            <Text className='status_text'>待选片</Text>
          </View>
          <View className='status'>
            <Text className='status_text'>已邮寄</Text>
          </View>
        </View>
        <View className='order_list'>
          {orderList.length > 0 &&
            orderList.map((item, index: number) => {
              return (
                <View key={index} className='order_item'>
                  <View className='item_header'>
                    <View className='item_user'>
                      <Image className='photo_icon' src='' />
                      <View className='user_info'>
                        <Text className='user_info_labe'>客户姓名: </Text>
                        <Text className='user_info_name'>张某</Text>
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
                              <Image className='goods_image' src='' />
                              <Text className='goods_name'>
                                婚纱XXXXXXXXXXXXXXXXXXXXXXXXXX
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
                      <Button className='look_logistics'>查看物流</Button>
                      <Button className='confirm_receipt'>确认收货</Button>
                      <Button className='delete_order'>删除订单</Button>
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
