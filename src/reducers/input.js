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
  ResetPassword: {
    account: '',
    password: '',
    code: '',
  },

  RegisterMobile: {
    mobile: '',
    password: '',
  },
  RegisterVerify: {
    code: '',
  },

  CreatePost: {
    text: '',
    files: [],
    court: null,
    post: null,
  },
  SelectCourt: {
    by: '',
    court: null,
    name: '',
  },

  PostDetail: {
    comment: '',
  },
  
  EditProfileNickname: {
    nickname: '',
  },
  EditProfileEmail: {
    email: '',
    code: '',
  },
  EditProfileAvatar: {
    avatarType: '',
    avatarName: '',
    avatarFile: null,
    avatarImage: null,
  },
  EditProfileIntro: {
    intro: '',
  },
  EditProfileBackground: {
    backgroundType: '',
    backgroundName: '',
    backgroundFile: null,
    backgroundImage: null,
  },

  Report: {
    objectType: '',
    objectId: '',
    reason: 0,
  },

  AdminCreatePost: {
    text: '',
    files: [],
    court: null,
  },
  AdminSelectCourt: {
    keyword: '',
    name: '',
    longitude: '',
    latitude: '',
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
        ...state,
        [screenId]: initialState[screenId],
      };
    }
  } else if (action.type == actions.RESET) {
    return initialState;
  } else {
    return state;
  }
}
