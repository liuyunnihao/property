import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import { Wrench, CreditCard, Bell, Phone, MapPin, Shield } from 'lucide-react-taro'
import './index.css'

interface Notice {
  id: number
  title: string
  content: string
  date: string
}

const IndexPage = () => {
  const [currentNotice, setCurrentNotice] = useState(0)

  const notices: Notice[] = [
    {
      id: 1,
      title: '关于小区停水通知',
      content: '因供水管道维修，本小区将于2024年1月15日9:00-17:00暂停供水，请提前储水。',
      date: '2024-01-14'
    },
    {
      id: 2,
      title: '冬季消防温馨提示',
      content: '冬季干燥，请注意用电用火安全，及时清理楼道杂物，保持消防通道畅通。',
      date: '2024-01-13'
    },
    {
      id: 3,
      title: '小区绿化维护通知',
      content: '物业将于1月20日对小区绿化进行修剪维护，届时请勿靠近作业区域。',
      date: '2024-01-12'
    }
  ]

  const quickActions = [
    {
      id: 1,
      name: '在线报修',
      icon: <Wrench size={32} color="#1890ff" />,
      page: '/pages/repair/index'
    },
    {
      id: 2,
      name: '物业缴费',
      icon: <CreditCard size={32} color="#1890ff" />,
      page: '/pages/payment/index'
    },
    {
      id: 3,
      name: '物业通知',
      icon: <Bell size={32} color="#1890ff" />,
      page: '/pages/notice/index'
    },
    {
      id: 4,
      name: '联系物业',
      icon: <Phone size={32} color="#1890ff" />,
      action: () => {
        Taro.makePhoneCall({
          phoneNumber: '400-123-4567'
        })
      }
    }
  ]

  const handleQuickAction = (item: typeof quickActions[0]) => {
    if (item.page) {
      Taro.switchTab({
        url: item.page
      })
    } else if (item.action) {
      item.action()
    }
  }

  return (
    <View className="min-h-screen bg-gray-100">
      {/* 顶部欢迎卡片 */}
      <View className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
        <Text className="block text-xl font-bold mb-2">智慧物业</Text>
        <Text className="block text-sm opacity-90">为您提供便捷的物业服务</Text>
      </View>

      {/* 公告轮播 */}
      <View className="px-4 py-4">
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <View className="flex items-center justify-between mb-3">
            <Text className="block text-base font-semibold text-gray-900">物业公告</Text>
            <Text
              className="block text-xs text-blue-500"
              onClick={() => Taro.switchTab({ url: '/pages/notice/index' })}
            >
              查看全部
            </Text>
          </View>
          <Swiper
            className="h-24"
            autoplay
            interval={3000}
            circular
            onChange={(e) => setCurrentNotice(e.detail.current)}
          >
            {notices.map((notice) => (
              <SwiperItem key={notice.id}>
                <View className="h-full flex flex-col justify-center">
                  <Text className="block text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                    {notice.title}
                  </Text>
                  <Text className="block text-xs text-gray-500 line-clamp-2">
                    {notice.content}
                  </Text>
                </View>
              </SwiperItem>
            ))}
          </Swiper>
          <View className="flex justify-center gap-1 mt-2">
            {notices.map((_, index) => (
              <View
                key={index}
                className={`w-4 h-1 rounded-full ${index === currentNotice ? 'bg-blue-500' : 'bg-gray-300'}`}
              />
            ))}
          </View>
        </View>
      </View>

      {/* 快捷入口 */}
      <View className="px-4 mb-4">
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <Text className="block text-base font-semibold text-gray-900 mb-4">快捷服务</Text>
          <View className="grid grid-cols-4 gap-4">
            {quickActions.map((item) => (
              <View
                key={item.id}
                className="flex flex-col items-center"
                onClick={() => handleQuickAction(item)}
              >
                <View className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                  {item.icon}
                </View>
                <Text className="block text-xs text-gray-700">{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 物业服务卡片 */}
      <View className="px-4 mb-4">
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <Text className="block text-base font-semibold text-gray-900 mb-4">物业服务</Text>
          <View className="space-y-3">
            <View className="flex items-center justify-between py-3 border-b border-gray-100">
              <View className="flex items-center gap-3">
                <View className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <Shield size={20} color="#52c41a" />
                </View>
                <View>
                  <Text className="block text-sm font-medium text-gray-900">小区安全</Text>
                  <Text className="block text-xs text-gray-500">24小时安保巡逻</Text>
                </View>
              </View>
              <Text className="block text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                正常
              </Text>
            </View>

            <View className="flex items-center justify-between py-3 border-b border-gray-100">
              <View className="flex items-center gap-3">
                <View className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <MapPin size={20} color="#1890ff" />
                </View>
                <View>
                  <Text className="block text-sm font-medium text-gray-900">小区环境</Text>
                  <Text className="block text-xs text-gray-500">绿化维护良好</Text>
                </View>
              </View>
              <Text className="block text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                良好
              </Text>
            </View>

            <View className="flex items-center justify-between py-3">
              <View className="flex items-center gap-3">
                <View className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Phone size={20} color="#722ed1" />
                </View>
                <View>
                  <Text className="block text-sm font-medium text-gray-900">物业服务</Text>
                  <Text className="block text-xs text-gray-500">服务热线 400-123-4567</Text>
                </View>
              </View>
              <Text
                className="block text-xs text-blue-500"
                onClick={() => Taro.makePhoneCall({ phoneNumber: '400-123-4567' })}
              >
                拨打电话
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* 底部留白，避开 TabBar */}
      <View className="h-16" />
    </View>
  )
}

export default IndexPage
