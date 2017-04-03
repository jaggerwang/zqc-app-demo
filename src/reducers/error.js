/**
 * 在球场
 * zaiqiuchang.com
 */

import * as actions from '../actions';

const initialState = {
  input: {},
  flash: '',
};

export default (state = initialState, action) => {
  if (action.type == actions.ERROR_INPUT) {
    let {screenId, error} = action;
    return {
      ...state,
      input: {
        ...state.input,
        [screenId]: {
          ...(state.input[screenId] === undefined ? {} : state.input[screenId]),
          ...error,
        },
      },
    };
  } else if (action.type == actions.RESET_ERROR_INPUT) {
    let {screenId} = action;
    if (screenId === undefined) {
      return {
        ...state,
        input: initialState.input,
      };
    } else {
      return {
        ...state,
        input: {
          ...state.input,
          [screenId]: initialState.input[screenId] || {},
        },
      };
    }
  } else if (action.type == actions.ERROR_FLASH) {
    let {error} = action;
    return {
      ...state,
      flash: error,
    };
  } else if (action.type == actions.RESET || 
    action.type == actions.RESET_ERROR) {
    return initialState;
  } else {
    return state;
  }
};
