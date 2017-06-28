/**
 * 在球场
 * zaiqiuchang.com
 */

import axios from 'axios'
import querystring from 'querystring'
import {parse} from 'url'

import {API_BASE_URL} from '../config'
import logger from '../logger'
import {ApiHttpError, ApiResultError} from '../error'
import store from '../store'
import {loadingStart, loadingEnd, resetLoading} from '../actions'

let client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  paramsSerializer: params => querystring.stringify(params),
  responseType: 'json',
  maxContentLength: Math.pow(1024, 2)
})

client.interceptors.request.use(
  config => {
    let {method, url, params, data, background} = config
    logger.info(method, url, params || data)
    if (!background) {
      store.dispatch(loadingStart())
    }
    return config
  },
  error => {
    logger.info(error)
    store.dispatch(resetLoading())
    return Promise.reject(new ApiHttpError(400, error.message))
  }
)
client.interceptors.response.use(
  response => {
    let {status, data, config: {url, background}} = response
    let {path} = parse(url)
    logger.info(status, path, data)
    if (!background) {
      store.dispatch(loadingEnd())
    }
    return response
  },
  error => {
    logger.info(error)
    store.dispatch(resetLoading())
    if (error.response) {
      let {status, statusText} = error.response
      if (statusText === undefined) {
        if (status === 200) {
          statusText = '成功'
        } else if (status === 400) {
          statusText = '请求不正确'
        } else if (status === 401) {
          statusText = '没有权限'
        } else if (status === 413) {
          statusText = '发送内容过大'
        } else if (status === 500) {
          statusText = '服务器内部错误'
        } else if (status === 502) {
          statusText = '服务暂时不可用'
        } else if (status === 504) {
          statusText = '服务器处理超时'
        } else {
          statusText = '请求服务出错'
        }
      }
      return Promise.reject(new ApiHttpError(status, statusText))
    } else {
      if (error.message.startsWith('timeout of ')) {
        return Promise.reject(new ApiHttpError(408, '请求超时'))
      } else {
        return Promise.reject(new ApiHttpError(500, error.message))
      }
    }
  }
)

export function getApi (url, params = {}, {headers = {}, timeout = 3000,
  background = false, onDownloadProgress} = {}) {
  return requestApi({
    url,
    method: 'GET',
    params,
    headers,
    timeout,
    background,
    onDownloadProgress
  })
}

export function postApi (url, data = {}, {headers = {}, timeout = 5000,
  background = false, onUploadProgress} = {}) {
  let formData = new FormData() // eslint-disable-line no-undef
  for (let [k, v] of Object.entries(data)) {
    formData.append(k, v)
  }
  return requestApi({
    url,
    method: 'POST',
    data: formData,
    headers,
    timeout,
    background,
    onUploadProgress
  })
}

export function requestApi (config) {
  return client.request(config)
    .then(response => {
      if (response.data.code === 0) {
        return response.data
      } else {
        let {code, message, data} = response.data
        return Promise.reject(new ApiResultError(code, message, data))
      }
    })
}
