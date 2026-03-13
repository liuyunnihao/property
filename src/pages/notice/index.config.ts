export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '通知' })
  : { navigationBarTitleText: '通知' }
