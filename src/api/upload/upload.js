import request from '@/utils/request'

export function getUploadEnterpriseImageToken(token) {
  return request({
    url: '/upload/getUploadEnterpriseImageToken',
    method: 'post',
    params:{token}
  })
}


