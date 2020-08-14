import React, { Fragment } from 'react'
import { View } from '@tarojs/components'

// import 'taro-ui/dist/style/index.scss' // 全局引入一次即可

import './app.scss'

function App(props: any) {
  return (
    <Fragment>
      <View>{props.children}</View>
    </Fragment>
  )
}

export default App
