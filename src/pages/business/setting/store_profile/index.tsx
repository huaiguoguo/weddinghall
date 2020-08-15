import React, { useState } from 'react'
import {
  View,
  Text,
  Input,
  Textarea,
  Image,
  Radio,
  RichText,
} from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
import { imageUrl, baseUrl } from '@api/baseUrl'
import interceptor from '@api/interceptor'
import refreshToken from '@utils/token'

import './index.scss'

interface IProfile {
  id: number
  user_id: number
  company_name: string
  company_mobile: string
  company_address: string
  company_mail_address: string
  business_license: string
  corporate_identity_card: string
  corporate_identity_card2: string
  agreement: string
  status: number
  create_time: number
  update_time: number
  status_text: string
}

function Index(props: any) {
  const [isPopup, setIsPopup] = useState<number>(0)
  const [radioActive, setRadioActive] = useState<number>(0)

  const [company_name, setCompanyName] = useState<string>('测试店名')
  const [mobile, setCompanyMobile] = useState<string>('18595820892')
  const [address, setCompanyAddress] = useState<string>('测试地址')
  const [licensePic, setLicensePic] = useState<string>('')
  const [frontIDPic, setFrontIDPic] = useState<string>('')
  const [backIDPic, setBackIDPic] = useState<string>('')
  const [agreement, setAgreement] = useState<string>('')

  useReady(async () => {
    const res: IProfile = await interceptor.get('wxuser/getgroupprofile')
    setCompanyName(res.company_name)
    setCompanyMobile(res.company_mobile)
    setCompanyAddress(res.company_address)
    setLicensePic(res.business_license)
    setFrontIDPic(res.corporate_identity_card)
    setBackIDPic(res.corporate_identity_card2)
    const { content } = await interceptor.get('article/detailByName', {
      name: 'ruzhuhuiyuanxieyi',
    })
    setAgreement(content)
  })

  const redirectNext = () => {
    submitForm()
    return
    Taro.navigateTo({
      url: '/pages/business/setting/store_profile/store_agreement/index',
    })
  }

  const confirm = (e) => {
    e.stopPropagation()
    setIsPopup(2)
  }

  const handleUpload = (type: number) => {
    const token = refreshToken()
    Taro.chooseImage({
      success: function (chooseRes) {
        // console.log(chooseRes)
        // const url = `${baseUrl}common/uploadnormalimage`
        Taro.uploadFile({
          url: `${baseUrl}common/uploadnormalimage`,
          filePath: chooseRes.tempFilePaths[0],
          name: 'file',
          formData: {
            token,
          },
          success: function (uploadRes) {
            const { data } = uploadRes
            const dataJSON = JSON.parse(data)
            if (type == 1) {
              setLicensePic(dataJSON.data.url)
            } else if (type == 2) {
              setFrontIDPic(dataJSON.data.url)
            } else if (type == 3) {
              setBackIDPic(dataJSON.data.url)
            }
          },
        })
      },
    })
  }

  const submitForm = async () => {
    if (!company_name || company_name == '' || company_name == 'undefined') {
      Taro.showToast({ icon: 'none', title: '请填写商家店名!' })
      return false
    }
    if (!mobile || mobile == '' || mobile == 'undefined') {
      Taro.showToast({ icon: 'none', title: '请填写商家电话!' })
      return false
    }
    if (!address || address == '' || address == 'undefined') {
      Taro.showToast({ icon: 'none', title: '请填写商家地址!' })
      return false
    }
    if (!licensePic || licensePic == '' || licensePic == 'undefined') {
      Taro.showToast({ icon: 'none', title: '请上传商家营业执照!' })
      return false
    }
    if (!frontIDPic || frontIDPic == '' || frontIDPic == 'undefined') {
      Taro.showToast({ icon: 'none', title: '请上传身份证正面!' })
      return false
    }
    if (!backIDPic || backIDPic == '' || backIDPic == 'undefined') {
      Taro.showToast({ icon: 'none', title: '请上传身份证反面!' })
      return false
    }
    if (!radioActive) {
      Taro.showToast({ icon: 'none', title: '请同意协议' })
      return false
    }
    const data = {
      company_name,
      company_mobile: mobile,
      company_address: address,
      business_license: licensePic,
      corporate_identity_card: frontIDPic,
      corporate_identity_card2: backIDPic,
    }
    const response = await interceptor.post('wxuser/editgroupprofile', { data })
    console.log('==================== start')
    console.log(response)
    console.log('==================== end')
    // if(!response){
    //   Taro.showModal()
    // }
  }

  return (
    <View className='container'>
      <View className='form_content'>
        <View className='form_item'>
          <Text className='item_label'>商家店名:</Text>
          <Input
            className='item_input'
            name='store_name'
            placeholder='请输入门店名称'
            value={company_name}
            onInput={(e) => setCompanyName(e.detail.value)}
          />
        </View>
        <View className='form_item'>
          <Text className='item_label'>商家电话:</Text>
          <Input
            className='item_input'
            name='store_name'
            placeholder='请输入客服电话'
            value={mobile}
            onInput={(e) => setCompanyMobile(e.detail.value)}
          />
        </View>
        <View className='form_item'>
          <Text className='item_label'>商家地址:</Text>
          <Textarea
            className='item_area'
            name='store_name'
            placeholder='请输商家地址'
            value={address}
            onInput={(e) => setCompanyAddress(e.detail.value)}
          />
        </View>
        {/* <View className='form_item send_address'>
          <Text className='notice'>
            温馨提示: 相册将邮寄到影楼, 请自行发放给新人
          </Text>
          <View className='form_item_content'>
            <Text className='item_label'>相册邮寄地址:</Text>
            <Textarea
              className='item_area'
              name='store_name'
              placeholder='请输入相册邮寄地址'
            />
          </View>
        </View> */}

        <View className='business_license'>
          <View className='license_head'>
            <Text className='license_head_title'>营业执照</Text>
            <Text className='license_head_desc'>请上传最新的营业执照</Text>
          </View>
          <View className='license_pic_container first_license'>
            <View
              className='pic_item'
              style={{
                backgroundImage: `url('${licensePic}')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
              }}
              onClick={() => handleUpload(1)}
            >
              <Image
                className='upload_pic'
                src={`${imageUrl}upload_plus@2x.png`}
              />
              <Text className='upload_desc'>点击添加营业执照图片</Text>
            </View>
          </View>
        </View>

        <View className='business_license'>
          <View className='license_head'>
            <Text className='license_head_title'>身份证</Text>
            <Text className='license_head_desc'>请上传本人身份证正反面</Text>
          </View>
          <View className='license_pic_container'>
            <View
              className='pic_item'
              style={{
                backgroundImage: `url('${frontIDPic}')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
              }}
              onClick={() => handleUpload(2)}
            >
              <Image
                className='upload_pic'
                src={`${imageUrl}upload_plus@2x.png`}
              />
              <Text className='upload_desc'>点击添加身份证正面图片</Text>
            </View>
            <View
              className='pic_item'
              style={{
                backgroundImage: `url('${backIDPic}')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
              }}
              onClick={() => handleUpload(3)}
            >
              <Image
                className='upload_pic'
                src={`${imageUrl}upload_plus@2x.png`}
              />
              <Text className='upload_desc'>点击添加身份证反面图片</Text>
            </View>
          </View>
        </View>
      </View>
      <View className='agreement_container'>
        <Radio
          color='red'
          className='agreement_radio'
          value='1'
          checked={radioActive ? true : false}
          onClick={() => {
            if (radioActive) {
              setRadioActive(0)
            } else {
              setRadioActive(1)
            }
          }}
        />
        <View className='agreement'>
          <Text className='agreement_first'>我已阅读并同意</Text>
          <Text className='agreement_content' onClick={() => setIsPopup(1)}>
            《入驻会员协议》
          </Text>
        </View>
      </View>
      <View className='next_btn_container'>
        <View className='next_content'>
          <View className='btn' onClick={redirectNext}>
            <Text className='btn_text'>下一步</Text>
          </View>
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
            {/* <Text dangerouslySetInnerHTML={{ __html: 'adfa' }}></Text> */}
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
