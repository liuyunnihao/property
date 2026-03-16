export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '报修管理' })
  : { navigationBarTitleText: '报修管理' }
