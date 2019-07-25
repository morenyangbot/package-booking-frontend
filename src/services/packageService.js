import baseService from './base'

export const fetchPackageList = () => baseService.get("/packages")
export const insertPackage = (payload) => baseService.post("/packages", payload)