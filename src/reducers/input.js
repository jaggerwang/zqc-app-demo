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
  RegisterProfile: {
    gender: '',
  },

  EditProfile: {
    gender: '',
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
    let {screen, input} = action;
    return {
      ...state,
      [screen]: Object.assign({}, state[screen], input),
    };
  } else if (action.type == actions.RESET_INPUT) {
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
