import request from '@/utils/request'

export function getEmployeeList(params) {
  return request({
    url: '/employee/getEmployeeList',
    method: 'get',
    params
  })
}

export function updateEmployeeStatus(employeeId,status) {
  return request({
    url: '/employee/updateEmployeeStatus',
    method: 'post',
    params:{employeeId,status}
  })
}