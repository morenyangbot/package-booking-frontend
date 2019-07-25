import axios from 'axios'
import { notification } from 'ant-design-vue'

const request = axios.create({})

request.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    if (error.response) {
      notification.error({
        message: error.response.data.error,
        description: error.response.data.message
      })
    }
    throw error
  }
)

export default request
