import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { imageUrl } from '@api/baseUrl'
import Taro, { useDidShow } from '@tarojs/taro'
import interceptor from '@api/interceptor'

import './index.scss'

function Index(props: any) {
  const [bankList, setBankList] = useState([
    {
      bank_name: '招商',
      card_type: 'CC',
      bank_number: 'xxxx xxxx xxxx 022',
      bank_icon: `${imageUrl}business/setting/zhaoshang_icon@2x.png`,
      bank_icon_bg: `${imageUrl}business/setting/zhaoshang_bg@2x.png`,
      background_color:
        'linear-gradient(224deg,rgba(254,108,127,1),rgba(255,90,96,1));',
    },
    // {
    //   bank_name: '建设',
    //   bank_type: 2,
    //   bank_number: 'xxxx xxxx xxxx 062',
    //   bank_icon: `${imageUrl}business/setting/jianshe_icon@2x.png`,
    //   bank_icon_bg: `${imageUrl}business/setting/jianshe_bg@2x.png`,
    //   background_color:
    //     'linear-gradient(241deg,rgba(11,186,251,1),rgba(66,133,236,1));',
    // },
  ])

  useDidShow(async () => {
    const bank_list = await interceptor.get('bank/index', {})
    console.log(bank_list)
  })

  const BankType = (type: string) => {
    if (type == 'DC') {
      return <Text className='bank_type_text'>储蓄卡</Text>
    } else if (type == 'CC') {
      return <Text className='bank_type_text'>信用卡</Text>
    } else if (type == 'SCC') {
      return <Text className='bank_type_text'>准贷记卡</Text>
    } else if (type == 'PC') {
      return <Text className='bank_type_text'>预付费卡</Text>
    }
  }

  const BankNumber = (number: string) => {
    if (number) {
      return number
    }
  }

  const addBank = () => {
    Taro.navigateTo({
      url: '/pages/business/setting/bank/add_bank/index',
    })
  }

  return (
    <View className='container'>
      <View className='bank_list'>
        {bankList.length > 0 &&
          bankList.map((item, index: number) => {
            return (
              <View
                key={index}
                className='bank_item'
                style={{ background: item.background_color }}
              >
                <View className='bank_icon'>
                  <Image className='icon' src={item.bank_icon} />
                </View>
                <View className='bank_info'>
                  <View className='bank_name'>
                    <Text className='name_text'>{item.bank_name}银行</Text>
                  </View>
                  <View className='bank_type'>{BankType(item.card_type)}</View>
                  <View className='bank_number'>
                    <Text className='number'>
                      {BankNumber(item.bank_number)}
                    </Text>
                  </View>
                </View>
              </View>
            )
          })}
      </View>
      <View className='add_container'>
        <View className='add_icon' onClick={addBank}>
          <Image
            className='icon'
            src={`${imageUrl}business/setting/plus@2x.png`}
          />
        </View>
        <View className='add_notice' onClick={addBank}>
          <Text className='title'>添加银行卡</Text>
          <Text className='notice'>请使用绑定后的银行账户打款</Text>
        </View>
      </View>
    </View>
  )
}

export default Index
