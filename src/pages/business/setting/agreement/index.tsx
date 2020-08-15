import React, { useState } from 'react'

import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import interceptor from '@api/interceptor'
import { imageUrl } from '@api/baseUrl'

import './index.scss'

function Index(props: any) {
  const [active, setActive] = useState<number>(0)
  const redirectUrl = (url: string) => {
    if (url) {
      Taro.navigateTo({
        url,
      })
      return false
    }
    Taro.showToast({
      title: '正在开发中......',
    })
  }

  const saveToMobile = async (e) => {
    e.stopPropagation()
    // const res = await interceptor.get('/order.order/getorderinfoimage', { order_id })
    Taro.downloadFile({
      url: `${imageUrl}business/setting/agreement/agreement_img_demo@2x.png`,
      success: function (dres) {
        if (dres.statusCode == 200) {
          Taro.saveImageToPhotosAlbum({
            filePath: dres.tempFilePath,
            success: function (saveRes) {
              if (saveRes.errMsg == 'saveImageToPhotosAlbum:ok') {
                Taro.showToast({ title: '保存成功', icon: 'success' })
                setActive(0)
              } else {
                Taro.showToast({ title: '保存失败', icon: 'none' })
                setActive(0)
              }
            },
            fail: function () {
              Taro.showToast({ title: '保存错误', icon: 'none' })
              setActive(0)
            },
          })
        } else {
          Taro.showToast({ title: '保存失败' })
          setActive(0)
        }
      },
    })
  }

  return (
    <View className='container'>
      <View className='content'>
        <View className='item' onClick={() => setActive(1)}>
          <Text className='title'>《入驻会员协议》</Text>
          <Image className='arrow_icon' src={`${imageUrl}arrow_right@2x.png`} />
        </View>
        <View className='item' onClick={() => setActive(1)}>
          <Text className='title'>《预存消费协议》</Text>
          <Image className='arrow_icon' src={`${imageUrl}arrow_right@2x.png`} />
        </View>
        <View className='item' onClick={() => setActive(1)}>
          <Text className='title'>《服务免责协议》</Text>
          <Image className='arrow_icon' src={`${imageUrl}arrow_right@2x.png`} />
        </View>
      </View>
      <View className='btn_container'>
        <View
          className='upload_agreement'
          onClick={() =>
            redirectUrl(
              '/pages/business/setting/agreement/upload_agreement/index'
            )
          }
        >
          <Image
            className='upload_icon'
            src={`${imageUrl}business/setting/agreement/upload_icon@2x.png`}
          />
          <Text className='upload_text'>上传协议</Text>
        </View>
      </View>

      {/* 弹窗 */}
      <View
        className={active ? 'popupBox popupBoxActive' : 'popupBox'}
        onClick={(e) => {
          e.stopPropagation()
          setActive(0)
        }}
      >
        <View className='agreement'>
          <Image
            onClick={(e) => e.stopPropagation()}
            className='agreement_img'
            src={`${imageUrl}business/setting/agreement/agreement_img_demo@2x.png`}
          />
        </View>
        <View className='download'>
          <Image
            onClick={saveToMobile}
            className='download_icon'
            src={`${imageUrl}business/setting/agreement/download@2x.png`}
          />
        </View>
      </View>
    </View>
  )
}

export default Index
