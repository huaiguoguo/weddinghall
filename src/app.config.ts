export default {
  pages: [
    'pages/home/index',
    'pages/appointment/index',
    'pages/business/index',
  ],
  tabBar: {
    custom: true,
    list: [
      {
        iconPath: 'assets/images/abc_1.png',
        selectedIconPath: 'assets/images/abc_1.png',
        pagePath: 'pages/home/index',
        text: '婚嫁馆',
      },
      {
        iconPath: 'assets/images/abc_1.png',
        selectedIconPath: 'assets/images/abc_1.png',
        pagePath: 'pages/appointment/index',
        text: '专属热线',
      },
      {
        iconPath: 'assets/images/abc_2.png',
        selectedIconPath: 'assets/images/ttt.png',
        pagePath: 'pages/business/index',
        text: '商家中心',
      },
    ],
    color: '#000',
    selectedColor: '#56abe4',
    backgroundColor: '#fff',
    borderStyle: 'white',
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
}
