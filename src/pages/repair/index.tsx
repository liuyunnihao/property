import { View, Text, Button, Input, Textarea, Picker } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import { Plus, Clock, Check } from 'lucide-react-taro'

interface RepairRecord {
  id: number
  title: string
  content: string
  type: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  createTime: string
}

const RepairPage = () => {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    title: '',
    content: '',
    type: '水电维修'
  })

  const types = ['水电维修', '房屋维修', '公共设施', '其他']

  const [typeIndex, setTypeIndex] = useState(0)

  const mockRecords: RepairRecord[] = [
    {
      id: 1,
      title: '厨房水管漏水',
      content: '厨房水槽下方水管漏水，需要尽快维修',
      type: '水电维修',
      status: 'processing',
      createTime: '2024-01-14 10:30'
    },
    {
      id: 2,
      title: '客厅灯泡损坏',
      content: '客厅主灯灯泡损坏，需要更换',
      type: '水电维修',
      status: 'completed',
      createTime: '2024-01-10 14:20'
    },
    {
      id: 3,
      title: '小区楼梯扶手松动',
      content: '3号楼1单元楼梯扶手松动，存在安全隐患',
      type: '公共设施',
      status: 'pending',
      createTime: '2024-01-08 09:15'
    }
  ]

  const handleTypeChange = (e) => {
    setTypeIndex(e.detail.value)
    setForm({ ...form, type: types[e.detail.value] })
  }

  const handleSubmit = () => {
    if (!form.title.trim()) {
      Taro.showToast({
        title: '请输入报修标题',
        icon: 'none'
      })
      return
    }
    if (!form.content.trim()) {
      Taro.showToast({
        title: '请输入详细描述',
        icon: 'none'
      })
      return
    }

    Taro.showLoading({ title: '提交中...' })

    // 模拟提交
    setTimeout(() => {
      Taro.hideLoading()
      Taro.showToast({
        title: '提交成功',
        icon: 'success'
      })
      setShowForm(false)
      setForm({ title: '', content: '', type: '水电维修' })
      setTypeIndex(0)
    }, 1000)
  }

  const getStatusConfig = (status: RepairRecord['status']) => {
    const config = {
      pending: { text: '待处理', color: 'bg-yellow-100 text-yellow-700', icon: <Clock size={14} color="#faad14" /> },
      processing: { text: '处理中', color: 'bg-blue-100 text-blue-700', icon: <Clock size={14} color="#1890ff" /> },
      completed: { text: '已完成', color: 'bg-green-100 text-green-700', icon: <Check size={14} color="#52c41a" /> },
      cancelled: { text: '已取消', color: 'bg-gray-100 text-gray-700', icon: null }
    }
    return config[status]
  }

  return (
    <View className="min-h-screen bg-gray-100">
      <View className="p-4">
        {/* 新建报修按钮 */}
        <View className="mb-4">
          <Button
            className="w-full bg-blue-500 text-white rounded-lg py-3 flex items-center justify-center"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? (
              '取消报修'
            ) : (
              <View className="flex items-center gap-2">
                <Plus size={20} />
                <Text className="text-sm font-medium">在线报修</Text>
              </View>
            )}
          </Button>
        </View>

        {/* 报修表单 */}
        {showForm && (
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <Text className="block text-base font-semibold text-gray-900 mb-4">填写报修信息</Text>

            <View className="mb-4">
              <Text className="block text-sm text-gray-700 mb-2">报修类型 *</Text>
              <View className="bg-gray-50 rounded-xl px-4 py-3">
                <Picker mode="selector" range={types} value={typeIndex} onChange={handleTypeChange}>
                  <Text className="text-sm">{types[typeIndex]}</Text>
                </Picker>
              </View>
            </View>

            <View className="mb-4">
              <Text className="block text-sm text-gray-700 mb-2">报修标题 *</Text>
              <View className="bg-gray-50 rounded-xl px-4 py-3">
                <Input
                  className="w-full bg-transparent text-sm"
                  placeholder="请输入报修标题"
                  value={form.title}
                  onInput={(e) => setForm({ ...form, title: e.detail.value })}
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="block text-sm text-gray-700 mb-2">详细描述 *</Text>
              <View className="bg-gray-50 rounded-xl p-4">
                <Textarea
                  className="w-full bg-transparent text-sm"
                  style={{ minHeight: '100px' }}
                  placeholder="请详细描述报修问题，包括位置、具体情况等"
                  value={form.content}
                  onInput={(e) => setForm({ ...form, content: e.detail.value })}
                  maxlength={500}
                />
              </View>
            </View>

            <Button
              className="w-full bg-blue-500 text-white rounded-lg py-3 text-sm font-medium"
              onClick={handleSubmit}
            >
              提交报修
            </Button>
          </View>
        )}

        {/* 报修记录 */}
        <Text className="block text-base font-semibold text-gray-900 mb-3">报修记录</Text>

        {mockRecords.length === 0 ? (
          <View className="flex flex-col items-center justify-center py-12">
            <View className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Text className="text-4xl">📭</Text>
            </View>
            <Text className="block text-sm text-gray-500">暂无报修记录</Text>
          </View>
        ) : (
          <View className="space-y-3">
            {mockRecords.map((record) => {
              const statusConfig = getStatusConfig(record.status)
              return (
                <View key={record.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <View className="flex items-start justify-between mb-2">
                    <View className="flex-1">
                      <Text className="block text-base font-semibold text-gray-900 mb-1">
                        {record.title}
                      </Text>
                      <Text className="block text-xs text-gray-500">{record.type}</Text>
                    </View>
                    <View className="flex-shrink-0 ml-3">
                      <View className={`px-2 py-1 rounded-full ${statusConfig.color}`}>
                        <Text className="text-xs">{statusConfig.text}</Text>
                      </View>
                    </View>
                  </View>
                  <Text className="block text-sm text-gray-700 mb-3 line-clamp-2">
                    {record.content}
                  </Text>
                  <View className="flex items-center gap-2">
                    <Text className="text-xs text-gray-500">{record.createTime}</Text>
                  </View>
                </View>
              )
            })}
          </View>
        )}
      </View>

      {/* 底部留白，避开 TabBar */}
      <View className="h-16" />
    </View>
  )
}

export default RepairPage
