import request from '@/utils/request'

export function getEmployeeList(params) {
  return request({
    url: '/employee/getEmployeeList',
    method: 'get',
    params
  })
}

export function updateEmployeeStatus(token,employeeId,status) {
  return request({
    url: '/employee/updateEmployeeStatus',
    method: 'post',
    params:{token,employeeId,status}
  })
}

export function updateEmployeeJobStatus(token,employeeId,status) {
  return request({
    url: '/employee/updateEmployeeJobStatus',
    method: 'post',
    params:{token,employeeId,status}
  })
}

export function getEmployeeSignLogList(params) {
  return request({
    url: '/employee/getEmployeeSignLogList',
    method: 'get',
    params
  })
}