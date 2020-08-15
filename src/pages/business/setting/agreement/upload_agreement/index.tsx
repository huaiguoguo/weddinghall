import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { imageUrl, baseUrl } from '@api/baseUrl'

import Taro, { useReady } from '@tarojs/taro'
import './index.scss'
import refreshToken from '@utils/token'
import interceptor from '@api/interceptor'

function Index(props: any) {
  const [show, setShow] = useState(0)

  const [RuZhu, setRuZhu] = useState<string>('')
  const [YuCun, setYuCun] = useState<string>('')
  const [MianZe, setMianZe] = useState<string>('')

  const pickerChange = () => {}

  useReady(async () => {
    // 获得所有已上传的协议
    // const res = await interceptor.get('agreement/detail', {})
  })

  const handleCancel = () => {
    console.log(show)
    setShow(0)
  }

  const handleShow = () => {
    setShow(1)
  }

  const getFlagByType = (type: string) => {
    if (type == 'RuZhu') {
      return 'ruzhuhuiyuanxieyi'
    } else if (type == 'YuCun') {
      return 'yucunxiaofeixieyi'
    } else if (type == 'MianZe') {
      return 'fuwumianzexieyi'
    } else {
      return ''
    }
  }

  const getTextByType = (type: string) => {
    if (type == 'RuZhu') {
      return '入驻会员'
    } else if (type == 'YuCun') {
      return '预存消费'
    } else if (type == 'MianZe') {
      return '服务免责'
    } else {
      return ''
    }
  }

  const setAgreeMent = (type: string, img_url: string) => {
    if (type == 'RuZhu') {
      setRuZhu(img_url)
    } else if (type == 'YuCun') {
      setYuCun(img_url)
    } else if (type == 'MianZe') {
      setMianZe(img_url)
    }
  }

  const handleUpload = (type: string) => {
    const flag = getFlagByType(type)
    Taro.chooseImage({
      success: function (chooseRes) {
        const token = refreshToken()
        const nameText = getTextByType(type)
        Taro.uploadFile({
          url: `${baseUrl}common/uploadnormalimage`,
          filePath: chooseRes.tempFilePaths[0],
          name: 'file',
          formData: {
            token,
          },
          success(uploadRes) {
            const JsonData = JSON.parse(uploadRes.data)
            const img_url = JsonData.data.url

            interceptor
              .post('agreement/add', { img_url, flag })
              .then(function (response) {})
            setAgreeMent(type, img_url)
            Taro.showToast({ title: `上传协议成功` })
          },
          fail: function (error) {
            console.log(error)
            Taro.showToast({ title: `上传协议失败`, icon: 'none' })
          },
        })
      },
    })
  }

  return (
    <View className='container'>
      <View className='agreement'>
        {/* 入驻会员协议 */}
        <View className='agreement_item member_agreement'>
          <View className='agreement_item_head'>
            {!!RuZhu && <Image className='agreement_item_bg' src={RuZhu} />}
          </View>
          <View className='agreement_item_content'>
            <View className='frontend_top'>
              <Image
                onClick={() => handleUpload('RuZhu')}
                className='agreement_image'
                src={
                  RuZhu
                    ? `${imageUrl}business/setting/agreement/plus@2x.png`
                    : `${imageUrl}business/setting/agreement/plus_grey@2x.png`
                }
              />
            </View>
            {!!RuZhu && (
              <View className='frontend_bottom'>
                <Image
                  className='right_icon'
                  src={`${imageUrl}business/setting/agreement/right_icon@2x.png`}
                />
                <Text className='agreement_text'>《入驻会员协议》已上传</Text>
              </View>
            )}
            {!RuZhu && (
              <View className='frontend_bottom'>
                <Text
                  className='agreement_text'
                  style={{ color: 'rgba(51, 51, 51, 1)' }}
                >
                  《入驻会员协议》已上传
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* 预存消费协议 */}
        <View className='agreement_item consumption_agreement'>
          <View className='agreement_item_head'>
            {!!YuCun && <Image className='agreement_item_bg' src={YuCun} />}
          </View>
          <View className='agreement_item_content'>
            <View className='frontend_top'>
              <Image
                onClick={() => handleUpload('YuCun')}
                className='agreement_image'
                src={
                  YuCun
                    ? `${imageUrl}business/setting/agreement/plus@2x.png`
                    : `${imageUrl}business/setting/agreement/plus_grey@2x.png`
                }
              />
            </View>
            {!!YuCun && (
              <View className='frontend_bottom'>
                <Image
                  className='right_icon'
                  src={`${imageUrl}business/setting/agreement/right_icon@2x.png`}
                />
                <Text className='agreement_text'>《预存消费协议》已上传</Text>
              </View>
            )}
            {!YuCun && (
              <View className='frontend_bottom'>
                <Text
                  className='agreement_text'
                  style={{ color: 'rgba(51, 51, 51, 1)' }}
                >
                  上传《预存消费协议》
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* 服务免责协议 */}
        <View className='agreement_item exemption_agreement'>
          <View className='agreement_item_head'>
            {!!MianZe && <Image className='agreement_item_bg' src={MianZe} />}
          </View>
          <View className='agreement_item_content'>
            <View className='frontend_top'>
              <Image
                onClick={() => handleUpload('MianZe')}
                className='agreement_image'
                src={
                  MianZe
                    ? `${imageUrl}business/setting/agreement/plus@2x.png`
                    : `${imageUrl}business/setting/agreement/plus_grey@2x.png`
                }
              />
            </View>
            {!!MianZe && (
              <View className='frontend_bottom'>
                <Image
                  className='right_icon'
                  src={`${imageUrl}business/setting/agreement/right_icon@2x.png`}
                />
                <Text className='agreement_text'>《服务免责协议》已上传</Text>
              </View>
            )}
            {!MianZe && (
              <View className='frontend_bottom'>
                <Text
                  className='agreement_text'
                  style={{ color: 'rgba(51, 51, 51, 1)' }}
                >
                  上传《服务免责协议》
                </Text>
              </View>
            )}
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
