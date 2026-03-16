import { useState, useEffect } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { ArrowLeft, Search, MapPin, User, Building2 } from 'lucide-react-taro'
import { Network } from '@/network'
import './index.css'

interface UserItem {
  id: string
  name: string
  phone: string
  roomNumber: string
  building: string
  unit: string
  checkInDate: string
  status: 'active' | 'inactive'
}

export default function AdminUser() {
  const [users, setUsers] = useState<UserItem[]>([])
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await Network.request({
        url: '/api/admin/user',
        method: 'GET',
        data: { keyword }
      })
      console.log('业主列表响应:', res.data)
      
      if (res.data?.code === 200) {
        setUsers(res.data.data || [])
      }
    } catch (error) {
      console.error('获取数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchUsers()
  }

  // 统计数据
  const activeUsers = users.filter(u => u.status === 'active').length

  return (
    <View className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <View className="bg-blue-800 px-4 py-3 flex items-center">
        <View onClick={() => Taro.navigateBack()}>
          <ArrowLeft size={24} color="#fff" />
        </View>
        <Text className="flex-1 text-white text-lg font-semibold text-center">业主管理</Text>
        <View className="w-6" />
      </View>

      {/* 搜索框 */}
      <View className="bg-white p-4 border-b border-slate-200">
        <View className="flex items-center bg-slate-100 rounded-lg px-3 h-10">
          <Search size={18} color="#94a3b8" />
          <Input
            className="flex-1 ml-2 text-sm"
            placeholder="搜索业主姓名或房号"
            value={keyword}
            onInput={(e) => setKeyword(e.detail.value)}
            onConfirm={handleSearch}
          />
          <Text className="text-blue-600 text-sm" onClick={handleSearch}>搜索</Text>
        </View>
      </View>

      {/* 统计 */}
      <View className="p-4">
        <View className="bg-blue-50 rounded-xl p-4 mb-4">
          <View className="flex items-center justify-between">
            <View className="flex items-center">
              <View className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User size={20} color="#2563eb" />
              </View>
              <View className="ml-3">
                <Text className="text-slate-600 text-sm">在住业主</Text>
                <Text className="text-xl font-bold text-blue-600">{activeUsers} 户</Text>
              </View>
            </View>
            <Text className="text-slate-400 text-sm">共 {users.length} 条记录</Text>
          </View>
        </View>

        {/* 列表 */}
        {loading ? (
          <View className="flex items-center justify-center h-40">
            <Text className="text-slate-400">加载中...</Text>
          </View>
        ) : users.length > 0 ? (
          users.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-xl p-4 mb-3 shadow-sm"
            >
              <View className="flex items-center justify-between mb-2">
                <View className="flex items-center">
                  <View className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <User size={20} color="#64748b" />
                  </View>
                  <View className="ml-3">
                    <Text className="font-medium text-slate-800">{item.name}</Text>
                    <Text className="text-slate-500 text-sm">{item.phone}</Text>
                  </View>
                </View>
                <Text className={`px-2 py-1 rounded text-xs ${
                  item.status === 'active' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-slate-100 text-slate-500'
                }`}
                >
                  {item.status === 'active' ? '在住' : '已搬离'}
                </Text>
              </View>
              
              <View className="bg-slate-50 rounded-lg p-3 mt-2">
                <View className="flex items-center mb-1">
                  <Building2 size={14} color="#64748b" />
                  <Text className="ml-1 text-slate-600 text-sm">
                    {item.building}栋 {item.unit}单元 {item.roomNumber}
                  </Text>
                </View>
                <View className="flex items-center">
                  <MapPin size={14} color="#64748b" />
                  <Text className="ml-1 text-slate-400 text-xs">入住日期: {item.checkInDate}</Text>
                </View>
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
