import request from '@/utils/request'

export function getBrokerList(params) {
  return request({
    url: '/adminuser/getBrokerList',
    method: 'post',
    params
  })
}

export function addBroker(token,name,mobile) {
  return request({
    url: '/adminuser/addBroker',
    method: 'post',
    params:{token,name,mobile}
  })
}

