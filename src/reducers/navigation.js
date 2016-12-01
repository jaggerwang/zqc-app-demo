/**
 * 在球场
 * zaiqiuchang.com
 */

import {ActionConst} from 'react-native-router-flux';

import * as actions from '../actions';

const initialState = {
  scene: null,
};

export default (state = initialState, action) => {
  if (action.type == ActionConst.FOCUS) {
    return {
      ...state,
      scene: action.scene,
    };
  } else if (action.type == actions.RESET || action.type == actions.RESET_NAVIGATION) {
    return initialState;
  } else {
    return state;
  }
}
