import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/adminuser/doAdminUserLogin',
    method: 'post',
    params: {
      username, password
    },
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/adminuser/getAdminUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
