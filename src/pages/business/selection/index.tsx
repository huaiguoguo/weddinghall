import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { imageUrl } from '@api/baseUrl'

import './index.scss'

function Index(props: any) {
  const [list, setList] = useState([
    {
      status: 1,
      order_sn: '210234567821035',
      customer: '张某1',
      appointment_date: '2020年10月01日',
      appointment_time: '08:00 - 09:00',
    },
    {
      status: 2,
      order_sn: '210234567821035',
      customer: '张某2',
      appointment_date: '2020年10月01日',
      appointment_time: '08:00 - 09:00',
    },
    {
      status: 1,
      order_sn: '210234567821035',
      customer: '张某3',
      appointment_date: '2020年10月01日',
      appointment_time: '08:00 - 09:00',
    },
    {
      status: 2,
      order_sn: '210234567821035',
      customer: '张某4',
      appointment_date: '2020年10月01日',
      appointment_time: '08:00 - 09:00',
    },
  ])

  return (
    <View className='container'>
      <View className='head'>
        <View className='nav_item new'>
          <Text className='item_text'>新建预约</Text>
          <Image className='dropdown' src={`${imageUrl}business/down@2x.png`} />
        </View>
        <View className='nav_item my active'>
          <Text className='item_text'>我的预约</Text>
          <Image
            className='dropdown'
            src={`${imageUrl}business/down_red@2x.png`}
          />
        </View>
      </View>
      <View className='content'>
        <View className='list'>
          {list.length > 0 &&
            list.map((item, index: number) => {
              return (
                <View key={index} className='item'>
                  <View className='item_head'>
                    <View className='item_head_left'>
                      <Image
                        className='item_head_left_icon'
                        src={`${imageUrl}business/article@2x.png`}
                      />
                      <Text className='item_head_left_text'>
                        {item.order_sn}
                      </Text>
                    </View>
                    <View className='item_head_right'>
                      <Text className='item_head_right_text'>已完成</Text>
                    </View>
                  </View>
                  <View className='item_content'>
                    <View className='item_content_item'>
                      <Text className='item_content_item_label'>客户姓名:</Text>
                      <Text className='item_content_item_text'>
                        {item.customer}
                      </Text>
                    </View>
                    <View className='item_content_item'>
                      <Text className='item_content_item_label'>预约日期:</Text>
                      <Text className='item_content_item_text'>
                        {item.appointment_date}
                      </Text>
                    </View>
                    <View className='item_content_item'>
                      <Text className='item_content_item_label'>预约时间:</Text>
                      <Text className='item_content_item_text'>
                        {item.appointment_time}
                      </Text>
                    </View>
                  </View>

                  <View className='item_btn'>
                    <View className='btn_content'>
                      <Text className='btn_content_text'>取消预约</Text>
                    </View>
                  </View>
                </View>
              )
            })}
        </View>
      </View>
      {/* <View className='popupBox'>
        <View className='popup_container'>
          <View className='popup_icon_container'>
            <Image
              className='popup_icon'
              src={`${imageUrl}business/type@2x.png`}
            />
          </View>
          <Text className='popup_type'>取消预约</Text>
          <View className='popup_content'>
            <Text className='popup_text'>您确定要取消订单号为</Text>
            <Text className='order_sn'>210234567821035</Text>
            <Text className='popup_text'>的预约吗?</Text>
          </View>
          <View className='btn_content'>
            <View className='back'>
              <Text>返回</Text>
            </View>
            <View className='confirm'>
              <Text>确定</Text>
            </View>
          </View>
        </View>
      </View> */}
    </View>
  )
}

export default Index
