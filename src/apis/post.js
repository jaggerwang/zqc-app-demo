/**
 * 在球场
 * zaiqiuchang.com
 */

import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';

export function postInfo(id) {
  return getApi(`${API_ORIGIN}/post/info`, {id});
}

export function postInfos(ids) {
  return getApi(`${API_ORIGIN}/post/infos`, {ids: ids.join(',')});
}

export function postsOfCity({cityCode, sportCode='', limit=10, offset=''}) {
  return getApi(`${API_ORIGIN}/post/byCity`, {cityCode, sportCode, limit, offset});
}
