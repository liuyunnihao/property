import { View, Text, Button } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import { Building2, Droplets, Zap, CreditCard } from 'lucide-react-taro'

interface FeeItem {
  id: number
  type: string
  name: string
  amount: number
  status: 'unpaid' | 'paid'
  dueDate: string
  period: string
}

const PaymentPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(0)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const months = ['2024年1月', '2023年12月', '2023年11月']

  const feeData: FeeItem[] = [
    {
      id: 1,
      type: 'property',
      name: '物业费',
      amount: 256.00,
      status: 'unpaid',
      dueDate: '2024-01-31',
      period: '2024年1月'
    },
    {
      id: 2,
      type: 'water',
      name: '水费',
      amount: 45.60,
      status: 'unpaid',
      dueDate: '2024-01-31',
      period: '2024年1月'
    },
    {
      id: 3,
      type: 'electricity',
      name: '电费',
      amount: 128.50,
      status: 'unpaid',
      dueDate: '2024-01-31',
      period: '2024年1月'
    }
  ]

  const getFeeIcon = (type: string) => {
    const icons = {
      property: <Building2 size={24} color="#1890ff" />,
      water: <Droplets size={24} color="#52c41a" />,
      electricity: <Zap size={24} color="#faad14" />
    }
    return icons[type] || <CreditCard size={24} color="#722ed1" />
  }

  const calculateTotal = () => {
    return feeData.reduce((sum, item) => sum + item.amount, 0).toFixed(2)
  }

  const handlePayment = () => {
    Taro.showLoading({ title: '处理中...' })

    // 模拟支付
    setTimeout(() => {
      Taro.hideLoading()
      Taro.showToast({
        title: '缴费成功',
        icon: 'success'
      })
      setShowPaymentModal(false)
    }, 2000)
  }

  const handleMonthChange = (index: number) => {
    setSelectedMonth(index)
  }

  return (
    <View className="min-h-screen bg-gray-100">
      {/* 房屋信息卡片 */}
      <View className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white mb-4">
        <Text className="block text-lg font-bold mb-2">3号楼1单元1202</Text>
        <Text className="block text-sm opacity-90">业主：张三</Text>
      </View>

      <View className="p-4">
        {/* 月份选择 */}
        <View className="bg-white rounded-xl p-2 mb-4 shadow-sm flex gap-2">
          {months.map((month, index) => (
            <View
              key={index}
              className={`flex-1 py-2 px-3 rounded-lg text-center ${
                selectedMonth === index ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-700'
              }`}
              onClick={() => handleMonthChange(index)}
            >
              <Text className="text-xs font-medium">{month}</Text>
            </View>
          ))}
        </View>

        {/* 缴费列表 */}
        <Text className="block text-base font-semibold text-gray-900 mb-3">待缴费用</Text>

        <View className="space-y-3 mb-4">
          {feeData.map((item) => (
            <View key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
              <View className="flex items-center justify-between mb-3">
                <View className="flex items-center gap-3">
                  <View className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    {getFeeIcon(item.type)}
                  </View>
                  <View>
                    <Text className="block text-base font-semibold text-gray-900">{item.name}</Text>
                    <Text className="block text-xs text-gray-500">账期：{item.period}</Text>
                  </View>
                </View>
                <View className="flex-shrink-0">
                  {item.status === 'unpaid' ? (
                    <View className="bg-red-50 px-3 py-1 rounded-full">
                      <Text className="text-xs text-red-600 font-medium">未缴费</Text>
                    </View>
                  ) : (
                    <View className="bg-green-50 px-3 py-1 rounded-full">
                      <Text className="text-xs text-green-600 font-medium">已缴费</Text>
                    </View>
                  )}
                </View>
              </View>
              <View className="flex items-center justify-between pt-3 border-t border-gray-100">
                <Text className="text-xs text-gray-500">截止日期：{item.dueDate}</Text>
                <Text className="text-lg font-bold text-red-500">¥{item.amount.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* 缴费汇总卡片 */}
        <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <View className="flex items-center justify-between mb-3">
            <Text className="block text-sm text-gray-700">本期应缴总额</Text>
            <Text className="block text-2xl font-bold text-red-500">¥{calculateTotal()}</Text>
          </View>
          <View className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <Text>包含 {feeData.length} 项费用</Text>
            <Text>截止日期：2024-01-31</Text>
          </View>
          <Button
            className="w-full bg-blue-500 text-white rounded-lg py-3 text-sm font-medium"
            onClick={() => setShowPaymentModal(true)}
          >
            立即缴费
          </Button>
        </View>

        {/* 缴费说明 */}
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <Text className="block text-sm font-semibold text-gray-900 mb-2">缴费说明</Text>
          <View className="space-y-2">
            <Text className="block text-xs text-gray-600">1. 物业费按月收取，请于每月月底前缴纳</Text>
            <Text className="block text-xs text-gray-600">2. 水电费根据实际使用量计算</Text>
            <Text className="block text-xs text-gray-600">3. 逾期未缴将产生滞纳金</Text>
            <Text className="block text-xs text-gray-600">4. 如有疑问，请联系物业：400-123-4567</Text>
          </View>
        </View>
      </View>

      {/* 缴费确认弹窗 */}
      {showPaymentModal && (
        <View className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <View className="w-full bg-white rounded-t-2xl p-6 animate-slide-up">
            <View className="flex items-center justify-between mb-4">
              <Text className="block text-lg font-bold text-gray-900">确认缴费</Text>
              <Text
                className="text-gray-500"
                onClick={() => setShowPaymentModal(false)}
              >
                ✕
              </Text>
            </View>

            <View className="space-y-3 mb-6">
              <View className="flex items-center justify-between py-2 border-b border-gray-100">
                <Text className="text-sm text-gray-700">物业费</Text>
                <Text className="text-sm font-medium text-gray-900">¥256.00</Text>
              </View>
              <View className="flex items-center justify-between py-2 border-b border-gray-100">
                <Text className="text-sm text-gray-700">水费</Text>
                <Text className="text-sm font-medium text-gray-900">¥45.60</Text>
              </View>
              <View className="flex items-center justify-between py-2 border-b border-gray-100">
                <Text className="text-sm text-gray-700">电费</Text>
                <Text className="text-sm font-medium text-gray-900">¥128.50</Text>
              </View>
              <View className="flex items-center justify-between pt-3">
                <Text className="text-base font-bold text-gray-900">合计</Text>
                <Text className="text-xl font-bold text-red-500">¥{calculateTotal()}</Text>
              </View>
            </View>

            <View className="flex gap-3">
              <Button
                className="flex-1 bg-white text-gray-700 border border-gray-300 rounded-lg py-3 text-sm font-medium"
                onClick={() => setShowPaymentModal(false)}
              >
                取消
              </Button>
              <Button
                className="flex-1 bg-blue-500 text-white rounded-lg py-3 text-sm font-medium"
                onClick={handlePayment}
              >
                确认支付
              </Button>
            </View>
          </View>
        </View>
      )}

      {/* 底部留白，避开 TabBar */}
      <View className="h-16" />
    </View>
  )
}

export default PaymentPage
