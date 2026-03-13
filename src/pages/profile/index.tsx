import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { User, Phone, MapPin, CreditCard, Wrench, Bell, Settings } from 'lucide-react-taro'

const ProfilePage = () => {
  const userInfo = {
    name: '张三',
    phone: '138****8888',
    room: '3号楼1单元1202',
    avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  }

  const quickActions = [
    {
      id: 1,
      name: '我的报修',
      icon: <Wrench size={20} color="#1890ff" />,
      count: 3,
      path: '/pages/repair/index'
    },
    {
      id: 2,
      name: '缴费记录',
      icon: <CreditCard size={20} color="#52c41a" />,
      count: 12,
      path: '/pages/payment/index'
    },
    {
      id: 3,
      name: '通知消息',
      icon: <Bell size={20} color="#faad14" />,
      count: 2,
      path: '/pages/notice/index'
    }
  ]

  const menuItems = [
    {
      id: 1,
      name: '房屋信息',
      icon: <MapPin size={20} color="#722ed1" />,
      rightText: '3-1-1202'
    },
    {
      id: 2,
      name: '手机号',
      icon: <Phone size={20} color="#1890ff" />,
      rightText: '138****8888'
    },
    {
      id: 3,
      name: '帮助中心',
      icon: <Settings size={20} color="#52c41a" />,
      rightText: ''
    },
    {
      id: 4,
      name: '设置',
      icon: <Settings size={20} color="#8c8c8c" />,
      rightText: ''
    }
  ]

  const handleQuickAction = (item: typeof quickActions[0]) => {
    Taro.switchTab({
      url: item.path
    })
  }

  const handleMenuItem = (item: typeof menuItems[0]) => {
    if (item.id === 3) {
      Taro.showModal({
        title: '帮助中心',
        content: '如有问题，请联系物业：400-123-4567',
        showCancel: false
      })
    } else if (item.id === 4) {
      Taro.showToast({
        title: '功能开发中',
        icon: 'none'
      })
    }
  }

  const handleLogout = () => {
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({
            title: '已退出登录',
            icon: 'success'
          })
        }
      }
    })
  }

  return (
    <View className="min-h-screen bg-gray-100">
      {/* 用户信息卡片 */}
      <View className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white mb-4">
        <View className="flex items-center gap-4">
          <View className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <Image src={userInfo.avatar} className="w-full h-full" mode="aspectFill" />
          </View>
          <View className="flex-1">
            <Text className="block text-xl font-bold mb-1">{userInfo.name}</Text>
            <Text className="block text-sm opacity-90">{userInfo.room}</Text>
          </View>
          <View className="flex-shrink-0">
            <View className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <User size={20} color="white" />
            </View>
          </View>
        </View>
      </View>

      <View className="p-4">
        {/* 快捷入口 */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="grid grid-cols-3 gap-4">
            {quickActions.map((item) => (
              <View
                key={item.id}
                className="flex flex-col items-center"
                onClick={() => handleQuickAction(item)}
              >
                <View className="relative w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                  {item.icon}
                  {item.count > 0 && (
                    <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <Text className="text-xs text-white font-medium">{item.count}</Text>
                    </View>
                  )}
                </View>
                <Text className="block text-xs text-gray-700">{item.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 菜单列表 */}
        <View className="bg-white rounded-xl shadow-sm mb-4">
          {menuItems.map((item, index) => (
            <View
              key={item.id}
              className={`flex items-center justify-between px-4 py-4 ${
                index < menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              onClick={() => handleMenuItem(item)}
            >
              <View className="flex items-center gap-3">
                <View className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                  {item.icon}
                </View>
                <Text className="text-sm text-gray-900">{item.name}</Text>
              </View>
              <View className="flex items-center gap-2">
                {item.rightText && (
                  <Text className="text-xs text-gray-500">{item.rightText}</Text>
                )}
                <Text className="text-gray-400 text-xs">›</Text>
              </View>
            </View>
          ))}
        </View>

        {/* 联系物业卡片 */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex items-center justify-between">
            <View className="flex items-center gap-3">
              <View className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Phone size={20} color="#1890ff" />
              </View>
              <View>
                <Text className="block text-sm font-medium text-gray-900">联系物业</Text>
                <Text className="block text-xs text-gray-500">服务热线 400-123-4567</Text>
              </View>
            </View>
            <Button
              className="bg-blue-500 text-white rounded-full px-4 py-2 text-xs"
              onClick={() => Taro.makePhoneCall({ phoneNumber: '400-123-4567' })}
            >
              拨打电话
            </Button>
          </View>
        </View>

        {/* 退出登录 */}
        <Button
          className="w-full bg-white text-red-500 border border-red-300 rounded-lg py-3 text-sm font-medium"
          onClick={handleLogout}
        >
          退出登录
        </Button>
      </View>

      {/* 底部留白，避开 TabBar */}
      <View className="h-16" />
    </View>
  )
}

export default ProfilePage
