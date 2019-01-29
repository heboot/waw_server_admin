import request from '@/utils/request'

export function getEnterpriseList(params) {
  return request({
    url: '/enterprise/getAllEnterprise',
    method: 'get',
    params
  })
}

export function updateEnterpriseSubsidy(id,subsidy_money,subsidy_info) {
  return request({
    url: '/enterprise/updateEnterpriseSubsidy',
    method: 'post',
    params:{id,subsidy_money,subsidy_info}
  })
}