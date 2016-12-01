/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as actions from '../actions';

const initialState = {
  input: {},
  flash: '',
};

export default (state = initialState, action) => {
  if (action.type == actions.ERROR_INPUT) {
    let {scene, error} = action;
    return {
      ...state,
      input: {
        ...state.input,
        [scene]: {
          ...(state.input[scene] === undefined ? {} : state.input[scene]),
          ...error,
        },
      },
    };
  } else if (action.type == actions.ERROR_FLASH) {
    let {error} = action;
    return {
      ...state,
      flash: error,
    };
  } else if (action.type == actions.RESET || action.type == actions.RESET_ERROR) {
    return initialState;
  } else {
    return state;
  }
}
