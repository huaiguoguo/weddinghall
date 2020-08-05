import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { imageUrl } from '@api/baseUrl'

import './index.scss'

function Index(props: any) {
  const [isPopup, setIsPopup] = useState<number>(0)
  const [orderDetail, setOrderDetail] = useState({
    order_sn: '210540384564125',
    order_status: 1,
    order_goods: [
      {
        goods_title: '',
        goods_image: '',
      },
    ],
  })

  const saveAppointMent = (e) => {
    e.stopPropagation()
    setIsPopup(1)
  }

  const confirmPay = (e) => {
    e.stopPropagation()
    setIsPopup(3)
  }

  const showPopup = (e) => {
    e.stopPropagation()
    console.log('========start', isPopup)
    setIsPopup(1)
    console.log('========end', isPopup)
    // console.log(isPopup);
  }

  const confirm = (e) => {
    e.stopPropagation()
    setIsPopup(2)
  }

  const cancel = (e) => {
    e.stopPropagation()
    setIsPopup(2)
  }

  return (
    <View className='container'>
      <View className='order_head'>
        <Text className='head_title'>订单信息</Text>
      </View>
      <View className='order_content'>
        <View className='order_content_list'>
          <View className='order_item'>
            <Text className='order_item_label'>订单编号:</Text>
            <Text className='order_item_value'>210540384564125</Text>
          </View>
          <View className='order_item'>
            <Text className='order_item_label'>商家店名:</Text>
            <Text className='order_item_value'>三年二班</Text>
          </View>
          <View className='order_item'>
            <Text className='order_item_label'>商家电话:</Text>
            <Text className='order_item_value'>17763962622</Text>
          </View>
          <View className='order_item'>
            <Text className='order_item_label'>选服装日期:</Text>
            <Text className='order_item_value'> 6月7日 8:30</Text>
          </View>
          <View className='order_item'>
            <Text className='order_item_label'>拍摄日期:</Text>
            <Text className='order_item_value'>6月8日 - 6月9日</Text>
          </View>
          <View className='order_item'>
            <Text className='order_item_label'>客户姓名:</Text>
            <Text className='order_item_value'>沈玉蓉</Text>
          </View>
          <View className='order_item'>
            <Text className='order_item_label'>具体场景:</Text>
            <Text className='order_item_value'>三亚湾、礁石</Text>
          </View>
          <View className='order_item'>
            <Text className='order_item_label'>服装套数:</Text>
            <Text className='order_item_value'>3套</Text>
          </View>
          <View className='order_item'>
            <Text className='order_item_label'>备注:</Text>
            <Text className='order_item_value'>210540384564125</Text>
          </View>
        </View>
      </View>
      <View className='order_insurance'>
        <Image
          className='order_insurance_bg'
          src={`${imageUrl}order_insurance_top_bg@2x.png`}
        />
        <View className='order_insurance_title'>
          <Text className='order_insurance_title_text'>乐享旅拍（A）</Text>
        </View>
        <View className='order_insurance_list'>
          <View className='insurance_item'>
            <View className='insurance_item_label_content'>
              <Text className='insurance_item_label'>
                意外身故、残疾、烫伤每份保额:
              </Text>
            </View>
            <View className='insurance_item_value_content'>
              <Text className='insurance_item_value_label'>保额:</Text>
              <Text className='insurance_item_value_value'>1000000元</Text>
            </View>
          </View>
          <View className='insurance_item'>
            <View className='insurance_item_label_content'>
              <Text className='insurance_item_label'>意外医疗每份保额:</Text>
            </View>
            <View className='insurance_item_value_content'>
              <Text className='insurance_item_value_label'>保额:</Text>
              <Text className='insurance_item_value_value'>100000元</Text>
            </View>
          </View>
          <View className='insurance_item'>
            <View className='insurance_item_label_content'>
              <Text className='insurance_item_label'>意外医疗给付比例:</Text>
            </View>
            <View className='insurance_item_value_content'>
              <Text className='insurance_item_value_label'>保额:</Text>
              <Text className='insurance_item_value_value'>80%元 </Text>
            </View>
          </View>
          <View className='insurance_item'>
            <View className='insurance_item_label_content'>
              <Text className='insurance_item_label'>意外医疗免赔额:</Text>
            </View>
            <View className='insurance_item_value_content'>
              <Text className='insurance_item_value_label'>保额:</Text>
              <Text className='insurance_item_value_value'>100元</Text>
            </View>
          </View>
        </View>
      </View>
      <View className='order_btn'>
        <View className='order_btn_item save_btn' onClick={saveAppointMent}>
          <Text className='btn_text save_btn_text'>保存预约信息</Text>
        </View>
        <View className='order_btn_item confirm_btn'>
          <Text className='btn_text confirm_btn_text' onClick={confirmPay}>
            确认支付
          </Text>
        </View>
      </View>

      {/* 弹窗盒子 */}
      <View
        className={
          isPopup == 1 || isPopup == 3
            ? 'popupBox popupBoxShow'
            : isPopup == 2 || isPopup == 4
            ? 'popupBox popupBoxHidden'
            : 'popupBox'
        }
      >
        {/* 保存预约信息 内容 */}
        <View
          className={
            isPopup == 1
              ? 'save_appoint_ment popup_container_up'
              : isPopup == 2
              ? 'save_appoint_ment popup_container_down'
              : 'save_appoint_ment'
          }
        >
          <View className='content'>
            <View className='save_appointment_top_bg'>
              <Image
                className='bg'
                src={`${imageUrl}save_appointment_top_bg@2x.png`}
              />
              <View className='title'>
                <Text className='title_text'>订单信息</Text>
              </View>
            </View>

            <View className='content_list'>
              <View className='list_item'>
                <Text className='item_label'>订单编号:</Text>
                <Text className='item_value'>210540384564125</Text>
              </View>
              <View className='list_item'>
                <Text className='item_label'>商家店名:</Text>
                <Text className='item_value'>三年二班</Text>
              </View>
              <View className='list_item'>
                <Text className='item_label'>商家电话:</Text>
                <Text className='item_value'>17763962622</Text>
              </View>
              <View className='list_item'>
                <Text className='item_label'>选服装日期:</Text>
                <Text className='item_value'> 6月7日 8:30</Text>
              </View>
              <View className='list_item'>
                <Text className='item_label'>拍摄日期:</Text>
                <Text className='item_value'>6月8日 - 6月9日</Text>
              </View>
              <View className='list_item'>
                <Text className='item_label'>客户姓名:</Text>
                <Text className='item_value'>沈玉蓉</Text>
              </View>
              <View className='list_item'>
                <Text className='item_label'>具体场景:</Text>
                <Text className='item_value'>三亚湾，礁石</Text>
              </View>
              <View className='list_item'>
                <Text className='item_label'>服装套数:</Text>
                <Text className='item_value'>3套</Text>
              </View>
              <View className='list_item'>
                <Text className='item_label'>备注:</Text>
                <Text className='item_value'>abcabc</Text>
              </View>
            </View>
          </View>
          <View className='bottom_btn'>
            <View className='bottom_btn_arrow' onClick={(e) => cancel(e)}>
              <Image
                className='arrow_icon'
                src={`${imageUrl}save_appointment_arrow@2x.png`}
              />
            </View>
            <View className='save_to_mobile' onClick={(e) => cancel(e)}>
              <Text className='save_to_mobile_text'>保存到手机</Text>
            </View>
          </View>
        </View>
        {/* 支付弹窗 内容 */}
        <View
          className={
            isPopup == 3
              ? 'confirm_pay popup_container_up'
              : isPopup == 4
              ? 'confirm_pay popup_container_down'
              : 'confirm_pay'
          }
        >
          {/* 余额支付 */}
          <View
            className={
              isPopup == 3
                ? 'balance popup_container_up'
                : isPopup == 4
                ? 'balance popup_container_down'
                : 'balance'
            }
          >
            <View className='title'>
              <Text className='title_text'>付款详情</Text>
            </View>
            <View className='balance_content'>
              <View className='content_item dress'>
                <View className='content_item_label'>
                  <Text>礼服</Text>
                </View>
                <View className='content_item_value'>
                  <View className='item_value_item'>
                    <View className='item_value_label'>三亚湾</View>
                    <View className='item_value_value'>
                      <Text className='amount'>¥200</Text>
                      <Text className='total'>x1</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className='content_item scene'>
                <View className='content_item_label'>
                  <Text>场景</Text>
                </View>
                <View className='content_item_value'>
                  <View className='item_value_item'>
                    <View className='item_value_label'>三亚湾</View>
                    <View className='item_value_value'>
                      <Text className='amount'>¥200</Text>
                      <Text className='total'>x1</Text>
                    </View>
                  </View>
                  <View className='item_value_item'>
                    <View className='item_value_label'>小东海</View>
                    <View className='item_value_value'>
                      <Text className='amount'>¥300</Text>
                      <Text className='total'>x1</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className='content_item flower'>
                <View className='content_item_label'>
                  <Text>鲜花</Text>
                </View>
                <View className='content_item_value'>
                  <View className='item_value_item'>
                    <View className='item_value_label'>鲜花(A)</View>
                    <View className='item_value_value'>
                      <Text className='amount'>¥80</Text>
                      <Text className='total'>x5</Text>
                    </View>
                  </View>
                  <View className='item_value_item'>
                    <View className='item_value_label'>鲜花(B)</View>
                    <View className='item_value_value'>
                      <Text className='amount'>¥80</Text>
                      <Text className='total'>x5</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className='content_item shuttle'>
                <View className='content_item_label'>
                  <Text>接送车服务</Text>
                </View>
                <View className='content_item_value'>
                  <View className='item_value_item'>
                    <View className='item_value_label'>三亚湾</View>
                    <View className='item_value_value'>
                      <Text className='amount'>¥80</Text>
                      <Text className='total'>x3</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className='content_item catering'>
                <View className='content_item_label'>
                  <Text>配餐</Text>
                </View>
                <View className='content_item_value'>
                  <View className='item_value_item'>
                    <View className='item_value_label'>三亚湾</View>
                    <View className='item_value_value'>
                      <Text className='amount'>¥50</Text>
                      <Text className='total'>x3</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className='content_item insurance'>
                <View className='content_item_label'>
                  <Text>保险</Text>
                </View>
                <View className='content_item_value'>
                  <View className='item_value_item'>
                    <View className='item_value_label'>乐享旅拍（A）</View>
                    <View className='item_value_value'>
                      <Text className='amount'>¥50</Text>
                      <Text className='total'>x3</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className='content_item total'>
                <View className='content_item_label'>
                  <Text>共计</Text>
                </View>
                <View className='content_item_value'>
                  <View className='item_value_item'>
                    <View className='item_value_label'>三亚湾</View>
                    <View className='item_value_value'>
                      <Text className='amount'>¥800</Text>
                      <Text className='total'>x1</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className='btn_content'>
              <View className='btn_content_title'>
                <Text className='btn_content_title_text'>付款方式</Text>
              </View>
              <View className='btn_content_icon' onClick={(e) => cancel(e)}>
                <Image className='btn_icon' src={`${imageUrl}balance@2x.png`} />
              </View>
              <View className='balance_pay_btn' onClick={(e) => cancel(e)}>
                <Text className='balance_pay_btn_text'>余额支付</Text>
              </View>
            </View>
          </View>
          {/* 微信支付 */}
          <View className='wepay'>
            <View className='title'>
              <Text className='title_text'>付款详情</Text>
            </View>
            <View className='wepay_content'></View>
            <View className='btn_content'>
              <View className='btn_content_title'>
                <Text className='btn_content_title_text'>付款方式</Text>
              </View>
              <View className='btn_content_icon'>
                <Image className='btn_icon' src={`${imageUrl}wepay@2x.png`} />
              </View>
              <View className='balance_pay_btn'>
                <Text className='balance_pay_btn_text'>余额支付</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
