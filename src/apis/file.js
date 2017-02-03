/**
 * 在球场
 * zaiqiuchang.com
 */

import {basename} from 'path';

import {getApi, postApi} from './';

export function fileInfo(id) {
  return getApi('/file/info', {id});
}

export function fileInfos(ids) {
  return getApi('/file/infos', {ids: ids.join(',')});
}
