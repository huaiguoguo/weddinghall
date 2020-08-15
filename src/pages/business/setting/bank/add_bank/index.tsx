import React, { useState } from 'react'
import {
  View,
  Text,
  Input,
  Picker,
  Button,
  Radio,
  RichText,
} from '@tarojs/components'
import Taro, { useDidShow, getStorageSync } from '@tarojs/taro'

import interceptor from '@api/interceptor'

import './index.scss'

function Index(props: any) {
  const [isPopup, setIsPopup] = useState<number>(0)
  const [isAgree, setIsAgree] = useState<number>(0)
  const [cardNumber, setCardNumber] = useState<string>('')
  const [cardName, setCardName] = useState<string>('')
  const [bankName, setBankName] = useState<string>('')
  const [telPhone, setTelPhone] = useState<string>('')
  const [type, setType] = useState<number>(-1)
  const [currentBankIndex, setCurrentBankIndex] = useState<number>(-1)
  const [agreement, setAgreeMent] = useState<string>('')

  useDidShow(async () => {
    const { content } = await interceptor.get('article/detailByName', {
      name: 'yucunxiaofeixieyi',
    })
    setAgreeMent(content)
    // setAgreeMent(content)
  })

  const [bankList, setBankList] = useState([
    '中国银行',
    '中国建设银行',
    '中国工商银行',
    '中国农业银行',
    '中国招商银行',
    '中国邮政银行',
    '中国交通银行',
    '中国兴业银行',
    '中国中信银行',
    '中国光大银行',
    '中国浦东发展银行',
    '中国民生银行',
    '平安银行',
    '其它银行',
  ])

  const [bankTypeList, setBankTypeList] = useState(['个人账户', '企业账户'])

  const pickerBankListChange = ({ detail }) => {
    setCurrentBankIndex(detail.value)
    setBankName(bankList[detail.value])
  }

  const pickerBankTypeChange = ({ detail }) => {
    setType(detail.value)
  }

  // 协议确认
  const confirm = (e) => {
    e.stopPropagation()
    setIsPopup(2)
  }

  const handleBlur = async (value: string) => {
    if (!value) {
      return false
    }
    if (Object.is(parseInt(value), NaN)) {
      Taro.showToast({ title: '卡号必须为数字', icon: 'none' })
      return false
    }
    await interceptor.get('bank/getbanknamebynumber', {
      card_number: value,
    })
    setCardNumber(value)
  }

  const submit = async () => {
    // Taro.navigateTo({
    //   url: '/pages/business/setting/bank/set_pay_password/index',
    // })
    // return
    if (!isAgree) {
      Taro.showToast({ title: '请同意协议!', icon: 'none' })
      return false
    }

    if (!cardName) {
      Taro.showToast({ title: '请输入持卡人姓名!', icon: 'none' })
      return false
    }

    if (!cardNumber) {
      Taro.showToast({ title: '请输入本人银行卡号!', icon: 'none' })
      return false
    }

    if (Object.is(parseInt(cardNumber), NaN)) {
      Taro.showToast({ title: '请输入本人正确的银行卡号!', icon: 'none' })
      return false
    }

    if (currentBankIndex == -1 || !bankName) {
      Taro.showToast({ title: '请选择开户行!', icon: 'none' })
      return false
    }

    if (type == -1 || !type) {
      Taro.showToast({ title: '请选择账户类型!', icon: 'none' })
      return false
    }

    if (!telPhone) {
      Taro.showToast({ title: '请输入银行预留手机号!', icon: 'none' })
      return false
    }

    if (Object.is(parseInt(telPhone), NaN)) {
      Taro.showToast({ title: '请输入正确的手机号!', icon: 'none' })
      return false
    }

    const data = {
      card_number: cardNumber,
      bank_name: bankName,
      card_name: cardName,
      telphone: telPhone,
      type,
    }

    const response = await interceptor.post('bank/add', { ...data })
    console.log(response)
    Taro.showModal({
      title: '添加成功',
      showCancel: false,
      success: function (res) {
        const is_set_pay_password = getStorageSync('is_set_pay_password')
        if (res.confirm) {
          if (!is_set_pay_password) {
            Taro.navigateTo({
              url: '/pages/business/setting/bank/set_pay_password/index',
            })
          } else {
            Taro.navigateBack({ delta: 1 })
          }
        }
      },
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
            <Input
              className='input'
              name='username'
              placeholder='持卡人姓名'
              value={cardName}
              onInput={(e) => setCardName(e.detail.value)}
            />
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
              value={cardNumber}
              onBlur={(e) => handleBlur(e.detail.value)}
            />
          </View>
        </View>

        <View className='form_item'>
          <View className='form_label'>
            <Text className='label'>开户行</Text>
          </View>
          <View className='form_input'>
            <Picker
              mode='selector'
              range={bankList}
              onChange={pickerBankListChange}
              value={-1}
            >
              <View className='picker'>
                {currentBankIndex > -1
                  ? bankList[currentBankIndex]
                  : '请选择开户行'}
              </View>
            </Picker>
          </View>
        </View>

        <View className='form_item'>
          <View className='form_label'>
            <Text className='label'>卡类型</Text>
          </View>
          <View className='form_input'>
            <Picker
              mode='selector'
              range={bankTypeList}
              onChange={pickerBankTypeChange}
              value={-1}
            >
              <View className='picker'>
                {type > -1 ? bankTypeList[type] : '请选择卡类型'}
              </View>
            </Picker>
          </View>
        </View>

        <View className='form_item'>
          <View className='form_label'>
            <Text className='label'>手机号</Text>
          </View>
          <View className='form_input'>
            <Input
              className='input'
              name='mobile'
              placeholder='请输入银行预留手机号'
              value={telPhone}
              onInput={(e) => setTelPhone(e.detail.value)}
            />
          </View>
        </View>
      </View>
      <View className='btn_container'>
        <View className='btn_container_top'>
          {/* <Image
            className='agree_icon'
            src={`${imageUrl}business/duigou@2x.png`}
          /> */}
          <Radio
            color='RGBA(246, 198, 163, 1)'
            className='agree_icon'
            checked={isAgree ? true : false}
            onClick={() => {
              if (isAgree) {
                setIsAgree(0)
              } else {
                setIsAgree(1)
              }
            }}
          />
          <Text className='agree_text'>同意</Text>
          <Text className='agreement' onClick={() => setIsPopup(1)}>
            《预存消费协议》
          </Text>
        </View>
        <View className='btn_container_bottom'>
          <Button className='btn' onClick={submit}>
            <Text className='next_text'>下一步</Text>
          </Button>
        </View>
      </View>

      <View
        className={
          isPopup == 1
            ? 'popupBox popupBoxShow'
            : isPopup == 2
            ? 'popupBox popupBoxHidden'
            : 'popupBox'
        }
      >
        <View
          className={
            isPopup == 1
              ? 'popup_container popup_container_up'
              : isPopup == 2
              ? 'popup_container popup_container_down'
              : 'popup_container'
          }
        >
          {/* <Text className='popup_type'>取消预约</Text> */}
          <View className='popup_content' onClick={confirm}>
            {/* <Text
              dangerouslySetInnerHTML={{ __html: agreement }}
              className='popup_content_item popup_text'
            ></Text> */}
            <RichText
              className='popup_content_item popup_text'
              nodes={agreement}
            />
            {/* <Text className='popup_content_item order_sn'>210234567821035</Text>
            <Text className='popup_content_item popup_text'>的预约吗?</Text> */}
          </View>
          {/* <View className='popup_btn_content'>
            <View className='btn_item back' onClick={cancel}>
              <Text className='btn_item_text'>返回</Text>
            </View>
            <View className='btn_item confirm' onClick={confirm}>
              <Text className='btn_item_text'>确定</Text>
            </View>
          </View> */}
        </View>
      </View>
    </View>
  )
}

export default Index
