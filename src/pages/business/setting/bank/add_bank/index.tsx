import React, { useState } from 'react'
import { View, Text, Input, Picker, Button, Image } from '@tarojs/components'

import Taro from '@tarojs/taro'

import './index.scss'
import { imageUrl } from '@api/baseUrl'

function Index(props: any) {
  const [bankList, setBankList] = useState([
    '招商银行',
    '工商银行',
    '建设银行',
    '中国银行',
    '平安银行',
  ])

  const pickerChange = ({ detail }) => {
    Taro.showToast({
      title: '选择了:' + bankList[detail.value],
    })
  }

  const setPayPassword = () => {
    Taro.navigateTo({
      url: '/pages/business/setting/bank/set_pay_password/index',
    })
  }

  return (
    <View className='container'>
      <View className='form_container'>
        <View className='form_item'>
          <View className='form_label'>
            <Text className='label'>持卡人</Text>
          </View>
          <View className='form_input'>
            <Input className='input' name='username' placeholder='持卡人姓名' />
          </View>
        </View>
        <View className='form_item'>
          <View className='form_label'>
            <Text className='label'>卡号</Text>
          </View>
          <View className='form_input'>
            <Input
              className='input'
              name='bank_number'
              placeholder='持卡人本人银行卡号'
            />
          </View>
        </View>
        <View className='form_item'>
          <View className='form_label'>
            <Text className='label'>卡类型</Text>
          </View>
          <View className='form_input'>
            <Picker
              mode='selector'
              range={bankList}
              onChange={pickerChange}
              value={0}
            >
              <View className='picker'>当前选择：储蓄卡</View>
            </Picker>
          </View>
        </View>
        <View className='form_item'>
          <View className='form_label'>
            <Text className='label'>持卡人</Text>
          </View>
          <View className='form_input'>
            <Input className='input' name='username' placeholder='持卡人姓名' />
          </View>
        </View>
      </View>
      <View className='btn_container'>
        <View className='btn_container_top'>
          <Image
            className='agree_icon'
            src={`${imageUrl}business/duigou@2x.png`}
          />
          <Text className='agree_text'>同意</Text>
          <Text className='agreement'>《预存消费协议》</Text>
        </View>
        <View className='btn_container_bottom'>
          <Button className='btn' onClick={setPayPassword}>
            <Text className='next_text'>下一步</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default Index
