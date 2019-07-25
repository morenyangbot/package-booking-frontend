import axios from 'axios'
import {notification} from 'ant-design-vue'

const request = axios.create({})

request.interceptors.response.use(
    res => {
        return res.data
    },
    error => {
        if(error.response) {
            notification.error({
                message: error.response.error,
                description: error.response.message
            })
        }
    }
)

export default request
