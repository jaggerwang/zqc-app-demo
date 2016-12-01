/**
 * 在球场
 * zaiqiuchang.com
 */

import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';

export function userStat(id) {
  return getApi(`${API_ORIGIN}/stat/user`, {id});
}

export function userStats(ids) {
  return getApi(`${API_ORIGIN}/stat/users`, {ids: ids.join(','),});
}

export function postStat(id) {
  return getApi(`${API_ORIGIN}/stat/post`, {id});
}

export function postStats(ids) {
  return getApi(`${API_ORIGIN}/stat/posts`, {ids: ids.join(','),});
}

export function courtStat(id) {
  return getApi(`${API_ORIGIN}/stat/court`, {id});
}

export function courtStats(ids) {
  return getApi(`${API_ORIGIN}/stat/courts`, {ids: ids.join(','),});
}
