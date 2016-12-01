/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as actions from '../actions';

const initialState = {
  isReady: false,
};

export default (state = initialState, action) => {
  if (action.type == actions.SET_STORE) {
    let {isReady} = action;
    return {
      ...state,
      isReady,
    };
  } else if (action.type == actions.RESET_STORE) {
    return initialState;
  } else {
    return state;
  }
}
