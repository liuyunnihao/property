export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '缴费管理' })
  : { navigationBarTitleText: '缴费管理' }
