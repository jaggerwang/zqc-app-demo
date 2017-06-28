/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger'
import {InputError, ApiHttpError} from '../error'

export function resetError () {
  return {
    type: 'reset_error'
  }
}

export function resetErrorInput (screenId) {
  return {
    type: 'reset_error_input',
    screenId
  }
}

export function errorInput (screenId, error) {
  return {
    type: 'error_input',
    screenId,
    error
  }
}

export function errorFlash (error, duration = 3000) {
  return dispatch => {
    dispatch({
      type: 'error_flash',
      error
    })
    setTimeout(() => {
      dispatch({
        type: 'error_flash',
        error: ''
      })
    }, duration)
  }
}

export function handleError (error) {
  return dispatch => {
    logger.debug(error)
    if (error instanceof ApiHttpError) {
      if (error.code === 401) {
        dispatch(errorFlash('登录已失效，请重新登录。'))
      } else {
        dispatch(errorFlash(error.message))
      }
    } else if (error instanceof InputError) {
      dispatch(errorInput(error.screenId, error.error))
    } else if (error instanceof Error) {
      dispatch(errorFlash(error.message))
    } else if (error instanceof Object && error.hasOwnProperty('message')) {
      dispatch(errorFlash(error.message))
    } else {
      logger.error(error)
    }
  }
}
