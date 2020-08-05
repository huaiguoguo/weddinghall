export default {
  pages: [
    'pages/business/authority/index',
    'pages/home/index',
    'pages/home/order/index',
    'pages/home/order/scene_selection/index',
    'pages/business/order/detail/index',
    'pages/business/selection/index',
    // 'pages/home/category/index',
    // 'pages/home/goods/index',

    'pages/business/index',
    'pages/business/order/index',
    'pages/business/order/search/index',

    'pages/business/service/index',
    'pages/business/setting/index',

    'pages/business/setting/store_profile/index',
    'pages/business/setting/store_profile/store_agreement/index',

    'pages/business/setting/change_pay_password/index',
    'pages/business/setting/bank/index',
    'pages/business/setting/bank/add_bank/index',
    'pages/business/setting/bank/set_pay_password/index',

    'pages/business/setting/agreement/index',
    'pages/business/setting/clear/index',

    'pages/business/member_benefits/index',

    'pages/appointment/index',
  ],
  tabBar: {
    custom: true,
    list: [
      {
        iconPath: 'assets/images/millennium_icon@2x.png',
        selectedIconPath: 'assets/images/millennium_icon@2x.png',
        pagePath: 'pages/home/index',
        text: '',
      },
      {
        iconPath: 'assets/images/phone@2x.png',
        selectedIconPath: 'assets/images/phone@2x.png',
        pagePath: 'pages/appointment/index',
        text: '专属热线',
      },
      {
        iconPath: 'assets/images/business@2x.png',
        selectedIconPath: 'assets/images/business@2x.png',
        pagePath: 'pages/business/index',
        text: '商家中心',
      },
    ],
    color: '#ffffff',
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
