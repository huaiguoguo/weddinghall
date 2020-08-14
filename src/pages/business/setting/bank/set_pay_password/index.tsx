import React, { useState, useRef, useEffect } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro, { useDidShow, useReady } from '@tarojs/taro'

import './index.scss'
import interceptor from '@api/interceptor'

function Index(props: any) {
  const [firstPwd, setFirstPwd] = useState<string>('')
  const [secondPwd, setSecondPwd] = useState<string>('')
  const [thirdPwd, setThirdPwd] = useState<string>('')
  const [fourthPwd, setFourthPwd] = useState<string>('')
  const [fifthPwd, setFifthPwd] = useState<string>('')
  const [sixthPwd, setSixthPwd] = useState<string>('')

  const firstRef = useRef<HTMLInputElement>()
  const secondRef = useRef<HTMLInputElement>()
  const thirdRef = useRef<HTMLInputElement>()
  const fourthRef = useRef<HTMLInputElement>()
  const fifthRef = useRef<HTMLInputElement>()
  const sixthRef = useRef<HTMLInputElement>()

  const completeAddBank = () => {
    return
    Taro.redirectTo({
      url: '/pages/business/setting/bank/index',
    })
  }

  useReady(() => {
    firstRef.current?.focus()
  })

  const handleInput = (type: string, value: string) => {
    if (value && Object.is(parseInt(value), NaN)) {
      Taro.showToast({ title: '请输入数字', icon: 'none' })
      return
    }
    if (type == 'first') {
      setFirstPwd(value)
      if (!value) {
        return false
      }
      secondRef.current?.focus()
    } else if (type == 'second') {
      setSecondPwd(value)
      if (!value) {
        firstRef.current?.focus()
        return
      }
      thirdRef.current?.focus()
    } else if (type == 'third') {
      setThirdPwd(value)
      if (!value) {
        secondRef.current?.focus()
        return
      }
      fourthRef.current?.focus()
    } else if (type == 'fourth') {
      setFourthPwd(value)
      if (!value) {
        thirdRef.current?.focus()
        return
      }
      fifthRef.current?.focus()
    } else if (type == 'fifth') {
      setFifthPwd(value)
      if (!value) {
        fourthRef.current?.focus()
        return
      }
      sixthRef.current?.focus()
    } else if (type == 'sixth') {
      setSixthPwd(value)
      if (!value) {
        fifthRef.current?.focus()
        return
      }
    }
  }

  const handleSubmit = async () => {
    if (!firstPwd) {
      firstRef.current?.focus()
      return
    }
    if (!secondPwd) {
      secondRef.current?.focus()
      return
    }
    if (!thirdPwd) {
      thirdRef.current?.focus()
      return
    }
    if (!fourthPwd) {
      fourthRef.current?.focus()
      return
    }
    if (!fifthPwd) {
      fifthRef.current?.focus()
      return
    }
    if (!sixthPwd) {
      sixthRef.current?.focus()
      return
    }
    const pay_password = `${firstPwd}${secondPwd}${thirdPwd}${fourthPwd}${fifthPwd}${sixthPwd}`
    await interceptor.post('wxuser/setpaypassword', { pay_password })
    Taro.showModal({
      content: '支付密码设置成功',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          Taro.navigateTo({
            url: '/pages/business/setting/bank/index',
          })
        }
      },
    })
  }

  return (
    <View className='container'>
      <View className='password_notice_container'>
        <View className='notice_container'>
          <Text className='notice'>
            请设置支付密码,建议勿与银行卡取款密码相同
          </Text>
        </View>
        <View className='password_container'>
          <Input
            ref={firstRef}
            type='number'
            maxlength={1}
            className='passwordItem'
            value={firstPwd}
            onInput={(e) => handleInput('first', e.detail.value)}
          />
          <Input
            ref={secondRef}
            type='number'
            maxlength={1}
            className='passwordItem'
            value={secondPwd}
            onInput={(e) => handleInput('second', e.detail.value)}
          />
          <Input
            ref={thirdRef}
            type='number'
            maxlength={1}
            className='passwordItem'
            value={thirdPwd}
            onInput={(e) => handleInput('third', e.detail.value)}
          />
          <Input
            ref={fourthRef}
            type='number'
            maxlength={1}
            className='passwordItem'
            value={fourthPwd}
            onInput={(e) => handleInput('fourth', e.detail.value)}
          />
          <Input
            ref={fifthRef}
            type='number'
            maxlength={1}
            className='passwordItem'
            value={fifthPwd}
            onInput={(e) => handleInput('fifth', e.detail.value)}
          />
          <Input
            ref={sixthRef}
            type='number'
            maxlength={1}
            className='passwordItem'
            value={sixthPwd}
            onInput={(e) => handleInput('sixth', e.detail.value)}
          />
        </View>
      </View>
      <View className='btn_container'>
        <View className='btn' onClick={handleSubmit}>
          <Text className='btn_text'>完成</Text>
        </View>
      </View>
    </View>
  )
}

export default Index
