import React, { useState } from 'react'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { imageUrl } from '@api/baseUrl'

import './index.scss'

function Index(props: any) {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [sceneList, setSceneList] = useState([
    {
      id: 1,
      title: '天涯海角',
      scenes: [
        {
          image: `${imageUrl}sanya@2x.png`,
        },
      ],
    },
    {
      id: 2,
      title: '大小洞天',
      scenes: [
        {
          image: `${imageUrl}sanya@2x.png`,
        },
      ],
    },
    {
      id: 3,
      title: '蜈支洲岛',
      scenes: [
        {
          image: `${imageUrl}sanya@2x.png`,
        },
      ],
    },
    {
      id: 4,
      title: '小东海',
      scenes: [
        {
          image: `${imageUrl}sanya@2x.png`,
        },
      ],
    },
    {
      id: 5,
      title: '三亚湾',
      scenes: [
        {
          image: `${imageUrl}sanya@2x.png`,
        },
      ],
    },
  ])

  return (
    <View className='container'>
      <View className='swiperContainer'>
        <Swiper
          className='ppt_content'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
        >
          <SwiperItem className='ppt_item'>
            <Image className='ppt_item_img' src={`${imageUrl}sanya@2x.png`} />
          </SwiperItem>
          <SwiperItem className='ppt_item'>
            <Image className='ppt_item_img' src={`${imageUrl}sanya@2x.png`} />
          </SwiperItem>
          <SwiperItem className='ppt_item'>
            <Image className='ppt_item_img' src={`${imageUrl}sanya@2x.png`} />
          </SwiperItem>
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
        <View className='scene_container'>
          {sceneList.length > 0 &&
            sceneList.map((item, index: number) => {
              return (
                <View
                  key={index}
                  className={
                    currentIndex == item.id
                      ? 'scene_item scene_item_active'
                      : 'scene_item'
                  }
                >
                  <View className='scene_item_title'>
                    <View className='title_text_content'>
                      <Text className='title_text'>{item.title}</Text>
                    </View>
                    <View className='title_arrow_content'>
                      <Image
                        className='title_arrow'
                        src={`${imageUrl}arrow_bottom@2x.png`}
                      />
                    </View>
                  </View>
                  {currentIndex == item.id && (
                    <View className='scene_item_content'>
                      <Swiper
                        className='scene_item_swiper'
                        indicatorColor='#999'
                        indicatorActiveColor='#333'
                        vertical={false}
                        circular
                        indicatorDots
                      >
                        <SwiperItem className='swiper_item'>
                          <Image
                            className='swiper_item_img'
                            src={`${imageUrl}sanya@2x.png`}
                          />
                        </SwiperItem>
                        <SwiperItem className='swiper_item'>
                          <Image
                            className='swiper_item_img'
                            src={`${imageUrl}sanya@2x.png`}
                          />
                        </SwiperItem>
                        <SwiperItem className='swiper_item'>
                          <Image
                            className='swiper_item_img'
                            src={`${imageUrl}sanya@2x.png`}
                          />
                        </SwiperItem>
                      </Swiper>
                    </View>
                  )}
                </View>
              )
            })}
        </View>

        <View className='btn_container'>
          <View className='btn'>
            <Text className='btn_text'>确认场景</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
