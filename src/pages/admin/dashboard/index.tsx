import { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Wrench, DollarSign, Bell, Users, ArrowRight } from 'lucide-react-taro'
import { Network } from '@/network'
import './index.css'

interface DashboardStats {
  pendingRepairs: number
  monthIncome: number
  pendingNotices: number
  totalUsers: number
  recentRepairs: Array<{
    id: string
    title: string
    status: string
    createTime: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    pendingRepairs: 0,
    monthIncome: 0,
    pendingNotices: 0,
    totalUsers: 0,
    recentRepairs: []
  })
  const [, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
    fetchDashboard()
  }, [])

  const checkAuth = () => {
    const token = Taro.getStorageSync('adminToken')
    if (!token) {
      Taro.redirectTo({ url: '/pages/admin/login/index' })
    }
  }

  const fetchDashboard = async () => {
    try {
      const res = await Network.request({
        url: '/api/admin/dashboard',
        method: 'GET'
      })
      console.log('Dashboard响应:', res.data)
      
      if (res.data?.code === 200) {
        setStats(res.data.data || stats)
      }
    } catch (error) {
      console.error('获取数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const navigateTo = (url: string) => {
    Taro.navigateTo({ url })
  }

  const statCards = [
    {
      title: '待处理工单',
      value: stats.pendingRepairs,
      icon: Wrench,
      color: 'bg-amber-500',
      textColor: 'text-amber-500',
      url: '/pages/admin/repair/index'
    },
    {
      title: '本月收入',
      value: `¥${stats.monthIncome.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500',
      url: '/pages/admin/payment/index'
    },
    {
      title: '待发通知',
      value: stats.pendingNotices,
      icon: Bell,
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
      url: '/pages/admin/notice/index'
    },
    {
      title: '业主总数',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-cyan-500',
      textColor: 'text-cyan-500',
      url: '/pages/admin/user/index'
    }
  ]

  const getStatusText = (status: string) => {
    const statusMap: Record<string, { text: string; className: string }> = {
      pending: { text: '待处理', className: 'bg-amber-100 text-amber-700' },
      processing: { text: '处理中', className: 'bg-blue-100 text-blue-700' },
      completed: { text: '已完成', className: 'bg-emerald-100 text-emerald-700' }
    }
    return statusMap[status] || { text: status, className: 'bg-slate-100 text-slate-600' }
  }

  return (
    <View className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <View className="bg-blue-800 px-4 py-4">
        <Text className="block text-white text-lg font-semibold">管理后台</Text>
        <Text className="block text-blue-200 text-sm mt-1">欢迎回来，管理员</Text>
      </View>

      <View className="p-4">
        {/* 统计卡片 */}
        <View className="grid grid-cols-2 gap-3">
          {statCards.map((item, index) => (
            <View
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm"
              onClick={() => navigateTo(item.url)}
            >
              <View className="flex items-center justify-between mb-3">
                <View className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}>
                  <item.icon size={20} color="#fff" />
                </View>
                <ArrowRight size={16} color="#94a3b8" />
              </View>
              <Text className="block text-2xl font-bold text-slate-800">{item.value}</Text>
              <Text className="block text-slate-500 text-sm mt-1">{item.title}</Text>
            </View>
          ))}
        </View>

        {/* 最近工单 */}
        <View className="mt-6">
          <View className="flex items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-slate-800">最近工单</Text>
            <Text 
              className="text-blue-600 text-sm"
              onClick={() => navigateTo('/pages/admin/repair/index')}
            >
              查看全部
            </Text>
          </View>

          <View className="bg-white rounded-xl shadow-sm overflow-hidden">
            {stats.recentRepairs.length > 0 ? (
              stats.recentRepairs.map((item, index) => {
                const statusInfo = getStatusText(item.status)
                return (
                  <View
                    key={item.id}
                    className={`flex items-center px-4 h-14 ${index > 0 ? 'border-t border-slate-100' : ''}`}
                  >
                    <View className="flex-1">
                      <Text className="block text-slate-800">{item.title}</Text>
                      <Text className="block text-slate-400 text-xs mt-1">{item.createTime}</Text>
                    </View>
                    <Text className={`px-2 py-1 rounded text-xs ${statusInfo.className}`}>
                      {statusInfo.text}
                    </Text>
                  </View>
                )
              })
            ) : (
              <View className="flex items-center justify-center h-24">
                <Text className="text-slate-400">暂无工单数据</Text>
              </View>
            )}
          </View>
        </View>

        {/* 快捷操作 */}
        <View className="mt-6">
          <Text className="text-lg font-semibold text-slate-800 mb-3">快捷操作</Text>
          <View className="bg-white rounded-xl shadow-sm">
            <View
              className="flex items-center justify-between px-4 h-14 border-b border-slate-100"
              onClick={() => navigateTo('/pages/admin/repair/index')}
            >
              <View className="flex items-center">
                <Wrench size={20} color="#f59e0b" />
                <Text className="ml-3 text-slate-700">处理报修工单</Text>
              </View>
              <ArrowRight size={16} color="#94a3b8" />
            </View>
            <View
              className="flex items-center justify-between px-4 h-14 border-b border-slate-100"
              onClick={() => navigateTo('/pages/admin/notice/index')}
            >
              <View className="flex items-center">
                <Bell size={20} color="#3b82f6" />
                <Text className="ml-3 text-slate-700">发布物业通知</Text>
              </View>
              <ArrowRight size={16} color="#94a3b8" />
            </View>
            <View
              className="flex items-center justify-between px-4 h-14"
              onClick={() => navigateTo('/pages/admin/user/index')}
            >
              <View className="flex items-center">
                <Users size={20} color="#06b6d4" />
                <Text className="ml-3 text-slate-700">业主信息管理</Text>
              </View>
              <ArrowRight size={16} color="#94a3b8" />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
