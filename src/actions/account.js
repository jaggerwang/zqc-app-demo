/**
 * 在球场
 * zaiqiuchang.com
 */

import {Actions, ActionConst} from 'react-native-router-flux';
import ImageResizer from 'react-native-image-resizer';

import logger from '../logger';
import * as utils from '../utils';
import * as apis from '../apis';
import * as actions from './';

export const RESET_ACCOUNT = 'reset_account';
export const LOGIN = 'login';

export function resetAccount() {
  return {
    type: RESET_ACCOUNT,
  };
}

export function registerMobileSubmit(sceneKey) {
  return (dispatch, getState) => {
    let {input} = getState();
    dispatch(actions.validateInput(sceneKey, input[sceneKey], () => {
      let {mobile, password} = input[sceneKey];
      let cbOk = () => Actions.RegisterVerify({mobile, password});
      dispatch(actions.sendVerifyCode({by: "mobile", mobile, cbOk}));
    }));
  };
}

export function registerVerifySubmit(sceneKey) {
  return (dispatch, getState) => {
    let {input, sceneState} = getState();
    dispatch(actions.validateInput(sceneKey, input[sceneKey], () => {
      let {mobile, password, code} = input[sceneKey];
      apis.register({mobile, password, code})
        .then((response) => {
          dispatch(actions.loginRequest(
            {mobile, password}, () => Actions.RegisterProfile()
          ));
        })
        .catch(error => {
          if (error instanceof apis.ResultError) {
            if (error.code == apis.ERROR_CODE_DUPLICATED) {
              dispatch(actions.errorFlash("手机号已注册过。"));
              return;
            } else if (error.code == apis.ERROR_CODE_INVALID_VERIFY_CODE) {
              dispatch(actions.errorFlash("验证码错误。"));
              return;
            }
          }
          dispatch(actions.handleApiError(error));
        });
    }));
  };
}

export function registerProfileSubmit(sceneKey) {
  return (dispatch, getState) => {
    let {object, account} = getState();
    let user = object.users[account.userId];
    if (user.nickname && user.avatarType && user.gender) {
      Actions.Nearby();
    } else {
      dispatch(actions.errorFlash("请填写完基本资料。"));
    }
  };
}

export function loginSubmit(sceneKey, cbOk) {
  return (dispatch, getState) => {
    let {input} = getState();
    dispatch(actions.validateInput(sceneKey, input[sceneKey], () => {
      if (!cbOk) {
        cbOk = (user) => {
          if (user.nickname && user.avatarType && user.gender) {
            Actions.Nearby();
          } else {
            Actions.RegisterProfile();
          }
        };
      }
      let {account, password} = input[sceneKey];
      let username, mobile, email;
      if (account.match(/^\d+$/) !== null) {
        mobile = account;
      } else if (account.match(/^.+@.+$/) !== null) {
        email = account;
      } else {
        username = account;
      }
      dispatch(loginRequest({username, mobile, email, password}, cbOk));
    }));
  }
}

export function loginRequest({username, mobile, email, password}, cbOk) {
  return (dispatch) => {
    apis.login({username, mobile, email, password})
      .then((response) => {
        let {data: {user}} = response;
        dispatch(login({user, cbOk}));
      })
      .catch((error) => {
        if (error instanceof apis.ResultError) {
          if (error.code == apis.ERROR_CODE_NOT_FOUND
            || error.code == apis.ERROR_CODE_WRONG_PASSWORD) {
            dispatch(actions.errorFlash("帐号或密码错误"));
            return;
          }
        }
        dispatch(actions.handleApiError(error));
      });
  };
}

export function login({user, cbOk, cbFail}) {
  return (dispatch, getState) => {
    let {object} = getState();
    actions.cacheUsers(object, [user])
      .then((action) => {
        dispatch(action);
        dispatch({type: LOGIN, userId: user.id});
        if (cbOk) {
          cbOk(user);
        }
      })
      .catch((error) => {
        dispatch(actions.handleApiError(error));
        if (cbFail) {
          cbFail(error);
        }
      });
  };
}

export function logoutRequest() {
  return (dispatch, getState) => {
    apis.logout()
      .then((response) => Actions.Bootstrap({isReset: true}))
      .catch((error) => dispatch(actions.handleApiError(error)));
  };
}

export function editProfileNicknameSubmit(sceneKey) {
  return (dispatch, getState) => {
    let {input} = getState();
    dispatch(actions.validateInput(sceneKey, input[sceneKey], () => {
      apis.editAccount(input[sceneKey])
        .then((response) => {
          let {data: {user}} = response;
          dispatch(login({user, cbOk: () => Actions.pop()}));
        })
        .catch((error) => dispatch(actions.handleApiError(error)));
    }));
  }
}

export function selectCustomAvatar(sceneKey, picker) {
  return (dispatch) => {
    if (picker.error) {
      dispatch(actions.errorFlash(picker.error));
    } else if (!picker.didCancel && !picker.customButton) {
      dispatch(actions.saveInput(sceneKey, {avatarType: 'custom', avatarUri: picker.uri}));
    }
  };
}

export function editProfileAvatarSubmit(sceneKey) {
  return (dispatch, getState) => {
    let {input} = getState();
    dispatch(actions.validateInput(sceneKey, input[sceneKey], () => {
      let {avatarType, avatarName, avatarUri} = input[sceneKey];
      let cbOk = (response) => {
        let {data: {user}} = response;
        dispatch(login({user, cbOk: () => Actions.pop()}));
      };
      if (avatarType == 'builtin') {
        apis.editAccount({avatarType, avatarName})
          .then(cbOk)
          .catch((error) => dispatch(actions.handleApiError(error)));
      } else if (avatarType == 'custom') {
        if (utils.isUrl(avatarUri)) {
          Actions.pop();
          return;
        }

        ImageResizer.createResizedImage(avatarUri, 1080, 810, 'JPEG', 90)
          .then(resizedImageUri => apis.uploadFile(resizedImageUri, 'image/jpeg'))
          .then((response) => {
            let {data: {file}} = response;
            return apis.editAccount({avatarType, avatarId: file.id});
          })
          .then(cbOk)
          .catch((error) => dispatch(actions.handleApiError(error)));
      }
    }));
  };
}

export function editProfileGenderSubmit(sceneKey) {
  return (dispatch, getState) => {
    let {input} = getState();
    dispatch(actions.setSceneState(sceneKey, {genderPickerVisible: false}));
    
    dispatch(actions.validateInput(sceneKey, input[sceneKey], () => {
      let {gender} = input[sceneKey];
      apis.editAccount({gender})
        .then((response) => {
          let {data: {user}} = response;
          dispatch(login({user}));
        })
        .catch((error) => dispatch(actions.handleApiError(error)));
    }));
  };
}
