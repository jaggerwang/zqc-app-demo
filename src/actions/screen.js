/**
 * 在球场
 * zaiqiuchang.com
 */

export function resetScreenState (screenId) {
  return {
    type: 'reset_screen_state',
    screenId
  }
}

export function resetScreenLastRefreshTime () {
  return {
    type: 'reset_screen_last_refresh_time'
  }
}

export function setScreenState (screenId, screenState) {
  return {
    type: 'set_screen_state',
    screenId,
    screenState
  }
}

export function setScreenLastRefreshTime ({screenId, lastRefreshTime,
  objectId = ''}) {
  lastRefreshTime = lastRefreshTime || new Date()
  return {
    type: 'set_screen_last_refresh_time',
    screenId,
    lastRefreshTime,
    objectId
  }
}
