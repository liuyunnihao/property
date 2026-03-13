# 物业服务小程序设计指南

## 品牌定位

- **应用定位**：便捷、专业、贴心的智慧物业服务小程序
- **设计风格**：现代简约、清晰易用、服务导向
- **目标用户**：小区业主、物业管理人员
- **核心理念**：让物业服务更高效、更贴心

## 配色方案

### 主色调
- **主色**：`#1890ff` (蓝) - 专业、信任
  - Tailwind: `bg-blue-500`, `text-blue-500`, `border-blue-500`
- **主色变体**：
  - 浅色：`#69c0ff` - `bg-blue-400`
  - 深色：`#0050b3` - `bg-blue-700`

### 辅助色
- **成功色**：`#52c41a` - `bg-green-500`
- **警告色**：`#faad14` - `bg-yellow-500`
- **错误色**：`#ff4d4f` - `bg-red-500`

### 中性色
- **标题色**：`#262626` - `text-gray-900`
- **正文色**：`#595959` - `text-gray-700`
- **辅助色**：`#8c8c8c` - `text-gray-500`
- **边框色**：`#d9d9d9` - `border-gray-300`
- **背景色**：`#f5f5f5` - `bg-gray-100`
- **卡片背景**：`#ffffff` - `bg-white`

## 字体规范

### 字体大小
- **H1 标题**：`text-xl font-bold` (20px) - 页面主标题
- **H2 标题**：`text-lg font-semibold` (18px) - 卡片标题
- **H3 标题**：`text-base font-semibold` (16px) - 次级标题
- **正文**：`text-sm text-gray-700` (14px) - 常规文本
- **辅助文本**：`text-xs text-gray-500` (12px) - 提示、标签
- **按钮文本**：`text-sm font-medium` (14px)

## 间距系统

### 页面边距
- **页面容器**：`p-4` (16px) - 统一页面内边距
- **卡片外边距**：`mb-4` (16px) - 卡片之间的间距

### 组件内边距
- **按钮**：`py-3 px-6` (12px 24px) - 主按钮内边距
- **小按钮**：`py-2 px-4` (8px 16px) - 次按钮内边距
- **卡片**：`p-4` (16px) - 卡片内容内边距
- **列表项**：`py-3 px-4` (12px 16px) - 列表项内边距

### 间距
- **小组件间距**：`gap-2` (8px)
- **中等组件间距**：`gap-3` (12px)
- **大组件间距**：`gap-4` (16px)

## 组件规范

### 按钮样式

#### 主按钮
```tsx
<View className="w-full">
  <Button className="w-full bg-blue-500 text-white rounded-lg py-3 text-sm font-medium">
    提交
  </Button>
</View>
```

#### 次按钮
```tsx
<View className="w-full">
  <Button className="w-full bg-white text-blue-500 border border-blue-500 rounded-lg py-3 text-sm font-medium">
    取消
  </Button>
</View>
```

#### 禁用按钮
```tsx
<Button className="w-full bg-gray-300 text-gray-500 rounded-lg py-3 text-sm font-medium" disabled>
  提交
</Button>
```

### 卡片样式

```tsx
<View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
  <Text className="block text-lg font-semibold text-gray-900 mb-2">卡片标题</Text>
  <Text className="block text-sm text-gray-700">卡片内容</Text>
</View>
```

### 输入框样式

```tsx
<View className="bg-gray-50 rounded-xl px-4 py-3 mb-3">
  <Input
    className="w-full bg-transparent text-sm"
    placeholder="请输入内容"
  />
</View>
```

### 列表项样式

```tsx
<View className="bg-white rounded-xl p-4 mb-3 flex items-center justify-between">
  <View className="flex-1">
    <Text className="block text-base font-semibold text-gray-900">列表项标题</Text>
    <Text className="block text-sm text-gray-500 mt-1">辅助信息</Text>
  </View>
  <View className="flex-shrink-0">
    {/* 右侧图标或操作 */}
  </View>
</View>
```

### 空状态组件

```tsx
<View className="flex flex-col items-center justify-center py-12">
  <View className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
    <Text className="text-4xl">📭</Text>
  </View>
  <Text className="block text-base text-gray-500">暂无数据</Text>
</View>
```

### 加载状态

```tsx
<View className="flex items-center justify-center py-8">
  <Text className="block text-sm text-gray-500">加载中...</Text>
</View>
```

## 导航结构

### TabBar 配置

**页面结构**：
- `pages/index/index` - 首页
- `pages/repair/index` - 报修
- `pages/payment/index` - 缴费
- `pages/notice/index` - 通知
- `pages/profile/index` - 我的

**TabBar 样式**：
- 选中颜色：`#1890ff` (主色)
- 未选中颜色：`#999999`
- 背景色：`#ffffff`
- 图标尺寸：81px

### 页面跳转规范

- **TabBar 页面切换**：使用 `Taro.switchTab()`
- **普通页面跳转**：使用 `Taro.navigateTo()`
- **返回上一页**：使用 `Taro.navigateBack()`

## 小程序约束

### 包体积限制
- 主包大小限制：2MB
- 分包总大小限制：20MB
- 单个分包大小限制：2MB

### 图片策略
- 使用 CDN 加速
- 优先使用 WebP 格式
- 封面图尺寸：750×400 (2:1)
- 列表图尺寸：200×150 (4:3)

### 性能优化
- 列表分页加载，每页 20 条
- 图片懒加载
- 避免频繁 setData
- 合理使用分包预加载

### 跨端兼容
- Text 组件添加 `block` 类确保换行
- Input 使用 View 包裹确保样式生效
- Fixed + Flex 使用 inline style
- 底部固定元素 `bottom: 50`+ 避开 TabBar

## 状态指示

### 状态标签

- **待处理**：`bg-yellow-100 text-yellow-700`
- **处理中**：`bg-blue-100 text-blue-700`
- **已完成**：`bg-green-100 text-green-700`
- **已取消**：`bg-gray-100 text-gray-700`

### 状态标签示例

```tsx
<View className="px-3 py-1 bg-yellow-100 rounded-full">
  <Text className="text-xs text-yellow-700">待处理</Text>
</View>
```
