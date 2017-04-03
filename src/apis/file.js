/**
 * 在球场
 * zaiqiuchang.com
 */

import {basename} from 'path';

import {getApi, postApi} from './';

export function uploadFile({path, mime, size = 0, pixelSize = '', duration = 0, 
  bucket = 'zqc-img'}, {timeout = 10000, background = false, 
  onUploadProgress} = {}) {
  return postApi('/file/upload', {
    file: {uri: path, type: mime, name: basename(path)}, 
    size,
    pixelSize,
    duration,
    bucket,
  }, {timeout, background, onUploadProgress});
}

export function fileInfo(id) {
  return getApi('/file/info', {id});
}

export function fileInfos(ids) {
  return getApi('/file/infos', {ids: ids.join(',')});
}
