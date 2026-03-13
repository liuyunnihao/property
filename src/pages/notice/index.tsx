import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import { Bell, FileText, Calendar } from 'lucide-react-taro'

interface Notice {
  id: number
  title: string
  content: string
  type: 'urgent' | 'info' | 'maintenance' | 'event'
  status: 'unread' | 'read'
  date: string
  icon: any
}

const NoticePage = () => {
  const [selectedType, setSelectedType] = useState('all')

  const notices: Notice[] = [
    {
      id: 1,
      title: '关于小区停水通知',
      content: '因供水管道维修，本小区将于2024年1月15日9:00-17:00暂停供水，请提前储水。给您带来的不便，敬请谅解。',
      type: 'urgent',
      status: 'unread',
      date: '2024-01-14',
      icon: <FileText size={20} color="#ff4d4f" />
    },
    {
      id: 2,
      title: '冬季消防温馨提示',
      content: '冬季干燥，请注意用电用火安全，及时清理楼道杂物，保持消防通道畅通。物业将定期进行消防安全检查。',
      type: 'info',
      status: 'read',
      date: '2024-01-13',
      icon: <FileText size={20} color="#52c41a" />
    },
    {
      id: 3,
      title: '小区绿化维护通知',
      content: '物业将于1月20日对小区绿化进行修剪维护，届时请勿靠近作业区域。感谢您的理解与配合。',
      type: 'maintenance',
      status: 'unread',
      date: '2024-01-12',
      icon: <FileText size={20} color="#1890ff" />
    },
    {
      id: 4,
      title: '春节社区活动通知',
      content: '为丰富业主文化生活，物业将于春节期间举办迎春联欢会，欢迎各位业主积极参与。活动时间：1月28日14:00-17:00，地点：小区活动中心。',
      type: 'event',
      status: 'read',
      date: '2024-01-10',
      icon: <Calendar size={20} color="#722ed1" />
    },
    {
      id: 5,
      title: '电梯维护保养通知',
      content: '为确保电梯安全运行，物业将于1月18日对3号楼电梯进行例行维护保养，届时电梯将暂停使用，请提前安排出行。',
      type: 'maintenance',
      status: 'read',
      date: '2024-01-08',
      icon: <FileText size={20} color="#1890ff" />
    },
    {
      id: 6,
      title: '关于垃圾分类的通知',
      content: '为响应环保号召，小区将全面推行垃圾分类。请各位业主按照分类标准投放垃圾，共同营造美好家园。',
      type: 'info',
      status: 'unread',
      date: '2024-01-05',
      icon: <FileText size={20} color="#52c41a" />
    }
  ]

  const typeFilters = [
    { key: 'all', name: '全部' },
    { key: 'urgent', name: '紧急' },
    { key: 'info', name: '通知' },
    { key: 'maintenance', name: '维护' },
    { key: 'event', name: '活动' }
  ]

  const getTypeColor = (type: Notice['type']) => {
    const colors = {
      urgent: 'bg-red-50 text-red-600',
      info: 'bg-green-50 text-green-600',
      maintenance: 'bg-blue-50 text-blue-600',
      event: 'bg-purple-50 text-purple-600'
    }
    return colors[type]
  }

  const getTypeName = (type: Notice['type']) => {
    const names = {
      urgent: '紧急通知',
      info: '温馨提示',
      maintenance: '维护通知',
      event: '活动通知'
    }
    return names[type]
  }

  const filteredNotices = selectedType === 'all'
    ? notices
    : notices.filter(n => n.type === selectedType)

  const handleNoticeClick = (notice: Notice) => {
    if (notice.status === 'unread') {
      // 标记为已读（模拟）
      notice.status = 'read'
    }
    Taro.showModal({
      title: notice.title,
      content: notice.content,
      showCancel: false
    })
  }

  return (
    <View className="min-h-screen bg-gray-100">
      {/* 顶部统计 */}
      <View className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
        <View className="flex items-center gap-2 mb-2">
          <Bell size={24} />
          <Text className="block text-lg font-bold">物业通知</Text>
        </View>
        <View className="flex items-center gap-4 mt-4">
          <View className="flex-1">
            <Text className="block text-3xl font-bold">
              {notices.filter(n => n.status === 'unread').length}
            </Text>
            <Text className="block text-xs opacity-90">未读通知</Text>
          </View>
          <View className="flex-1">
            <Text className="block text-3xl font-bold">{notices.length}</Text>
            <Text className="block text-xs opacity-90">全部通知</Text>
          </View>
        </View>
      </View>

      <View className="p-4">
        {/* 类型筛选 */}
        <View className="bg-white rounded-xl p-2 mb-4 shadow-sm flex gap-2 overflow-x-auto">
          {typeFilters.map((filter) => (
            <View
              key={filter.key}
              className={`flex-shrink-0 px-4 py-2 rounded-full ${
                selectedType === filter.key ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setSelectedType(filter.key)}
            >
              <Text className="text-xs font-medium">{filter.name}</Text>
            </View>
          ))}
        </View>

        {/* 通知列表 */}
        {filteredNotices.length === 0 ? (
          <View className="flex flex-col items-center justify-center py-12">
            <View className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Text className="text-4xl">📭</Text>
            </View>
            <Text className="block text-sm text-gray-500">暂无通知</Text>
          </View>
        ) : (
          <View className="space-y-3">
            {filteredNotices.map((notice) => (
              <View
                key={notice.id}
                className={`bg-white rounded-xl p-4 shadow-sm relative ${
                  notice.status === 'unread' ? 'border-l-4 border-blue-500' : ''
                }`}
                onClick={() => handleNoticeClick(notice)}
              >
                {notice.status === 'unread' && (
                  <View className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full" />
                )}
                <View className="flex items-start gap-3 mb-2">
                  <View className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    {notice.icon}
                  </View>
                  <View className="flex-1">
                    <Text className="block text-sm font-semibold text-gray-900 mb-1">
                      {notice.title}
                    </Text>
                    <View className="flex items-center gap-2">
                      <View className={`px-2 py-0.5 rounded ${getTypeColor(notice.type)}`}>
                        <Text className="text-xs">{getTypeName(notice.type)}</Text>
                      </View>
                      <Text className="text-xs text-gray-500">{notice.date}</Text>
                    </View>
                  </View>
                </View>
                <Text className="block text-sm text-gray-600 line-clamp-2 ml-13">
                  {notice.content}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* 底部留白，避开 TabBar */}
      <View className="h-16" />
    </View>
  )
}

export default NoticePage
