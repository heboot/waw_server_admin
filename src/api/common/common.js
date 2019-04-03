import request from '@/utils/request'

export function getCityList(token) {
  return request({
    url: '/common/cityList',
    method: 'post',
    params:{token}
  })
}

export function addShop(token,name,address,location,workTime,type,cityId) {
  return request({
    url: '/shop/addShop',
    method: 'post',
    params:{token,name,address,location,workTime,type,cityId}
  })
}

 
