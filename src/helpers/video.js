/**
 * 在球场
 * zaiqiuchang.com
 */

import {parse, format} from 'url';
import {parse as parsePath, format as formatPath, normalize} from 'path';

import {VIDEO_RATES} from '../const';

export function videoUri(uri, rate='ld') {
  if (uri.startsWith('http')) {
    let urlParsed = parse(uri);
    let pathParsed = parsePath(urlParsed.pathname);
    pathParsed.base = pathParsed.name + '-' + rate + pathParsed.ext;
    urlParsed.pathname = normalize(formatPath(pathParsed));
    uri = format(urlParsed);
  }
  return uri;
}

export function videoSource(uri, rate='ld') {
  return {uri: videoUri(uri, rate)};
}

export function fileVideoSource(file, rate='ld') {
  let uri = '';
  if (file) {
    if (file.path) {
      uri = file.path;
    } else if (file.mime.startsWith('video/')) {
      uri = file.playUrl;
    }
  }
  return videoSource(uri, rate);
}

export function videoCover(uri) {
  if (uri.startsWith('http')) {
    let urlParsed = parse(uri);
    let pathParsed = parsePath(urlParsed.pathname);
    pathParsed.base = pathParsed.name + '-cover.jpg';
    urlParsed.pathname = formatPath(pathParsed);
    uri = format(urlParsed);
  }
  return uri;
}

export function videoRateText(rate) {
  for (let {label, value} of VIDEO_RATES) {
    if (value == rate) {
      return label;
    }
  }
  return '';
}

export function filePixelSize(file) {
  let pixelSize = [0, 0];
  if (file) {
    if (file.width && file.height) {
      pixelSize = [file.width, file.height];
    } else if (file.pixelSize) {
      pixelSize = file.pixelSize;
    }
  }
  return pixelSize;
}
