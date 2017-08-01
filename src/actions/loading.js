/**
 * 在球场
 * zaiqiuchang.com
 */

export function resetLoading () {
  return {
    type: 'RESET_LOADING'
  }
}

export function loadingStart (prompt) {
  return {
    type: 'LOADING_START',
    prompt
  }
}

export function loadingEnd () {
  return {
    type: 'LOADING_END'
  }
}

export function enableLoading () {
  return {
    type: 'ENABLE_LOADING'
  }
}

export function disableLoading () {
  return {
    type: 'DISABLE_LOADING'
  }
}
