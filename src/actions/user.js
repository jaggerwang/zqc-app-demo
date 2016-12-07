/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as utils from '../utils';
import * as apis from '../apis';
import * as actions from './';

export const RESET_USER = 'reset_user';
export const SET_NEARBY_USERS = 'set_nearby_users';

export function resetUser() {
  return {
    type: RESET_USER,
  };
}

export function nearbyUsers({cbOk, cbFail, cbFinish}={}) {
  return (dispatch, getState) => {
    let {location: {position}, object} = getState();
    if (!position) {
      dispatch(actions.errorFlash("无法获取到手机位置。"));
      if (cbFail) {
        cbFail();
      }
      if (cbFinish) {
        cbFinish();
      }
      return;
    }

    let {coords: location} = position;
    let users;
    apis.nearbyUsers({location})
      .then((response) => {
        let {data} = response;
        users = data.users;
        return actions.cacheUsers(object, users);
      })
      .then((action) => {
        dispatch(action);
        let userIds = users.map((v) => v.id);
        dispatch({type: SET_NEARBY_USERS, userIds});
        if (cbOk) {
          cbOk();
        }
        if (cbFinish) {
          cbFinish();
        }
      })
      .catch((error) => {
        dispatch(actions.handleApiError(error));
        if (cbFail) {
          cbFail();
        }
        if (cbFinish) {
          cbFinish();
        }
      });
  };
}
