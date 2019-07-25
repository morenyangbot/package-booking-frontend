import baseService from './base'

export const fetchPackageList = () => baseService.get("/packages")