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
  if (action.type == actions.SET_SCENE_STATE) {
    let {sceneKey, state: sceneState} = action;
    return {
      ...state,
      [sceneKey]: Object.assign({}, state[sceneKey], sceneState),
    };
  } else if (action.type == actions.RESET_SCENE_STATE) {
    let {sceneKey} = action;
    if (sceneKey === undefined) {
      return initialState;
    } else {
      return {
        ...initialState,
        [sceneKey]: initialState[sceneKey],
      };
    }
  } else if (action.type == actions.RESET) {
    return initialState;
  } else {
    return state;
  }
}
