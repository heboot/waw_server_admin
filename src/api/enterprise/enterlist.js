import request from '@/utils/request'

export function getEnterpriseList(params) {
  return request({
    url: '/enterprise/getAllEnterprise',
    method: 'get',
    params
  })
}
