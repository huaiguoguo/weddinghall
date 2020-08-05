import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { imageUrl } from '@api/baseUrl'
import http from '@api/interceptor'

import './index.scss'

interface IList {
  role: number
  role_name: string
  user_id: number
  username: string
  imageurl: string
}

function Index(props: any) {
  const [isPopup, setIsPopup] = useState<number>(0)
  const [waitingRemoveUser, setWaitingRemoveUser] = useState(0)
  const [show, setShow] = useState(0)

  const [list, setList] = useState<IList[]>([
    {
      role: 1,
      role_name: '管理员',
      user_id: 1,
      username: '阿訾姑娘',
      imageurl: `${imageUrl}/user_1@2x.png`,
    },
    {
      role: 2,
      role_name: '成员',
      user_id: 2,
      username: '白开水',
      imageurl: `${imageUrl}/user_2@2x.png`,
    },
    {
      role: 2,
      role_name: '成员',
      user_id: 3,
      username: '叶子',
      imageurl: `${imageUrl}/user_1@2x.png`,
    },
    {
      role: 2,
      role_name: '成员',
      user_id: 4,
      username: '火火兔',
      imageurl: `${imageUrl}/user_2@2x.png`,
    },
    {
      role: 2,
      role_name: '成员',
      user_id: 5,
      username: '天文望远镜',
      imageurl: `${imageUrl}/user_1@2x.png`,
    },
  ])

  useDidShow(async () => {
    // const data: IList[] = []
    // ;[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
    //   list.push({
    //     username: '阿訾',
    //     imageurl: `${imageUrl}/user_1@2x.png`,
    //     status: 1,
    //   })
    // })
    // setList(data)
    // console.log(list)
  })

  const handleToggle = (user_id: number) => {
    if (show) {
      setShow(0)
      setWaitingRemoveUser(0)
    } else {
      setShow(1)
      setWaitingRemoveUser(user_id)
    }
  }

  const handleCancel = () => {
    setShow(0)
  }

  const handleRemove = async () => {
    if (!waitingRemoveUser) {
      Taro.showToast({
        icon: 'none',
        title: '用户不存在',
      })
      return false
    }
    Taro.showToast({
      icon: 'success',
      title: '删除成功~',
    })
    setShow(0)
    return false
    const res = await http.post('', {
      user_id: waitingRemoveUser,
    })
    console.log(res)
  }

  const addMembers = () => {
    setIsPopup(1)
  }

  const cancel = (e) => {
    e.stopPropagation()
    setIsPopup(2)
  }

  return (
    <View className='container'>
      <View className='list'>
        {list.length > 0 &&
          list.map((item: IList, index: number) => {
            return (
              <View key={index} className='item'>
                <View className='user_info'>
                  <Image className='avatar' src={item.imageurl} />
                  <Text className='username'>{item.username}</Text>
                </View>
                <View className='arrow'>
                  <Text className='authority'>
                    {item.role_name}
                    {item.role != 1 ? '-仅查看' : ''}
                  </Text>
                  <Image
                    onClick={() => handleToggle(item.user_id)}
                    className='icon'
                    src={`${imageUrl}arrow_right@2x.png`}
                  />
                </View>
              </View>
            )
          })}
      </View>
      <View className='add_btn' onClick={addMembers}>
        <Image className='add_icon' src={`${imageUrl}add_icon@2x.png`} />
        <Text className='add_text'>添加新成员</Text>
      </View>

      {!!show && (
        <View className='modal'>
          <View className='modal_content'>
            <Text
              className='modal_item modal_item_active'
              onClick={handleRemove}
            >
              移出成员
            </Text>
            <Text className='modal_item' onClick={handleCancel}>
              取消
            </Text>
          </View>
        </View>
      )}

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
            <View className='content_head'>
              <Image className='bg' src={`${imageUrl}business/close@2x.png`} />
              <View className='title'>
                <Text className='title_text'>二维码邀请</Text>
              </View>
            </View>

            <View className='content_list'>
              <View className='list_head'>
                <Text className='item_label'>扫一扫, 添加新成员</Text>
              </View>
              <View className='list_qrcode'>
                <Image
                  className='qrcode_image'
                  src={`${imageUrl}business/qrcode@2x.png`}
                />
              </View>
              <View className='list_btn'>
                <Text className='btn_text'>长按保存至相册</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
