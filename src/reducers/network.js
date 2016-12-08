/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as actions from '../actions';

const initialState = {
  isConnected: undefined,
  lastRefreshTime: {},
};

export default (state = initialState, action) => {
  if (action.type == actions.SET_NETWORK) {
    let {isConnected} = action;
    return {
      ...state,
      isConnected,
    };
  } else if (action.type == actions.SET_SCREEN_LAST_REFRESH_TIME) {
    let {screenId, lastRefreshTime, objectId} = action;
    let screenLastRefreshTime = state.lastRefreshTime[screenId] || {};
    screenLastRefreshTime = Object.assign({}, screenLastRefreshTime, {[objectId]: lastRefreshTime})
    return {
      ...state,
      lastRefreshTime: Object.assign({}, state.lastRefreshTime, {[screenId]: screenLastRefreshTime}),
    };
  } else if (action.type == actions.RESET) {
    return {
      ...state,
      lastRefreshTime: initialState.lastRefreshTime,
    };
  } else if (action.type == actions.RESET_NETWORK) {
    return initialState;
  } else {
    return state;
  }
}
