import { useState } from 'react'
import { View, Text, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Lock, User } from 'lucide-react-taro'
import { Network } from '@/network'
import './index.css'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Taro.showToast({ title: '请输入用户名和密码', icon: 'none' })
      return
    }

    setLoading(true)
    try {
      const res = await Network.request({
        url: '/api/admin/login',
        method: 'POST',
        data: { username, password }
      })

      console.log('登录响应:', res.data)

      if (res.data?.code === 200) {
        // 保存登录状态
        Taro.setStorageSync('adminToken', res.data.data?.token || 'admin-token')
        Taro.setStorageSync('adminInfo', res.data.data?.admin || { username, role: 'admin' })
        
        Taro.showToast({ title: '登录成功', icon: 'success' })
        setTimeout(() => {
          Taro.redirectTo({ url: '/pages/admin/dashboard/index' })
        }, 1000)
      } else {
        Taro.showToast({ title: res.data?.msg || '登录失败', icon: 'none' })
      }
    } catch (error) {
      console.error('登录错误:', error)
      Taro.showToast({ title: '网络错误，请重试', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <View className="w-full max-w-md">
        {/* Logo区域 */}
        <View className="text-center mb-8">
          <View className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-4">
            <Lock size={40} color="#fff" />
          </View>
          <Text className="block text-2xl font-bold text-slate-800">智慧物业管理系统</Text>
          <Text className="block text-slate-500 mt-2">管理员登录</Text>
        </View>

        {/* 登录表单 */}
        <View className="bg-white rounded-2xl shadow-lg p-6">
          {/* 用户名 */}
          <View className="mb-4">
            <Text className="block text-slate-600 text-sm mb-2">用户名</Text>
            <View className="flex items-center bg-slate-50 rounded-xl px-4 h-12">
              <User size={20} color="#64748b" />
              <Input
                className="flex-1 ml-3 text-base"
                placeholder="请输入用户名"
                value={username}
                onInput={(e) => setUsername(e.detail.value)}
              />
            </View>
          </View>

          {/* 密码 */}
          <View className="mb-6">
            <Text className="block text-slate-600 text-sm mb-2">密码</Text>
            <View className="flex items-center bg-slate-50 rounded-xl px-4 h-12">
              <Lock size={20} color="#64748b" />
              <Input
                className="flex-1 ml-3 text-base"
                password
                placeholder="请输入密码"
                value={password}
                onInput={(e) => setPassword(e.detail.value)}
              />
            </View>
          </View>

          {/* 登录按钮 */}
          <Button
            className={`w-full h-12 rounded-xl text-white font-medium text-base ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? '登录中...' : '登 录'}
          </Button>

          {/* 提示 */}
          <View className="mt-4 text-center">
            <Text className="text-slate-400 text-sm">默认账号: admin / admin123</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
