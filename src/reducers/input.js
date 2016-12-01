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
    let {scene, input} = action;
    return {
      ...state,
      [scene]: Object.assign({}, state[scene], input),
    };
  } else if (action.type == actions.RESET_INPUT) {
    let {scene} = action;
    if (scene === undefined) {
      return initialState;
    } else {
      return {
        ...initialState,
        [scene]: initialState[scene],
      };
    }
  } else if (action.type == actions.RESET) {
    return initialState;
  } else {
    return state;
  }
}
