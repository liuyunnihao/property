import { useState, useEffect } from 'react'
import { View, Text, Button, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { ArrowLeft, Phone, MapPin, Calendar, X } from 'lucide-react-taro'
import { Network } from '@/network'
import './index.css'

interface RepairItem {
  id: string
  title: string
  description: string
  status: 'pending' | 'processing' | 'completed'
  userName: string
  userPhone: string
  address: string
  createTime: string
  images?: string[]
}

export default function AdminRepair() {
  const [repairs, setRepairs] = useState<RepairItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRepair, setSelectedRepair] = useState<RepairItem | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [remark, setRemark] = useState('')
  const [filter, setFilter] = useState<'all' | 'pending' | 'processing' | 'completed'>('all')

  useEffect(() => {
    fetchRepairs()
  }, [filter])

  const fetchRepairs = async () => {
    setLoading(true)
    try {
      const res = await Network.request({
        url: '/api/admin/repair',
        method: 'GET',
        data: { status: filter === 'all' ? '' : filter }
      })
      console.log('报修列表响应:', res.data)
      
      if (res.data?.code === 200) {
        setRepairs(res.data.data || [])
      }
    } catch (error) {
      console.error('获取数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await Network.request({
        url: `/api/admin/repair/${id}`,
        method: 'PUT',
        data: { status: newStatus, remark }
      })
      console.log('更新状态响应:', res.data)
      
      if (res.data?.code === 200) {
        Taro.showToast({ title: '操作成功', icon: 'success' })
        setShowDetail(false)
        setRemark('')
        fetchRepairs()
      } else {
        Taro.showToast({ title: res.data?.msg || '操作失败', icon: 'none' })
      }
    } catch (error) {
      console.error('更新失败:', error)
      Taro.showToast({ title: '网络错误', icon: 'none' })
    }
  }

  const openDetail = (repair: RepairItem) => {
    setSelectedRepair(repair)
    setShowDetail(true)
  }

  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { text: string; className: string }> = {
      pending: { text: '待处理', className: 'bg-amber-100 text-amber-700' },
      processing: { text: '处理中', className: 'bg-blue-100 text-blue-700' },
      completed: { text: '已完成', className: 'bg-emerald-100 text-emerald-700' }
    }
    return statusMap[status] || { text: status, className: 'bg-slate-100 text-slate-600' }
  }

  const filterTabs = [
    { key: 'all', label: '全部' },
    { key: 'pending', label: '待处理' },
    { key: 'processing', label: '处理中' },
    { key: 'completed', label: '已完成' }
  ]

  return (
    <View className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <View className="bg-blue-800 px-4 py-3 flex items-center">
        <View onClick={() => Taro.navigateBack()}>
          <ArrowLeft size={24} color="#fff" />
        </View>
        <Text className="flex-1 text-white text-lg font-semibold text-center">报修管理</Text>
        <View className="w-6" />
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
        ) : repairs.length > 0 ? (
          repairs.map((item) => {
            const statusInfo = getStatusInfo(item.status)
            return (
              <View
                key={item.id}
                className="bg-white rounded-xl p-4 mb-3 shadow-sm"
                onClick={() => openDetail(item)}
              >
                <View className="flex items-start justify-between mb-2">
                  <Text className="flex-1 font-medium text-slate-800">{item.title}</Text>
                  <Text className={`px-2 py-1 rounded text-xs ${statusInfo.className}`}>
                    {statusInfo.text}
                  </Text>
                </View>
                <Text className="text-slate-500 text-sm mb-2">{item.description}</Text>
                <View className="flex items-center text-slate-400 text-xs">
                  <Calendar size={12} />
                  <Text className="ml-1">{item.createTime}</Text>
                  <Text className="mx-2">|</Text>
                  <Phone size={12} />
                  <Text className="ml-1">{item.userName}</Text>
                </View>
              </View>
            )
          })
        ) : (
          <View className="flex items-center justify-center h-40">
            <Text className="text-slate-400">暂无数据</Text>
          </View>
        )}
      </View>

      {/* 详情弹窗 */}
      {showDetail && selectedRepair && (
        <View className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <View className="w-full bg-white rounded-t-2xl max-h-[80vh]">
            {/* 弹窗头部 */}
            <View className="flex items-center justify-between px-4 py-4 border-b border-slate-200">
              <Text className="text-lg font-semibold text-slate-800">工单详情</Text>
              <View onClick={() => setShowDetail(false)}>
                <X size={24} color="#64748b" />
              </View>
            </View>

            {/* 详情内容 */}
            <View className="p-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
              <View className="mb-4">
                <Text className="text-slate-500 text-sm">问题描述</Text>
                <Text className="block text-slate-800 mt-1">{selectedRepair.title}</Text>
                <Text className="block text-slate-600 text-sm mt-2">{selectedRepair.description}</Text>
              </View>

              <View className="mb-4">
                <Text className="text-slate-500 text-sm mb-2">联系信息</Text>
                <View className="flex items-center py-2">
                  <Phone size={16} color="#64748b" />
                  <Text className="ml-2 text-slate-700">{selectedRepair.userName} - {selectedRepair.userPhone}</Text>
                </View>
                <View className="flex items-center py-2">
                  <MapPin size={16} color="#64748b" />
                  <Text className="ml-2 text-slate-700">{selectedRepair.address}</Text>
                </View>
                <View className="flex items-center py-2">
                  <Calendar size={16} color="#64748b" />
                  <Text className="ml-2 text-slate-700">{selectedRepair.createTime}</Text>
                </View>
              </View>

              {/* 处理备注 */}
              {selectedRepair.status !== 'completed' && (
                <View className="mb-4">
                  <Text className="text-slate-500 text-sm mb-2">处理备注</Text>
                  <View className="bg-slate-50 rounded-lg p-3">
                    <Textarea
                      style={{ width: '100%', minHeight: '80px', backgroundColor: 'transparent' }}
                      placeholder="请输入处理备注..."
                      value={remark}
                      onInput={(e) => setRemark(e.detail.value)}
                    />
                  </View>
                </View>
              )}
            </View>

            {/* 操作按钮 */}
            <View className="flex gap-3 p-4 border-t border-slate-200">
              {selectedRepair.status === 'pending' && (
                <>
                  <Button
                    className="flex-1 bg-blue-600 text-white rounded-lg"
                    onClick={() => handleStatusChange(selectedRepair.id, 'processing')}
                  >
                    开始处理
                  </Button>
                </>
              )}
              {selectedRepair.status === 'processing' && (
                <Button
                  className="flex-1 bg-emerald-600 text-white rounded-lg"
                  onClick={() => handleStatusChange(selectedRepair.id, 'completed')}
                >
                  完成工单
                </Button>
              )}
              {selectedRepair.status === 'completed' && (
                <Button className="flex-1 bg-slate-200 text-slate-600 rounded-lg" disabled>
                  已完成
                </Button>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
