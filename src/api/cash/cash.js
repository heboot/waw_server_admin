import request from '@/utils/request'



export function getCashList(params) {
  return request({
    url: '/cash/cashList',
    method: 'post',
    params
  })
}


export function updateEmployeeCashLogStatus(token,employeeId,money,cashId) {
  return request({
    url: '/cash/updateEmployeeCashLogStatus',
    method: 'post',
    params:{token,employeeId,money,cashId}
  })
}

