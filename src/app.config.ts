export default {
  pages: [
    'pages/home/index',
    'pages/opus/index',
    'pages/nested/index',
    'pages/mine/index',
  ],
  tabBar: {
    list: [
      {
        iconPath: 'assets/images/test.png',
        selectedIconPath: 'assets/images/test.png',
        pagePath: 'pages/home/index',
        text: '首页',
      },
      {
        iconPath: 'assets/images/abc_1.png',
        selectedIconPath: 'assets/images/abc_1.png',
        pagePath: 'pages/opus/index',
        text: '作品',
      },
      {
        iconPath: 'assets/images/abc_2.png',
        selectedIconPath: 'assets/images/abc_2.png',
        pagePath: 'pages/nested/index',
        text: '套系',
      },
      {
        iconPath: 'assets/images/abc_2.png',
        selectedIconPath: 'assets/images/abc_2.png',
        pagePath: 'pages/mine/index',
        text: '我的',
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
