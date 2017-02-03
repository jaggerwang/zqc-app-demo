/**
 * 在球场
 * zaiqiuchang.com
 */

import {getApi, postApi} from './';

export function register({username='', mobile='', password, code}) {
  return postApi('/register', {username, mobile, password, code});
}

export function login({username='', mobile='', email='', password}) {
  return getApi('/login', {username, mobile, email, password});
}

export function resetPassword({mobile='', email='', password='', code}) {
  return getApi('/resetPassword', {mobile, email, password, code});
}

export function isLogined({timeout=3000}={}) {
  return getApi('/isLogined', {}, {timeout});
}

export function logout() {
  return getApi('/logout');
}

export function updateAccount(update, background=false) {
  let newUpdate = {};
  Object.entries(update).forEach(([k, v]) => {
    if (k == 'location') {
      let {longitude, latitude} = v;
      v = `${longitude},${latitude}`;
    }
    newUpdate[k] = v;
  });
  return postApi('/account/edit', newUpdate, {background});
}

export function updateAccountSettings(update) {
  let newUpdate = {};
  Object.entries(update).forEach(([k, v]) => {
    newUpdate[k] = JSON.stringify(v);
  });
  return postApi('/account/updateSettings', newUpdate);
}

export function accountInfo() {
  return getApi('/account/info');
}
