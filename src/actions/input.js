/**
 * 在球场
 * zaiqiuchang.com
 */

import {Actions} from 'react-native-router-flux';

import logger from '../logger';
import * as utils from '../utils';
import * as apis from '../apis';
import * as actions from './';

export const RESET_INPUT = 'reset_input';
export const INPUT = 'input';

export function resetInput(scene) {
  return {
    type: RESET_INPUT,
    scene,
  };
}

export function saveInput(scene, input) {
  return dispatch => {
    dispatch({
      type: INPUT,
      scene,
      input,
    });
    dispatch(validateInput(scene, input));
  };
}

export function cancelInput(scene) {
  return dispatch => {
    dispatch(resetInput(scene));
    Actions.pop();
  };
}

export function validateInput(scene, input, cbOk) {
  return dispatch => {
    let error = {};
    Object.entries(input).forEach(([k, v]) => {
      if (constraints[scene] && constraints[scene][k]) {
        error[k] = utils.validateSingle(v, constraints[scene][k]);
      } else {
        error[k] = [];
      }
    });
    dispatch(actions.errorInput(scene, error));

    if (cbOk !== undefined && Object.values(error).every(v => v.length == 0)) {
      cbOk();
    }
  };
}

let accountConstraints = {
  presence: {
    message: '请输入帐号。',
  },
};

let mobileConstraints = {
  presence: {
    message: '请输入手机号。',
  },
  format: {
    pattern: /^\d{11}$/,
    message: '手机号须为11位数字。'
  },
};

let passwordConstraints = {
  presence: {
    message: '请输入密码。',
  },
  length: {
    minimum: 6,
    maximum: 20,
    message: '密码长度须在6到20之间。'
  },
};

let verifyCodeConstraints = {
  presence: {
    message: '请输入验证码。',
  },
  format: {
    pattern: /^\d{4}$/,
    message: '验证码为4位数字。'
  },
};

let constraints = {
  Login: {
    account: accountConstraints,
    password: passwordConstraints,
  },

  RegisterMobile: {
    mobile: mobileConstraints,
    password: passwordConstraints,
  },
  RegisterVerify: {
    code: verifyCodeConstraints,
  },

  EditProfileNickname: {
    nickname: {
      presence: {
        message: '请输入昵称。',
      },
      length: {
        minimum: 3,
        maximum: 20,
        message: '昵称长度须在3到20之间。'
      },
    },
  },
};
