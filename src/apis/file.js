/**
 * 在球场
 * zaiqiuchang.com
 */

import * as utils from '../utils';
import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';

export function uploadFile(uri, type, name, bucket='zqc-img') {
  if (name === undefined) {
    name = utils.basename(uri);
  }
  return postApi(`${API_ORIGIN}/file/upload`, {'file': {uri, type, name}, bucket});
}

export function fileInfo(id) {
  return getApi(`${API_ORIGIN}/file/info`, {id});
}

export function fileInfos(ids) {
  return getApi(`${API_ORIGIN}/file/infos`, {ids: ids.join(',')});
}
