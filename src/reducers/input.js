/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as actions from '../actions';

const initialState = {
  Login: {
    account: '',
    password: '',
  },

  RegisterMobile: {
    mobile: '',
    password: '',
  },
  RegisterVerify: {
    code: '',
  },

  EditProfileNickname: {
    nickname: '',
  },
  EditProfileAvatar: {
    avatarType: '',
    avatarName: '',
    avatarUri: '',
  },
};

export default (state = initialState, action) => {
  if (action.type == actions.INPUT) {
    let {screenId, input} = action;
    return {
      ...state,
      [screenId]: Object.assign({}, state[screenId], input),
    };
  } else if (action.type == actions.RESET_INPUT) {
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
