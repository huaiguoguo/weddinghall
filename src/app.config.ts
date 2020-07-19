export default {
  pages: [
    'pages/home/index',
    'pages/home/category/index',
    'pages/home/goods/index',
    'pages/business/index',
    'pages/business/authority/index',
    'pages/appointment/index'
  ],
  tabBar: {
    custom: true,
    list: [
      {
        iconPath: 'assets/images/millennium_icon@2x.png',
        selectedIconPath: 'assets/images/millennium_icon@2x.png',
        pagePath: 'pages/home/index',
        text: ''
      },
      {
        iconPath: 'assets/images/phone@2x.png',
        selectedIconPath: 'assets/images/phone@2x.png',
        pagePath: 'pages/appointment/index',
        text: '专属热线'
      },
      {
        iconPath: 'assets/images/business@2x.png',
        selectedIconPath: 'assets/images/business@2x.png',
        pagePath: 'pages/business/index',
        text: '商家中心'
      }
    ],
    color: '#ffffff',
    selectedColor: '#56abe4',
    backgroundColor: '#fff',
    borderStyle: 'white'
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
