import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { imageUrl } from '@api/baseUrl'

import './index.scss'

function Index() {
  const [isPopup, setIsPopup] = useState<number>(0)

  const showPopup = () => {
    setIsPopup(1)
    console.log(isPopup)
  }

  const hiddenPopup = () => {
    setIsPopup(2)
    console.log(isPopup)
  }

  const togglePopup = (e) => {
    e.stopPropagation()
    if (isPopup == 1) {
      setIsPopup(2)
    } else {
      setIsPopup(1)
    }
    console.log(isPopup)
  }

  const confirm = (e) => {
    e.stopPropagation()
    setIsPopup(2)
    console.log('这是confirm事件')
  }

  return (
    <View className='container'>
      <Text>新建预约</Text>

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
          <Text className='popup_type'>取消预约</Text>
          <View className='popup_content'>
            <Text className='popup_content_item popup_text'>
              您确定要取消订单号为
            </Text>
            <Text className='popup_content_item order_sn'>210234567821035</Text>
            <Text className='popup_content_item popup_text'>的预约吗?</Text>
          </View>
          <View className='btn_content'>
            <View className='btn_item back'>
              <Text className='btn_item_text'>返回</Text>
            </View>
            <View className='btn_item confirm'>
              <Text className='btn_item_text' onClick={confirm}>
                确定
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
