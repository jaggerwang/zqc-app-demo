/**
 * 在球场
 * zaiqiuchang.com
 */

export function resetScreenState (screenId) {
  return {
    type: 'RESET_SCREEN_STATE',
    screenId
  }
}

export function resetScreenLastRefreshTime () {
  return {
    type: 'RESET_SCREEN_LAST_REFRESH_TIME'
  }
}

export function setScreenState (screenId, screenState) {
  return {
    type: 'SET_SCREEN_STATE',
    screenId,
    screenState
  }
}

export function setScreenLastRefreshTime ({screenId, lastRefreshTime,
  objectId = ''}) {
  lastRefreshTime = lastRefreshTime || new Date()
  return {
    type: 'SET_SCREEN_LAST_REFRESH_TIME',
    screenId,
    lastRefreshTime,
    objectId
  }
}
