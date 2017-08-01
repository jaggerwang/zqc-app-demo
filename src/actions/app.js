/**
 * 在球场
 * zaiqiuchang.com
 */

export function resetApp () {
  return {
    type: 'RESET_APP'
  }
}

export function setAppEnv (env) {
  return {
    type: 'SET_APP_ENV',
    env
  }
}
