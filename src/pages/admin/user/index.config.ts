export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '业主管理' })
  : { navigationBarTitleText: '业主管理' }
