/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as actions from '../actions';

const initialState = {
  RegisterVerify: {
    secondsToSend: 0,
  },
  RegisterProfile: {
    genderPickerVisible: false,
  },
  
  EditProfile: {
    genderPickerVisible: false,
  },
};

export default (state = initialState, action) => {
  if (action.type == actions.SET_SCREEN_STATE) {
    let {screen, state: screenState} = action;
    return {
      ...state,
      [screen]: Object.assign({}, state[screen], screenState),
    };
  } else if (action.type == actions.RESET_SCREEN_STATE) {
    let {screen} = action;
    if (screen === undefined) {
      return initialState;
    } else {
      return {
        ...initialState,
        [screen]: initialState[screen],
      };
    }
  } else if (action.type == actions.RESET) {
    return initialState;
  } else {
    return state;
  }
}
