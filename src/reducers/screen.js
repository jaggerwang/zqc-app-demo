/**
 * 在球场
 * zaiqiuchang.com
 */

import * as actions from '../actions';

const initialState = {
  lastRefreshTime: {},
  
  RegisterVerify: {
    secondsToSend: 0,
  },
  ResetPassword: {
    secondsToSend: 0,
  },

  Nearby: {
    refreshing: false,
  },
  AtCourt: {
    refreshing: false,
  },
  Me: {
    refreshing: false,
  },

  EditProfileEmail: {
    secondsToSend: 0,
  },

  Album: {
    navBarHidden: false,
    files: [],
    currentIndex: 0,
  },
};

export default (state = initialState, action) => {
  if (action.type == actions.SET_SCREEN_STATE) {
    let {screenId, screenState} = action;
    return {
      ...state,
      [screenId]: Object.assign({}, state[screenId], screenState),
    };
  } else if (action.type == actions.SET_SCREEN_LAST_REFRESH_TIME) {
    let {screenId, lastRefreshTime, objectId} = action;
    let screenLastRefreshTime = state.lastRefreshTime[screenId] || {};
    screenLastRefreshTime = Object.assign({}, screenLastRefreshTime, 
      {[objectId]: lastRefreshTime});
    return {
      ...state,
      lastRefreshTime: Object.assign({}, state.lastRefreshTime, 
        {[screenId]: screenLastRefreshTime}),
    };
  } else if (action.type == actions.RESET_SCREEN_STATE) {
    let {screenId} = action;
    if (screenId === undefined) {
      return initialState;
    } else {
      return {
        ...state,
        [screenId]: initialState[screenId],
      };
    }
  } else if (action.type == actions.RESET_SCREEN_LAST_REFRESH_TIME) {
    return {
      ...state,
      lastRefreshTime: initialState.lastRefreshTime,
    };
  } else if (action.type == actions.RESET) {
    return initialState;
  } else {
    return state;
  }
};
