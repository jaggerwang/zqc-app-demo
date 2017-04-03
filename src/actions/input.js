/**
 * 在球场
 * zaiqiuchang.com
 */

import valid from 'validate.js';

import * as actions from './';

export const RESET_INPUT = 'reset_input';
export const INPUT = 'input';

export function resetInput(screenId) {
  return dispatch => {
    dispatch({
      type: RESET_INPUT,
      screenId,
    });
    
    dispatch(actions.resetErrorInput(screenId));
  };
}

export function saveInput(screenId, input) {
  return dispatch => {
    dispatch({
      type: INPUT,
      screenId,
      input,
    });

    dispatch(validateInput(screenId, input));
  };
}

export function validateInput(screenId, input, cbOk) {
  return dispatch => {
    let error = {};
    Object.entries(input).forEach(([k, v]) => {
      if (constraints[screenId] && constraints[screenId][k]) {
        error[k] = valid.single(v, constraints[screenId][k]) || [];
      } else {
        error[k] = [];
      }
    });

    dispatch(actions.errorInput(screenId, error));

    if (Object.values(error).every(v => v.length == 0)) {
      if (cbOk) {
        cbOk();
      }
    }
  };
}

let accountConstraints = {
  presence: {
    message: '请输入帐号。',
  },
};

let mobileConstraints = {
  format: {
    pattern: /^\d{11}$/,
    message: '手机号须为11位数字。',
  },
};

let emailConstraints = {
  email: {
    message: '邮箱格式错误。',
  },
};

let passwordConstraints = {
  length: {
    minimum: 6,
    message: '密码长度至少为6。',
  },
};

let verifyCodeConstraints = {
  format: {
    pattern: /^\d{4}$/,
    message: '验证码为4位数字。',
  },
};

let constraints = {
  Login: {
    account: accountConstraints,
    password: passwordConstraints,
  },
  ResetPassword: {
    account: accountConstraints,
    password: passwordConstraints,
    code: verifyCodeConstraints,
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
      length: {
        minimum: 3,
        message: '昵称长度至少为3。',
      },
    },
  },
  EditProfileEmail: {
    email: emailConstraints,
    code: verifyCodeConstraints,
  },
};
