/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as actions from '../actions';

const initialState = {
  version: undefined,
};

export default (state = initialState, action) => {
  if (action.type == actions.SET_STORE_VERSION) {
    let {version} = action;
    return {
      ...state,
      version,
    };
  } else if (action.type == actions.RESET || action.type == actions.RESET_STORE) {
    return initialState;
  } else {
    return state;
  }
}
