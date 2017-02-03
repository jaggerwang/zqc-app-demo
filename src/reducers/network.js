/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as actions from '../actions';

const initialState = {
  reach: undefined,
  isConnected: undefined,
};

export default (state = initialState, action) => {
  if (action.type == actions.SET_NETWORK) {
    let {type, ...newState} = action;
    return Object.assign({}, state, newState);
  } else if (action.type == actions.RESET_NETWORK) {
    return initialState;
  } else {
    return state;
  }
}
