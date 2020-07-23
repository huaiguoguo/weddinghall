import React, { useState } from 'react'
import { View, Text, Image, Input } from '@tarojs/components'
import { imageUrl } from '@api/baseUrl'

import './index.scss'

function Index(props: any) {
  const [showShadow, setShowShadow] = useState(0)

  const toggleShadow = () => {
    console.log(showShadow)
    // if (showShadow) {
    //   setShowShadow(0)
    //   return
    // }
    setShowShadow(1)
  }

  const cancelShadow = () => {
    setShowShadow(0)
  }

  return (
    <View className='container'>
      <View className='search_content'>
        <View className='search_item'>
          <Text className='item_label'>时间范围</Text>
          <View className='item_input'>
            <Text className='selectType'>全部</Text>
            <Image
              className='arrow_right'
              src={`${imageUrl}business/right@2x.png`}
            />
          </View>
        </View>
        <View className='search_item'>
          <Text className='item_label'>订单编号</Text>
          <View className='item_input'>
            <Input
              className='order_sn'
              name='order_sn'
              placeholder='请输入订单号'
              placeholderClass='placeholderClass'
            />
          </View>
        </View>
        <View className='search_item'>
          <Text className='item_label'>客户姓名</Text>
          <View className='item_input'>
            <Input
              className='customer_name'
              name='order_sn'
              placeholder='请输入客户姓名'
              placeholderClass='placeholderClass'
            />
          </View>
        </View>

        <View className='search_item'>
          <Text className='item_label'>下单日期</Text>
          <View className='item_input'>
            <Input
              onClick={toggleShadow}
              className='date date_start'
              name='date_start'
              placeholder='请选择开始日期'
              placeholderClass='placeholderClass'
            />
            <Input
              className='date date_end'
              name='date_end'
              placeholder='请选择结束日期'
              placeholderClass='placeholderClass'
            />
          </View>
        </View>
      </View>

      <View className='btn_container'>
        <View className='btn_item reset'>
          <Text className='text reset_text'>重置</Text>
        </View>
        <View className='btn_item submit'>
          <Text className='text submit_text'>搜索</Text>
        </View>
      </View>

      <View
        className={
          showShadow
            ? 'shadowBContainer activeShadowBContainer'
            : 'shadowBContainer'
        }
      >
        <View className='shadowBox'>
          <View className='shadowBoxContent'>
            <View className='item active'>全部</View>
            <View className='item'>近三个月</View>
            <View className='item'>三个月前</View>
          </View>
          <View className='btnContent'>
            <View className='confirm' onClick={cancelShadow}>
              确定
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
