import baseService from './base'

export const fetchPackageList = () => baseService.get('/packages')
export const insertPackage = (payload) => baseService.post('/packages', payload)
export const confirmReceipt = (payload) => baseService.put(`/packages/${payload.id}/confirm`)
export const reverseReceipt = (payload) => baseService.put(`/packages/${payload.no}/reverse`, payload)
