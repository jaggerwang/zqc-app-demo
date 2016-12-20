/**
 * 在球场
 * zaiqiuchang.com
 */

import ImageResizer from 'react-native-image-resizer';

import logger from '../logger';
import {navToBootstrap, navToTab} from '../navigation';
import * as utils from '../utils';
import * as apis from '../apis';
import * as actions from './';

export const RESET_ACCOUNT = 'reset_account';
export const LOGIN = 'login';
export const SET_CITY = 'set_city';
export const SET_SPORT = 'set_sport';

export function resetAccount() {
  return {
    type: RESET_ACCOUNT,
  };
}

export function setCity(city) {
  return {
    type: SET_CITY,
    city,
  };
}

export function setSport(sport) {
  return {
    type: SET_SPORT,
    sport,
  };
}

export function registerMobileSubmit(screenId, navigator) {
  return (dispatch, getState) => {
    let {input} = getState();
    dispatch(actions.validateInput(screenId, input[screenId], () => {
      let {mobile, password} = input[screenId];
      let cbOk = () => navigator.push({screen: 'zqc.RegisterVerify', title: '验证'});
      dispatch(actions.sendVerifyCode({by: "mobile", mobile, cbOk}));
    }));
  };
}

export function registerVerifySubmit(screenId, navigator) {
  return (dispatch, getState) => {
    let {input} = getState();
    dispatch(actions.validateInput(screenId, input[screenId], () => {
      let {mobile, password} = input['RegisterMobile'];
      let {code} = input[screenId];
      apis.register({mobile, password, code})
        .then((response) => {
          dispatch(actions.loginRequest(
            {mobile, password}, () => navigator.push({screen: 'zqc.RegisterProfile', title: '完善资料'})
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

export function registerProfileSubmit(screenId) {
  return (dispatch, getState) => {
    let {object, account} = getState();
    let user = object.users[account.userId];
    if (user.nickname && user.avatarType && user.gender) {
      navToTab();
    } else {
      dispatch(actions.errorFlash("请填写完基本资料。"));
    }
  };
}

export function loginSubmit(screenId, navigator) {
  return (dispatch, getState) => {
    let {input} = getState();
    dispatch(actions.validateInput(screenId, input[screenId], () => {
      let cbOk = (user) => {
        if (user.nickname && user.avatarType && user.gender) {
          navToTab()
        } else {
          navigator.push({screen: 'zqc.RegisterProfile', title: '完善资料'});
        }
      };
      let {account, password} = input[screenId];
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
      .then((response) => navToBootstrap({passProps: {isReset: true}}))
      .catch((error) => dispatch(actions.handleApiError(error)));
  };
}

export function editProfileNicknameSubmit(screenId, navigator) {
  return (dispatch, getState) => {
    let {input} = getState();
    dispatch(actions.validateInput(screenId, input[screenId], () => {
      apis.editAccount(input[screenId])
        .then((response) => {
          let {data: {user}} = response;
          dispatch(login({user, cbOk: () => navigator.pop()}));
        })
        .catch((error) => dispatch(actions.handleApiError(error)));
    }));
  }
}

export function selectCustomAvatar(screenId, picker) {
  return (dispatch) => {
    if (picker.error) {
      dispatch(actions.errorFlash(picker.error));
    } else if (!picker.didCancel && !picker.customButton) {
      dispatch(actions.saveInput(screenId, {avatarType: 'custom', avatarUri: picker.uri}));
    }
  };
}

export function editProfileAvatarSubmit(screenId, navigator) {
  return (dispatch, getState) => {
    let {input} = getState();
    dispatch(actions.validateInput(screenId, input[screenId], () => {
      let {avatarType, avatarName, avatarUri} = input[screenId];
      let cbOk = (response) => {
        let {data: {user}} = response;
        dispatch(login({user, cbOk: () => navigator.pop()}));
      };
      if (avatarType == 'builtin') {
        apis.editAccount({avatarType, avatarName})
          .then(cbOk)
          .catch((error) => dispatch(actions.handleApiError(error)));
      } else if (avatarType == 'custom') {
        if (utils.isUrl(avatarUri)) {
          navigator.pop();
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

export function editProfileGenderSubmit(screenId) {
  return (dispatch, getState) => {
    let {input} = getState();
    dispatch(actions.setScreenState(screenId, {genderPickerVisible: false}));
    
    dispatch(actions.validateInput(screenId, input[screenId], () => {
      let {gender} = input[screenId];
      apis.editAccount({gender})
        .then((response) => {
          let {data: {user}} = response;
          dispatch(login({user}));
        })
        .catch((error) => dispatch(actions.handleApiError(error)));
    }));
  };
}

export function updateAccountLocation() {
  return (dispatch, getState) => {
    let {network, location, object, account} = getState();
    let user = object.users[account.userId];
    if (!network.isConnected || !location.position || !user) {
      return;
    }

    apis.editAccount({location: location.position.coords}, true)
      .then((response) => {
        let {data: {user}} = response;
        dispatch(login({user}));
      })
      .catch((error) => dispatch(actions.handleApiError(error)));
  };
}
