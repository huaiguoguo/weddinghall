import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { imageUrl } from '@api/baseUrl'

import './index.scss'

function Index(props: any) {
  const [show, setShow] = useState(0)
  const pickerChange = () => {}

  const handleCancel = () => {
    console.log(show)
    setShow(0)
  }

  const handleShow = () => {
    setShow(1)
  }

  return (
    <View className='container'>
      <View className='agreement'>
        {/* 入驻会员协议 */}
        <View className='agreement_item member_agreement'>
          <View className='agreement_item_head'>
            <Image
              className='agreement_item_bg'
              src={`${imageUrl}business/setting/agreement/agreement_bg@2x.png`}
            />
          </View>
          <View className='agreement_item_content'>
            <View className='frontend_top'>
              <Image
                onClick={handleShow}
                className='agreement_image'
                src={`${imageUrl}business/setting/agreement/plus@2x.png`}
              />
            </View>
            <View className='frontend_bottom'>
              <Image
                className='right_icon'
                src={`${imageUrl}business/setting/agreement/right_icon@2x.png`}
              />
              <Text className='agreement_text'>《入驻会员协议》已上传</Text>
            </View>
          </View>
        </View>

        {/* 预存消费协议 */}
        <View className='agreement_item consumption_agreement'>
          <View className='agreement_item_head'>
            <Image
              className='agreement_item_bg'
              src={`${imageUrl}business/setting/agreement/agreement_bg@2x.png`}
            />
          </View>
          <View className='agreement_item_content'>
            <View className='frontend_top'>
              <Image
                onClick={handleShow}
                className='agreement_image'
                src={`${imageUrl}business/setting/agreement/plus@2x.png`}
              />
            </View>
            <View className='frontend_bottom'>
              <Image
                className='right_icon'
                src={`${imageUrl}business/setting/agreement/right_icon@2x.png`}
              />
              <Text className='agreement_text'>《入驻会员协议》已上传</Text>
            </View>
          </View>
        </View>

        {/* 服务免责协议 */}
        <View className='agreement_item exemption_agreement'>
          <View className='agreement_item_head'>
            <Image
              className='agreement_item_bg'
              src={`${imageUrl}business/setting/agreement/agreement_bg@2x.png`}
            />
          </View>
          <View className='agreement_item_content'>
            <View className='frontend_top'>
              <Image
                onClick={handleShow}
                className='agreement_image'
                src={`${imageUrl}business/setting/agreement/plus@2x.png`}
              />
            </View>
            <View className='frontend_bottom'>
              <Image
                className='right_icon'
                src={`${imageUrl}business/setting/agreement/right_icon@2x.png`}
              />
              <Text className='agreement_text'>《入驻会员协议》已上传</Text>
            </View>
          </View>
        </View>
      </View>
      {!!show && (
        <View className='shadowBox'>
          <View className='shadowBoxContainer'>
            <View className='menu'>
              <Text className='menu_item'>拍照</Text>
              <Text className='menu_item'>从相册选择</Text>
            </View>
            <View className='cancel' onClick={handleCancel}>
              <Text className='cancel_item'>取消</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default Index
