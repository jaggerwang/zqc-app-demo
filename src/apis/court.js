/**
 * 在球场
 * zaiqiuchang.com
 */

import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';

export function courtInfo(id) {
  return getApi(`${API_ORIGIN}/court/info`, {id});
}

export function courtInfos(ids) {
  return getApi(`${API_ORIGIN}/court/infos`, {ids: ids.join(',')});
}
