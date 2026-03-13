export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/repair/index',
    'pages/payment/index',
    'pages/notice/index',
    'pages/profile/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '智慧物业',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#1890ff',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/tabbar/home.png',
        selectedIconPath: './assets/tabbar/home-active.png',
      },
      {
        pagePath: 'pages/repair/index',
        text: '报修',
        iconPath: './assets/tabbar/wrench.png',
        selectedIconPath: './assets/tabbar/wrench-active.png',
      },
      {
        pagePath: 'pages/payment/index',
        text: '缴费',
        iconPath: './assets/tabbar/credit-card.png',
        selectedIconPath: './assets/tabbar/credit-card-active.png',
      },
      {
        pagePath: 'pages/notice/index',
        text: '通知',
        iconPath: './assets/tabbar/bell.png',
        selectedIconPath: './assets/tabbar/bell-active.png',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: './assets/tabbar/user.png',
        selectedIconPath: './assets/tabbar/user-active.png',
      }
    ]
  }
})
