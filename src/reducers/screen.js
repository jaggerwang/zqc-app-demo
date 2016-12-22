/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as actions from '../actions';

const initialState = {
  Nearby: {
    citySelectorVisible: false,
  },
  
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
    let {screenId, screenState} = action;
    return {
      ...state,
      [screenId]: Object.assign({}, state[screenId], screenState),
    };
  } else if (action.type == actions.RESET_SCREEN_STATE) {
    let {screenId} = action;
    if (screenId === undefined) {
      return initialState;
    } else {
      return {
        ...initialState,
        [screenId]: initialState[screenId],
      };
    }
  } else if (action.type == actions.RESET) {
    return initialState;
  } else {
    return state;
  }
}
