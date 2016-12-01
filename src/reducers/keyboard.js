/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as actions from '../actions';

const initialState = {
  coords: null,
};

export default (state = initialState, action) => {
  if (action.type == actions.SET_KEYBOARD) {
    let {coords} = action;
    return {
      ...state,
      coords,
    };
  } else if (action.type == actions.RESET_KEYBOARD) {
    return initialState;
  } else {
    return state;
  }
}
