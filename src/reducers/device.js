/**
 * 在球场
 * zaiqiuchang.com
 */

import * as actions from '../actions';

const initialState = {
  keyboard: {
    coords: undefined,
  },
};

export default (state = initialState, action) => {
  if (action.type == actions.SET_KEYBOARD) {
    let {coords} = action;
    return {
      ...state,
      keyboard: {
        ...state.keyboard,
        coords,
      },
    };
  } else if (action.type == actions.RESET_DEVICE) {
    return initialState;
  } else {
    return state;
  }
};
