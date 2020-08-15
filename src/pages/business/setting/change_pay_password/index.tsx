import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, Input } from '@tarojs/components'
import interceptor from '@api/interceptor'
import { imageUrl } from '@api/baseUrl'

import './index.scss'

function Index(props: any) {
  const [mobile, setMobile] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')

  const handleOnInput = (value: string, type: string) => {
    if (!value || value == '') {
      return false
    }

    if (Object.is(parseInt(value), NaN)) {
      Taro.showToast({ title: '请输入数字', icon: 'none' })
      return
    }

    if (type == 'mobile') {
      setMobile(value)
    } else if (type == 'password') {
      setPassword(value)
    } else if (type == 'confirm_password') {
      setPasswordConfirm(value)
    } else {
      Taro.showToast({ title: '错误', icon: 'none' })
    }
  }

  const handleSubmit = async () => {
    if (!mobile || mobile == '') {
      Taro.showToast({ title: '请输入客服电话', icon: 'none' })
      return
    }

    if (Object.is(parseInt(mobile), NaN)) {
      Taro.showToast({ title: '客服电话请输入数字', icon: 'none' })
      return
    }

    if (!password || password == '') {
      Taro.showToast({ title: '请输入新支付密码', icon: 'none' })
      return
    }

    if (Object.is(parseInt(password), NaN)) {
      Taro.showToast({ title: '支付密码请输入数字', icon: 'none' })
      return
    }

    if (!passwordConfirm || passwordConfirm == '') {
      Taro.showToast({ title: '请再次输入新支付密码', icon: 'none' })
      return
    }

    if (Object.is(parseInt(passwordConfirm), NaN)) {
      Taro.showToast({ title: '确认支付密码请输入数字', icon: 'none' })
      return
    }

    if (password != passwordConfirm) {
      Taro.showToast({ title: '两次支付密码输入不一致', icon: 'none' })
      return
    }

    const data = {
      mobile,
      pay_password: password,
      confirm_pay_password: passwordConfirm,
    }

    await interceptor.post('wxuser/editpaypassword', { ...data })
    Taro.showToast({ title: '修改支付密码成功', icon: 'success' })
    setTimeout(function () {
      Taro.navigateBack({ delta: 1 })
    }, 2000)
  }

  return (
    <View className='container'>
      <View className='user_container'>
        <View className='avatar_container'>
          <Image
            className='avatar'
            src={`${imageUrl}business/setting/avatar@2x.png`}
          />
        </View>
      </View>
      <View className='form_container'>
        <View className='form_item'>
          <Input
            className='form_input'
            type='number'
            name='service_mobile'
            placeholder='请输入客服电话'
            value={mobile}
            onInput={(e) => handleOnInput(e.detail.value, 'mobile')}
          />
          {!!mobile && (
            <Image
              onClick={() => setMobile('')}
              className='remove'
              src={`${imageUrl}business/setting/remove@2x.png`}
            />
          )}
        </View>
        <View className='form_item'>
          <Input
            password
            type='number'
            value={password}
            name='service_mobile'
            placeholder='请输入新支付密码'
            className='form_input'
            onInput={(e) => handleOnInput(e.detail.value, 'password')}
          />
          {!!password && (
            <Image
              onClick={() => setPassword('')}
              className='remove'
              src={`${imageUrl}business/setting/remove@2x.png`}
            />
          )}
        </View>
        <View className='form_item'>
          <Input
            password
            type='number'
            value={passwordConfirm}
            name='service_mobile'
            placeholder='请再次输入新支付密码'
            className='form_input'
            onInput={(e) => handleOnInput(e.detail.value, 'confirm_password')}
          />
          {!!passwordConfirm && (
            <Image
              onClick={() => setPasswordConfirm('')}
              className='remove'
              src={`${imageUrl}business/setting/remove@2x.png`}
            />
          )}
        </View>
      </View>
      <View className='btn_container'>
        <View className='submit_btn' onClick={handleSubmit}>
          <Text className='submit_btn_text'>确认修改</Text>
        </View>
      </View>
    </View>
  )
}

export default Index
