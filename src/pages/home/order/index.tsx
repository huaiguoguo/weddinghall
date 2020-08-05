import React, { useState } from 'react'

import {
  View,
  Text,
  Image,
  Input,
  Swiper,
  SwiperItem,
} from '@tarojs/components'

import Taro from '@tarojs/taro'
import { imageUrl } from '@api/baseUrl'

import './index.scss'

function Index(props: any) {
  const [isPopup, setIsPopup] = useState<number>(0)
  const [currentFlowerCategory, setCurrentFlowerCategory] = useState<number>(2)
  const [currentShuttleService, setCurrentShuttleService] = useState<number>(1)
  const [currentCaterService, setCurrentCaterService] = useState<number>(1)
  const [pptList, setPPtList] = useState([
    {
      image: `${imageUrl}sanya@2x.png`,
    },
    {
      image: `${imageUrl}sanya@2x.png`,
    },
    {
      image: `${imageUrl}sanya@2x.png`,
    },
  ])

  const redirectUrl = (url: string) => {
    Taro.navigateTo({ url })
  }

  const setFlowerCategory = (id: number) => {
    setCurrentFlowerCategory(id)
    console.log(id)
  }

  const confirm = (e) => {
    e.stopPropagation()
    setIsPopup(2)
  }

  const cancel = (e) => {
    e.stopPropagation()
    setIsPopup(2)
  }

  const html = `欢迎您使用腾讯企点软件及服务！<br/><br/>
      
        为使用腾讯企点软件（以下统称“本软件”）及服务，
  您应当阅读并遵守《腾讯企点软件许可及服务协议》（以下简称“本协议”），
  以及《腾讯服务协议》（链接地址：http://www.qq.com/contract.shtml，若链接地址变更的，则以变更后的链接地址所对应的内容为准；
  其他链接地址变更的情形，均适用前述约定）、《QQ软件许可及服务协议》、《QQ号码规则》（链接地址：http://zc.qq.com/chs/agreement1_chs.html）以及专项规则等。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制、免责条款可能以加粗形式提示您注意。
  <br/><br/>
        除非您已阅读并接受本协议所有条款，否则您无权下载、安装或使用本软件及相关服务。您的下载、安装、使用、登录等行为即视为您已阅读并同意本协议的约束。
  <br/><br/>

        如果您未满18周岁，请在法定监护人的陪同下阅读本协议，并特别注意未成年人使用条款。
  一、【协议的范围】 1.1【协议适用主体范围】
  本协议是用户（以下可称为“您”）与腾讯之间关于下载、安装、使用、登录本软件，以及使用本服务所订立的协议。
  1.2【协议关系及冲突条款】
  本协议被视为《腾讯服务协议》及《腾讯QQ软件许可及服务协议》、《QQ号码规则》的补充协议，是其不可分割的组成部分，与其构成统一整体。本协议与上述内容存在冲突的，以本协议为准。本协议内容同时包括腾讯可能不断发布的关于本服务的相
  关协议、服务声明、业务规则及公告指引等内容（以下统称为“专项规则”）。专项规则一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。`

  return (
    <View className='container'>
      <View className='swiper_container'>
        <Swiper
          className='swiper_content'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
        >
          {pptList.length > 0 &&
            pptList.map((item, index: number) => {
              return (
                <SwiperItem key={index} className='swiper_item'>
                  <Image className='swiper_item_image' src={item.image} />
                </SwiperItem>
              )
            })}
        </Swiper>
      </View>
      <View className='content'>
        <View className='user'>
          <View className='left'>
            <Image
              className='user_avatar'
              src={`${imageUrl}business/avatar@2x.png`}
            />
            <View className='user_info'>
              {/* <Text className='user_info_item user_company'>
                xxxxx婚纱摄影公司
              </Text> */}
              <Text className='user_info_item user_name'>阿訾姑凉</Text>
              <Text className='user_info_item user_notice'>
                您尚未绑定会员,绑定后可享更多优惠!
              </Text>
            </View>
          </View>

          <View className='right'>
            <View className='bind_btn'>
              <Text className='bind_btn_text'>去绑定</Text>
            </View>
          </View>
        </View>

        <View className='business'>
          <View className='list'>
            <View className='list_item'>
              <View className='item_label'>
                <Text className='item_label_text'>商家店名</Text>
              </View>
              <View className='item_input'>
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  placeholder='请输入您的店铺名称'
                />
              </View>
            </View>

            <View className='list_item'>
              <View className='item_label'>
                <Text className='item_label_text'>商家电话</Text>
              </View>
              <View className='item_input'>
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  placeholder='请输入您的电话号码'
                />
              </View>
            </View>

            <View className='list_item'>
              <View className='item_label'>
                <Text className='item_label_text'>选服装日期时间</Text>
              </View>
              <View className='item_input'>
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  placeholder='请选择挑选服装的日期时间'
                />
              </View>
            </View>

            <View className='list_item'>
              <View className='item_label'>
                <Text className='item_label_text'>拍摄日期</Text>
              </View>
              <View className='item_input'>
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  placeholder='请选择日期'
                />
              </View>
            </View>

            <View className='list_item'>
              <View className='item_label'>
                <Text className='item_label_text'>客户姓名</Text>
              </View>
              <View className='item_input'>
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  placeholder='请输入客户姓名'
                />
              </View>
            </View>

            <View className='list_item'>
              <View className='item_label'>
                <Text className='item_label_text'>具体场景</Text>
              </View>
              <View
                className='item_input'
                onClick={() =>
                  redirectUrl('/pages/home/order/scene_selection/index')
                }
              >
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  placeholder='请选择场景'
                />
                <Image
                  className='item_input_arrow'
                  src={`${imageUrl}arrow_right@2x.png`}
                />
              </View>
            </View>

            <View className='list_item suits'>
              <View className='item_label'>
                <Text className='item_label_text'>服装套数</Text>
              </View>
              <View className='item_input'>
                <View className='item_input_reducer_ctn'>
                  <Image
                    className='item_input_reducer'
                    src={`${imageUrl}reducer@2x.png`}
                  />
                </View>
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                />
                <View className='item_input_plus_ctn'>
                  <Image
                    className='item_input_plus'
                    src={`${imageUrl}plus@2x.png`}
                  />
                </View>
              </View>
            </View>

            <View className='list_item'>
              <View className='item_label'>
                <Text className='item_label_text'>备注</Text>
              </View>
              <View className='item_input'>
                <Input
                  className='item_input_content'
                  placeholderClass='item_input_placeholder'
                  placeholder='请输入备注'
                />
              </View>
            </View>
          </View>
        </View>
        <View className='goods'>
          <View className='goods_item goods_flower'>
            <View className='goods_item_head'>
              <View className='goods_item_head_left'>
                <Text className='goods_item_head_left_text'>鲜花</Text>
              </View>
              <View className='goods_item_head_right'>
                <View
                  className={
                    currentFlowerCategory == 1
                      ? 'goods_item_head_right_btn active'
                      : 'goods_item_head_right_btn'
                  }
                  onClick={() => setFlowerCategory(1)}
                >
                  <Text className='goods_item_head_right_btn_text'>
                    鲜花A款
                  </Text>
                </View>
                <View
                  className={
                    currentFlowerCategory == 2
                      ? 'goods_item_head_right_btn active'
                      : 'goods_item_head_right_btn'
                  }
                  onClick={() => setFlowerCategory(2)}
                >
                  <Text className='goods_item_head_right_btn_text'>
                    鲜花B款
                  </Text>
                </View>
              </View>
            </View>

            <View className='goods_item_content'>
              <Image
                className='goods_item_img'
                src={`${imageUrl}yuding_flower@2x.png`}
              />
              <Image
                className='goods_item_img'
                src={`${imageUrl}yuding_flower@2x.png`}
              />
              <Image
                className='goods_item_img'
                src={`${imageUrl}yuding_flower@2x.png`}
              />
              <Image
                className='goods_item_img'
                src={`${imageUrl}yuding_flower@2x.png`}
              />
            </View>
          </View>

          <View className='goods_item goods_shuttle'>
            <View className='goods_item_head'>
              <View className='goods_item_head_title'>
                <Text className='goods_item_head_title_text'>接送车服务</Text>
              </View>
              <View className='goods_item_head_right'>
                <Image
                  className='head_arrow_right'
                  src={`${imageUrl}arrow_bottom@2x.png`}
                />
              </View>
            </View>
            <View className='goods_item_content'>
              <View
                onClick={() => setCurrentShuttleService(1)}
                className={
                  currentShuttleService == 1
                    ? 'content_item active'
                    : 'content_item'
                }
              >
                <Text className='content_item_text'>1天</Text>
              </View>
              <View
                onClick={() => setCurrentShuttleService(2)}
                className={
                  currentShuttleService == 2
                    ? 'content_item active'
                    : 'content_item'
                }
              >
                <Text className='content_item_text'>2天</Text>
              </View>
              <View
                onClick={() => setCurrentShuttleService(3)}
                className={
                  currentShuttleService == 3
                    ? 'content_item active'
                    : 'content_item'
                }
              >
                <Text className='content_item_text'>3天</Text>
              </View>
            </View>
          </View>
          <View className='goods_item goods_shuttle'>
            <View className='goods_item_head'>
              <View className='goods_item_head_title'>
                <Text className='goods_item_head_title_text'>配餐</Text>
              </View>
              <View className='goods_item_head_right'>
                <Image
                  className='head_arrow_right'
                  src={`${imageUrl}arrow_bottom@2x.png`}
                />
              </View>
            </View>
            <View className='goods_item_content'>
              <View
                className={
                  currentCaterService == 1
                    ? 'content_item active'
                    : 'content_item'
                }
                onClick={() => setCurrentCaterService(1)}
              >
                <Text className='content_item_text'>1天</Text>
              </View>
              <View
                className={
                  currentCaterService == 2
                    ? 'content_item active'
                    : 'content_item'
                }
                onClick={() => setCurrentCaterService(2)}
              >
                <Text className='content_item_text'>2天</Text>
              </View>
              <View
                className={
                  currentCaterService == 3
                    ? 'content_item active'
                    : 'content_item'
                }
                onClick={() => setCurrentCaterService(3)}
              >
                <Text className='content_item_text'>3天</Text>
              </View>
            </View>
          </View>
        </View>
        <View className='insurance'>
          <View className='insurance_tab'>
            <View className='tab active'>
              <Text className='tab_amount'>¥ 10元起</Text>
              <Text className='tab_title'>乐享旅拍 (A) </Text>
            </View>
            <View className='tab'>
              <Text className='tab_amount'>¥ 5元起</Text>
              <Text className='tab_title'>乐享旅拍 (B) </Text>
            </View>
            <View className='tab'>
              <Text className='tab_amount'>¥ 3元起</Text>
              <Text className='tab_title'>乐享旅拍 (C) </Text>
            </View>
          </View>
          <View className='insurance_content'>
            <View className='content_item'>
              <View className='content_item_label'>
                <Text className='label_text'>意外身故、残疾、烫伤每份保额</Text>
              </View>
              <View className='content_item_value'>
                <Text className='content_item_value_title'>保额:</Text>
                <Text className='content_item_value_amount'>1000000元</Text>
              </View>
            </View>
            <View className='content_item'>
              <View className='content_item_label'>
                <Text className='label_text'>意外医疗每份保额</Text>
              </View>
              <View className='content_item_value'>
                <Text className='content_item_value_title'>保额:</Text>
                <Text className='content_item_value_amount'>10000元</Text>
              </View>
            </View>
            <View className='content_item'>
              <View className='content_item_label'>
                <Text className='label_text'>意外医疗给付比例</Text>
              </View>
              <View className='content_item_value'>
                <Text className='content_item_value_title'>保额:</Text>
                <Text className='content_item_value_amount'>80%元</Text>
              </View>
            </View>
            <View className='content_item'>
              <View className='content_item_label'>
                <Text className='label_text'>意外医疗免赔偿</Text>
              </View>
              <View className='content_item_value'>
                <Text className='content_item_value_title'>保额:</Text>
                <Text className='content_item_value_amount'>1000元</Text>
              </View>
            </View>
          </View>
        </View>
        <View className='agreement'>
          <View className='agreement_left'>
            <View className='agreement_check'>
              <Image className='checked' src={`${imageUrl}right_red@2x.png`} />
            </View>
            <View
              className='agreement_content_text'
              onClick={() => setIsPopup(1)}
            >
              <Text className='agreement_title'>我已阅读并同意</Text>
              <Text className='agreement_exemption'>《服务免责协议》</Text>
            </View>
          </View>
          <View className='agreement_right'>
            <Image
              className='arrow_right'
              src={`${imageUrl}arrow_right@2x.png`}
            />
          </View>
        </View>
        <View className='button'>
          <View className='btn'>
            <Text className='btn_text'>提交预约</Text>
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
            <Text
              dangerouslySetInnerHTML={{ __html: html }}
              className='popup_content_item popup_text'
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
