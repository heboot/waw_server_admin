import request from '@/utils/request'

export function getEnterpriseList(params) {
  return request({
    url: '/enterprise/getEnterpriseList',
    method: 'post',
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

export function updateEnterprisePackageMoeny(id,money) {
  return request({
    url: '/enterprise/updateEnterprisePackageMoney',
    method: 'post',
    params:{id,money}
  })
}

export function updateEnterprise(token,enterprise) {
  return request({
    url: '/enterprise/updateEnterprise',
    method: 'post',
    params:{token,enterprise}
  })
}

export function addEnterprise(token,enterprise) {
  return request({
    url: '/enterprise/addEnterprise',
    method: 'post',
    params:{token,enterprise}
  })
}