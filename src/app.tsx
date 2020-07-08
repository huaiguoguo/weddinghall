import React, { Fragment } from 'react'
import { View } from '@tarojs/components'

import './app.scss'

function App(props: any) {
  return (
    <Fragment>
      <View>{props.children}</View>
    </Fragment>
  )
}

export default App
