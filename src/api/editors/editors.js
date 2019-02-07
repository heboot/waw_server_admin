import request from '@/utils/request'

export function getEditorList(params) {
  return request({
    url: '/adminuser/getEditorList',
    method: 'post',
    params
  })
}

