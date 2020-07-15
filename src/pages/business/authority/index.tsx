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
      <View className='add_btn'>
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
    </View>
  )
}

export default Index
