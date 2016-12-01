/**
 * 在球场
 * zaiqiuchang.com
 */

import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';

export function register({username='', mobile='', password, code}) {
  return postApi(`${API_ORIGIN}/register`, {username, mobile, password, code});
}

export function login({username='', mobile='', email='', password}) {
  return getApi(`${API_ORIGIN}/login`, {username, mobile, email, password});
}

export function isLogined() {
  return getApi(`${API_ORIGIN}/isLogined`);
}

export function logout() {
  return getApi(`${API_ORIGIN}/logout`);
}

export function editAccount(update) {
  if (update['location'] !== undefined) {
    let {longitude, latitude} = update['location'];
    update['location'] = `${longitude},${latitude}`;
  }
  return postApi(`${API_ORIGIN}/account/edit`, update);
}

export function accountInfo() {
  return getApi(`${API_ORIGIN}/account/info`);
}
