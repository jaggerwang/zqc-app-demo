/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  lastRefreshTime: {},

  RegisterVerify: {
    secondsToSend: 0
  },
  ResetPassword: {
    secondsToSend: 0
  },
  RegisterProfile: {
    showProfileGender: false
  },

  Nearby: {
    refreshing: false,
    showCityAndSport: false
  },
  AtCourt: {
    refreshing: false
  },
  Me: {
    refreshing: false
  },

  EditProfile: {
    showProfileGender: false
  },
  EditProfileEmail: {
    secondsToSend: 0
  },

  Album: {
    files: []
  }
}

export default (state = initialState, action) => {
  if (action.type === 'SET_SCREEN_STATE') {
    let {screenId, screenState} = action
    return {
      ...state,
      [screenId]: Object.assign({}, state[screenId], screenState)
    }
  } else if (action.type === 'SET_SCREEN_LAST_REFRESH_TIME') {
    let {screenId, lastRefreshTime, objectId} = action
    let screenLastRefreshTime = state.lastRefreshTime[screenId] || {}
    screenLastRefreshTime = Object.assign({}, screenLastRefreshTime,
      {[objectId]: lastRefreshTime})
    return {
      ...state,
      lastRefreshTime: Object.assign({}, state.lastRefreshTime,
        {[screenId]: screenLastRefreshTime})
    }
  } else if (action.type === 'RESET_SCREEN_STATE') {
    let {screenId} = action
    if (screenId === undefined) {
      return initialState
    } else {
      return {
        ...state,
        [screenId]: initialState[screenId]
      }
    }
  } else if (action.type === 'RESET_SCREEN_LAST_REFRESH_TIME') {
    return {
      ...state,
      lastRefreshTime: initialState.lastRefreshTime
    }
  } else if (action.type === 'RESET') {
    return initialState
  } else {
    return state
  }
}
