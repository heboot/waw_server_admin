'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  // NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  NODE_ENV: '"development"',
  BASE_API: '"https://192.168.0.100:442"',
  //https://192.168.0.102:4443/WawHRServer https://api.youzhihr.com:442
})
