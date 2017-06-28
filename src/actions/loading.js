/**
 * 在球场
 * zaiqiuchang.com
 */

export function resetLoading () {
  return {
    type: 'reset_loading'
  }
}

export function loadingStart (prompt) {
  return {
    type: 'loading_start',
    prompt
  }
}

export function loadingEnd () {
  return {
    type: 'loading_end'
  }
}

export function enableLoading () {
  return {
    type: 'enable_loading'
  }
}

export function disableLoading () {
  return {
    type: 'disable_loading'
  }
}
