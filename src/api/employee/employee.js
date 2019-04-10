import request from '@/utils/request'

export function getEmployeeList(params) {
  return request({
    url: '/employee/getEmployeeList',
    method: 'get',
    params
  })
}

export function getEmployeeApplyList(params) {
  return request({
    url: '/employee/getEmployeeApplyList',
    method: 'post',
    params
  })
}

export function getEmployeeJoinList(params) {
  return request({
    url: '/employee/getEmployeeJoinList',
    method: 'post',
    params
  })
}

export function getEmployeeIdCardList(params) {
  return request({
    url: '/adminuser/idCardList',
    method: 'post',
    params
  })
}

export function getEmployeeBankCardList(params) {
  return request({
    url: '/employee/employeeBankList',
    method: 'post',
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

export function updateEmployeeIDCardStatus(token,uid,status) {
  return request({
    url: '/employee/updateEmployeeIDCardStatus',
    method: 'post',
    params:{token,uid,status}
  })
}

export function updateEmployeeBankStatus(token,uid,status) {
  return request({
    url: '/employee/updateEmployeeBankStatus',
    method: 'post',
    params:{token,uid,status}
  })
}


export function updateEmployeeJobStatus(token,employeeId,status,eid) {
  return request({
    url: '/employee/updateEmployeeJobStatus',
    method: 'post',
    params:{token,employeeId,status,eid}
  })
}

export function getEmployeeSignLogList(params) {
  return request({
    url: '/employee/getEmployeeSignLogList',
    method: 'get',
    params
  })
}

export function sendEmployeeJoinSubsidyMoney(token,employeeId,money) {
  return request({
    url: '/employee/sendEmployeeJoinSubsidyMoney',
    method: 'post',
    params:{token,employeeId,money}
  })
}

