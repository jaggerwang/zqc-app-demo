/**
 * 在球场
 * zaiqiuchang.com
 */

import {getApi, postApi} from './';

export function courtInfo(id) {
  return getApi('/court/info', {id});
}

export function courtInfos(ids) {
  return getApi('/court/infos', {ids: ids.join(',')});
}
