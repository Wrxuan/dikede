import request from '@/utils/request'

/**
 * 图片验证
 * @param {*} data
 * @returns
 */
export const imageCodeAPI = (clientToken) => {
  return request({
    url: `/user-service/user/imageCode/${clientToken}`,
    method: 'GET'
  })
}

/**
 * 登录
 * @param {*} data
 * @returns
 */
export function loginAPI(data) {
  return request({
    url: '/user-service/user/login',
    method: 'POST',
    data
  })
}
