import { useState, useEffect } from 'react'
import { View, Text, Button, Input, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { ArrowLeft, Plus, Calendar, X } from 'lucide-react-taro'
import { Network } from '@/network'
import './index.css'

interface NoticeItem {
  id: string
  title: string
  content: string
  type: 'notice' | 'activity' | 'urgent'
  status: 'draft' | 'published'
  createTime: string
  publishTime?: string
}

export default function AdminNotice() {
  const [notices, setNotices] = useState<NoticeItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    title: '',
    content: '',
    type: 'notice' as 'notice' | 'activity' | 'urgent'
  })

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    setLoading(true)
    try {
      const res = await Network.request({
        url: '/api/admin/notice',
        method: 'GET'
      })
      console.log('通知列表响应:', res.data)
      
      if (res.data?.code === 200) {
        setNotices(res.data.data || [])
      }
    } catch (error) {
      console.error('获取数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      Taro.showToast({ title: '请填写标题和内容', icon: 'none' })
      return
    }

    try {
      const res = await Network.request({
        url: '/api/admin/notice',
        method: 'POST',
        data: { ...form, status: 'published' }
      })
      console.log('发布响应:', res.data)
      
      if (res.data?.code === 200) {
        Taro.showToast({ title: '发布成功', icon: 'success' })
        setShowForm(false)
        setForm({ title: '', content: '', type: 'notice' })
        fetchNotices()
      } else {
        Taro.showToast({ title: res.data?.msg || '发布失败', icon: 'none' })
      }
    } catch (error) {
      console.error('发布失败:', error)
      Taro.showToast({ title: '网络错误', icon: 'none' })
    }
  }

  const getTypeInfo = (type: string) => {
    const typeMap: Record<string, { text: string; className: string }> = {
      notice: { text: '通知', className: 'bg-blue-100 text-blue-700' },
      activity: { text: '活动', className: 'bg-emerald-100 text-emerald-700' },
      urgent: { text: '紧急', className: 'bg-red-100 text-red-700' }
    }
    return typeMap[type] || { text: type, className: 'bg-slate-100 text-slate-600' }
  }

  const typeOptions = [
    { key: 'notice', label: '普通通知' },
    { key: 'activity', label: '社区活动' },
    { key: 'urgent', label: '紧急公告' }
  ]

  return (
    <View className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <View className="bg-blue-800 px-4 py-3 flex items-center">
        <View onClick={() => Taro.navigateBack()}>
          <ArrowLeft size={24} color="#fff" />
        </View>
        <Text className="flex-1 text-white text-lg font-semibold text-center">通知管理</Text>
        <View onClick={() => setShowForm(true)}>
          <Plus size={24} color="#fff" />
        </View>
      </View>

      {/* 列表 */}
      <View className="p-4">
        {loading ? (
          <View className="flex items-center justify-center h-40">
            <Text className="text-slate-400">加载中...</Text>
          </View>
        ) : notices.length > 0 ? (
          notices.map((item) => {
            const typeInfo = getTypeInfo(item.type)
            return (
              <View
                key={item.id}
                className="bg-white rounded-xl p-4 mb-3 shadow-sm"
              >
                <View className="flex items-start justify-between mb-2">
                  <Text className="flex-1 font-medium text-slate-800 pr-2">{item.title}</Text>
                  <Text className={`px-2 py-1 rounded text-xs ${typeInfo.className}`}>
                    {typeInfo.text}
                  </Text>
                </View>
                <Text className="text-slate-500 text-sm mb-2 line-clamp-2">{item.content}</Text>
                <View className="flex items-center text-slate-400 text-xs">
                  <Calendar size={12} />
                  <Text className="ml-1">
                    {item.status === 'published' ? `发布于 ${item.publishTime}` : `创建于 ${item.createTime}`}
                  </Text>
                </View>
              </View>
            )
          })
        ) : (
          <View className="flex items-center justify-center h-40">
            <Text className="text-slate-400">暂无通知</Text>
          </View>
        )}
      </View>

      {/* 发布弹窗 */}
      {showForm && (
        <View className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <View className="w-full bg-white rounded-2xl max-h-[80vh]">
            {/* 弹窗头部 */}
            <View className="flex items-center justify-between px-4 py-4 border-b border-slate-200">
              <Text className="text-lg font-semibold text-slate-800">发布通知</Text>
              <View onClick={() => setShowForm(false)}>
                <X size={24} color="#64748b" />
              </View>
            </View>

            {/* 表单内容 */}
            <View className="p-4">
              {/* 通知类型 */}
              <View className="mb-4">
                <Text className="text-slate-600 text-sm mb-2">通知类型</Text>
                <View className="flex gap-2">
                  {typeOptions.map((opt) => (
                    <View
                      key={opt.key}
                      className={`px-3 py-2 rounded-lg ${
                        form.type === opt.key
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                      onClick={() => setForm({ ...form, type: opt.key as typeof form.type })}
                    >
                      <Text className={form.type === opt.key ? 'text-white' : 'text-slate-600'}>
                        {opt.label}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* 标题 */}
              <View className="mb-4">
                <Text className="text-slate-600 text-sm mb-2">标题</Text>
                <View className="bg-slate-50 rounded-lg px-3">
                  <Input
                    style={{ width: '100%', height: '44px' }}
                    placeholder="请输入通知标题"
                    value={form.title}
                    onInput={(e) => setForm({ ...form, title: e.detail.value })}
                  />
                </View>
              </View>

              {/* 内容 */}
              <View className="mb-4">
                <Text className="text-slate-600 text-sm mb-2">内容</Text>
                <View className="bg-slate-50 rounded-lg p-3">
                  <Textarea
                    style={{ width: '100%', minHeight: '120px', backgroundColor: 'transparent' }}
                    placeholder="请输入通知内容..."
                    value={form.content}
                    onInput={(e) => setForm({ ...form, content: e.detail.value })}
                  />
                </View>
              </View>
            </View>

            {/* 操作按钮 */}
            <View className="flex gap-3 p-4 border-t border-slate-200">
              <Button
                className="flex-1 bg-slate-100 text-slate-600 rounded-lg"
                onClick={() => setShowForm(false)}
              >
                取消
              </Button>
              <Button
                className="flex-1 bg-blue-600 text-white rounded-lg"
                onClick={handlePublish}
              >
                发布
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
