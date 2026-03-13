export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '报修' })
  : { navigationBarTitleText: '报修' }
