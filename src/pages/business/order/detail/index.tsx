import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'

import './index.scss'
import { imageUrl } from '@api/baseUrl'

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
      <View className='order_head'>
        <Text className='head_title'>订单信息</Text>
      </View>
      <View className='order_content'>
        <View className='order_content_list'>
          <View className='order_item'>
            <Text className='order_item_label'>订单编号:</Text>
            <Text className='order_item_value'>210540384564125</Text>
          </View>
          <View className='order_item'>
            <Text className='order_item_label'>商家店名:</Text>
            <Text className='order_item_value'>三年二班</Text>
          </View>
          <View className='order_item'>
            <Text className='order_item_label'>商家电话:</Text>
            <Text className='order_item_value'>17763962622</Text>
          </View>
          <View className='order_item'>
            <Text className='order_item_label'>选服装日期:</Text>
            <Text className='order_item_value'> 6月7日 8:30</Text>
          </View>
          <View className='order_item'>
            <Text className='order_item_label'>拍摄日期:</Text>
            <Text className='order_item_value'>6月8日 - 6月9日</Text>
          </View>
          <View className='order_item'>
            <Text className='order_item_label'>客户姓名:</Text>
            <Text className='order_item_value'>沈玉蓉</Text>
          </View>
          <View className='order_item'>
            <Text className='order_item_label'>具体场景:</Text>
            <Text className='order_item_value'>三亚湾、礁石</Text>
          </View>
          <View className='order_item'>
            <Text className='order_item_label'>服装套数:</Text>
            <Text className='order_item_value'>3套</Text>
          </View>
          <View className='order_item'>
            <Text className='order_item_label'>备注:</Text>
            <Text className='order_item_value'>210540384564125</Text>
          </View>
        </View>
      </View>
      <View className='order_insurance'>
        <Image
          className='order_insurance_bg'
          src={`${imageUrl}order_insurance_top_bg@2x.png`}
        />
        <View className='order_insurance_title'>
          <Text className='order_insurance_title_text'>乐享旅拍（A）</Text>
        </View>
        <View className='order_insurance_list'>
          <View className='insurance_item'>
            <View className='insurance_item_label_content'>
              <Text className='insurance_item_label'>
                意外身故、残疾、烫伤每份保额:
              </Text>
            </View>
            <View className='insurance_item_value_content'>
              <Text className='insurance_item_value_label'>保额:</Text>
              <Text className='insurance_item_value_value'>1000000元</Text>
            </View>
          </View>
          <View className='insurance_item'>
            <View className='insurance_item_label_content'>
              <Text className='insurance_item_label'>意外医疗每份保额:</Text>
            </View>
            <View className='insurance_item_value_content'>
              <Text className='insurance_item_value_label'>保额:</Text>
              <Text className='insurance_item_value_value'>100000元</Text>
            </View>
          </View>
          <View className='insurance_item'>
            <View className='insurance_item_label_content'>
              <Text className='insurance_item_label'>意外医疗给付比例:</Text>
            </View>
            <View className='insurance_item_value_content'>
              <Text className='insurance_item_value_label'>保额:</Text>
              <Text className='insurance_item_value_value'>80%元 </Text>
            </View>
          </View>
          <View className='insurance_item'>
            <View className='insurance_item_label_content'>
              <Text className='insurance_item_label'>意外医疗免赔额:</Text>
            </View>
            <View className='insurance_item_value_content'>
              <Text className='insurance_item_value_label'>保额:</Text>
              <Text className='insurance_item_value_value'>100元</Text>
            </View>
          </View>
        </View>
      </View>
      <View className='order_btn'>
        <View className='order_btn_item save_btn'>
          <Text className='btn_text save_btn_text'>保存预约信息</Text>
        </View>
        <View className='order_btn_item confirm_btn'>
          <Text className='btn_text confirm_btn_text'>确认支付</Text>
        </View>
      </View>
    </View>
  )
}

export default Index
