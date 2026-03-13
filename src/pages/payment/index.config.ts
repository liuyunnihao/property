export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '缴费' })
  : { navigationBarTitleText: '缴费' }
