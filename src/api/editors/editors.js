import request from '@/utils/request'

export function getEditorList(params) {
  return request({
    url: '/adminuser/getEditorList',
    method: 'post',
    params
  })
}

export function addEditor(token,name,mobile) {
  return request({
    url: '/adminuser/addEditor',
    method: 'post',
    params:{token,name,mobile}
  })
}

