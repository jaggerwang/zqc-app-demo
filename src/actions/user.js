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

export function userInfo({userId, cbOk, cbFail, cbFinish}) {
  return dispatch => {
    dispatch(actions.cacheUserByIds({userIds: [userId], update: true}))
      .then(users => {
        if (cbFinish) {
          cbFinish();
        }
        if (cbOk) {
          cbOk(users);
        }
      })
      .catch(error => {
        if (cbFinish) {
          cbFinish();
        }
        if (cbFail) {
          cbFail(error);
        } else {
          dispatch(actions.handleError(error));
        }
      });
  };
}

export function nearbyUsers({cbOk, cbFail, cbFinish}={}) {
  return (dispatch, getState) => {
    let {location: {position}, object} = getState();
    if (!position) {
      if (cbFinish) {
        cbFinish();
      }
      dispatch(actions.errorFlash("无法获取当前位置。"));
      return;
    }

    let {coords: location} = position;
    apis.nearbyUsers({location})
      .then(response => {
        let {data: {users}} = response;
        return dispatch(actions.cacheUsers({users}));
      })
      .then(users => {
        if (cbFinish) {
          cbFinish();
        }
        let userIds = users.map(v => v.id);
        dispatch({type: SET_NEARBY_USERS, userIds});
        if (cbOk) {
          cbOk(users);
        }
      })
      .catch(error => {
        if (cbFinish) {
          cbFinish();
        }
        if (cbFail) {
          cbFail(error);
        } else {
          dispatch(actions.handleError(error));
        }
      });
  };
}
