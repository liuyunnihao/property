# 物业管理后台设计指南

## 1. 品牌定位
- **应用类型**: 物业管理后台系统
- **设计风格**: 专业、简洁、高效
- **目标用户**: 物业管理员、财务人员、维修人员
- **核心理念**: 数据可视、操作便捷、功能清晰

## 2. 配色方案

### 主色板
```css
/* 主色 - 专业蓝 */
--primary: #1e40af;          /* Tailwind: bg-blue-800 */
--primary-light: #3b82f6;    /* Tailwind: bg-blue-500 */
--primary-dark: #1e3a8a;     /* Tailwind: bg-blue-900 */

/* 辅助色 */
--success: #10b981;          /* Tailwind: bg-emerald-500 */
--warning: #f59e0b;          /* Tailwind: bg-amber-500 */
--danger: #ef4444;           /* Tailwind: bg-red-500 */
--info: #06b6d4;             /* Tailwind: bg-cyan-500 */
```

### 中性色
```css
--bg-main: #f8fafc;          /* Tailwind: bg-slate-50 */
--bg-card: #ffffff;          /* Tailwind: bg-white */
--border: #e2e8f0;           /* Tailwind: border-slate-200 */
--text-primary: #1e293b;     /* Tailwind: text-slate-800 */
--text-secondary: #64748b;   /* Tailwind: text-slate-500 */
--text-muted: #94a3b8;       /* Tailwind: text-slate-400 */
```

## 3. 布局规范

### 整体布局
```
┌─────────────────────────────────────────────┐
│  顶部导航栏 (h-16, bg-blue-800)              │
├──────────┬──────────────────────────────────┤
│  侧边栏   │  内容区域 (p-6, bg-slate-50)     │
│  (w-64)  │                                  │
│          │  ┌─────────────────────────────┐ │
│  导航菜单 │  │  页面标题 + 操作按钮         │ │
│          │  ├─────────────────────────────┤ │
│          │  │  数据卡片 / 表格 / 表单      │ │
│          │  │                             │ │
│          │  └─────────────────────────────┘ │
└──────────┴──────────────────────────────────┘
```

### 间距系统
- 页面内边距: `p-6`
- 卡片内边距: `p-5`
- 卡片间距: `gap-6`
- 表格行高: `h-14`

## 4. 组件规范

### 按钮样式
```tsx
// 主按钮
<Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
  确认
</Button>

// 次按钮
<Button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50">
  取消
</Button>

// 危险按钮
<Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
  删除
</Button>
```

### 卡片样式
```tsx
<View className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
  {/* 内容 */}
</View>
```

### 表格样式
```tsx
<View className="bg-white rounded-xl shadow-sm overflow-hidden">
  <View className="flex bg-slate-50 border-b border-slate-200 px-4 h-12">
    <Text className="flex-1 font-medium text-slate-600">标题</Text>
    <Text className="flex-1 font-medium text-slate-600">状态</Text>
    <Text className="w-32 font-medium text-slate-600 text-center">操作</Text>
  </View>
  <View className="flex border-b border-slate-100 px-4 h-14 items-center">
    <Text className="flex-1">数据内容</Text>
    <Text className="flex-1">处理中</Text>
    <Text className="w-32 text-center">查看</Text>
  </View>
</View>
```

### 状态标签
```tsx
// 待处理
<Text className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-sm">待处理</Text>

// 处理中
<Text className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">处理中</Text>

// 已完成
<Text className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-sm">已完成</Text>

// 已关闭
<Text className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-sm">已关闭</Text>
```

### 统计卡片
```tsx
<View className="bg-white rounded-xl p-5 shadow-sm">
  <Text className="text-slate-500 text-sm">待处理工单</Text>
  <Text className="text-3xl font-bold text-slate-800 mt-2">12</Text>
  <Text className="text-emerald-500 text-sm mt-1">↑ 5% 较上周</Text>
</View>
```

## 5. 页面结构

### 导航菜单
```
📊 首页概览    /admin/dashboard
📋 报修管理    /admin/repair
💰 缴费管理    /admin/payment
📢 通知管理    /admin/notice
👥 业主管理    /admin/user
⚙️ 系统设置    /admin/settings
```

## 6. 数据看板

### 首页统计指标
| 指标 | 图标 | 颜色 |
|------|------|------|
| 待处理工单 | Wrench | amber |
| 本月收入 | DollarSign | emerald |
| 待发通知 | Bell | blue |
| 业主总数 | Users | cyan |

## 7. 功能模块

### 报修管理
- 工单列表：状态筛选、搜索
- 工单详情：查看详情、派单、更新进度
- 状态流转：待处理 → 处理中 → 已完成

### 缴费管理
- 账单列表：按月/业主筛选
- 账单详情：费用明细
- 缴费记录：支付状态

### 通知管理
- 通知列表：已发布通知
- 发布通知：标题、内容、发布范围

### 业主管理
- 业主列表：搜索、筛选
- 业主详情：基本信息、房屋信息
