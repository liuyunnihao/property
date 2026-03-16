import { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { ArrowLeft, DollarSign, Calendar, User } from 'lucide-react-taro'
import { Network } from '@/network'
import './index.css'

interface PaymentItem {
  id: string
  userName: string
  roomNumber: string
  amount: number
  type: 'property' | 'water' | 'electricity' | 'parking'
  status: 'unpaid' | 'paid'
  dueDate: string
  paidDate?: string
}

export default function AdminPayment() {
  const [payments, setPayments] = useState<PaymentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unpaid' | 'paid'>('all')

  useEffect(() => {
    fetchPayments()
  }, [filter])

  const fetchPayments = async () => {
    setLoading(true)
    try {
      const res = await Network.request({
        url: '/api/admin/payment',
        method: 'GET',
        data: { status: filter === 'all' ? '' : filter }
      })
      console.log('缴费列表响应:', res.data)
      
      if (res.data?.code === 200) {
        setPayments(res.data.data || [])
      }
    } catch (error) {
      console.error('获取数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeText = (type: string) => {
    const typeMap: Record<string, string> = {
      property: '物业费',
      water: '水费',
      electricity: '电费',
      parking: '停车费'
    }
    return typeMap[type] || type
  }

  const filterTabs = [
    { key: 'all', label: '全部' },
    { key: 'unpaid', label: '待缴费' },
    { key: 'paid', label: '已缴费' }
  ]

  // 统计数据
  const totalUnpaid = payments
    .filter(p => p.status === 'unpaid')
    .reduce((sum, p) => sum + p.amount, 0)
  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <View className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <View className="bg-blue-800 px-4 py-3 flex items-center">
        <View onClick={() => Taro.navigateBack()}>
          <ArrowLeft size={24} color="#fff" />
        </View>
        <Text className="flex-1 text-white text-lg font-semibold text-center">缴费管理</Text>
        <View className="w-6" />
      </View>

      {/* 统计卡片 */}
      <View className="p-4">
        <View className="grid grid-cols-2 gap-3">
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <Text className="text-slate-500 text-sm">待收金额</Text>
            <Text className="block text-2xl font-bold text-amber-600 mt-1">
              ¥{totalUnpaid.toLocaleString()}
            </Text>
          </View>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <Text className="text-slate-500 text-sm">已收金额</Text>
            <Text className="block text-2xl font-bold text-emerald-600 mt-1">
              ¥{totalPaid.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* 筛选标签 */}
      <View className="bg-white flex border-b border-slate-200">
        {filterTabs.map((tab) => (
          <View
            key={tab.key}
            className={`flex-1 py-3 text-center ${
              filter === tab.key ? 'border-b-2 border-blue-600' : ''
            }`}
            onClick={() => setFilter(tab.key as typeof filter)}
          >
            <Text className={filter === tab.key ? 'text-blue-600 font-medium' : 'text-slate-600'}>
              {tab.label}
            </Text>
          </View>
        ))}
      </View>

      {/* 列表 */}
      <View className="p-4">
        {loading ? (
          <View className="flex items-center justify-center h-40">
            <Text className="text-slate-400">加载中...</Text>
          </View>
        ) : payments.length > 0 ? (
          payments.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-xl p-4 mb-3 shadow-sm"
            >
              <View className="flex items-center justify-between mb-2">
                <View className="flex items-center">
                  <View className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    item.status === 'paid' ? 'bg-emerald-100' : 'bg-amber-100'
                  }`}
                  >
                    <DollarSign size={16} color={item.status === 'paid' ? '#10b981' : '#f59e0b'} />
                  </View>
                  <Text className="ml-2 font-medium text-slate-800">{getTypeText(item.type)}</Text>
                </View>
                <Text className={`font-semibold ${
                  item.status === 'paid' ? 'text-emerald-600' : 'text-amber-600'
                }`}
                >
                  ¥{item.amount.toFixed(2)}
                </Text>
              </View>
              
              <View className="flex items-center text-slate-500 text-sm mb-1">
                <User size={14} />
                <Text className="ml-1">{item.userName}</Text>
                <Text className="mx-2">·</Text>
                <Text>{item.roomNumber}</Text>
              </View>
              
              <View className="flex items-center text-slate-400 text-xs">
                <Calendar size={12} />
                <Text className="ml-1">
                  {item.status === 'paid' ? `缴费日期: ${item.paidDate}` : `截止日期: ${item.dueDate}`}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View className="flex items-center justify-center h-40">
            <Text className="text-slate-400">暂无数据</Text>
          </View>
        )}
      </View>
    </View>
  )
}
