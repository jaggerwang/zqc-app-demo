/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as actions from '../actions';

const initialState = {
  navBarHidden: false,
  orientation: 'PORTRAIT',
  isBuffering: false,
  loaded: false,
  paused: false,
  ended: false,
  rate: undefined,
  rateSelectorVisible: false,
  src: undefined,
  naturalSize: undefined,
  duration: 0,
  playableDuration: 0,
  currentTime: 0,
};

export default (state = initialState, action) => {
  if (action.type == actions.SET_PLAYER_STATE) {
    let {type, ...newState} = action;
    newState = Object.assign({}, state, newState);
    newState.currentTime = Math.min(newState.currentTime, newState.duration);
    return newState;
  } else if (action.type == actions.RESET || action.type == actions.RESET_PLAYER_STATE) {
    return initialState;
  } else {
    return state;
  }
}
