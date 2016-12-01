/**
 * 在球场
 * zaiqiuchang.com
 */

import URL from 'url';

import {RES_USER_AVATARS, RES_USER_BACKGROUNDS} from '../../config';

export function imageUri(uri, size='small') {
  url = URL.parse(uri);
  return url.hostname ? (uri + '!' + size) : uri;
}

export function imageSource(uri, size='small') {
  return {uri: imageUri(uri, size)};
}

export function userAvatarSource({avatarType, avatarName, avatarUri, avatarFile}, 
  size='small') {
  if (avatarType == 'builtin') {
    return RES_USER_AVATARS.get(avatarName);
  } else if (avatarType == 'custom') {
    if (avatarUri) {
      return imageSource(avatarUri, size);
    } else if (avatarFile) {
      return imageSource(avatarFile.url, size);
    } else {
      return null;
    }
  } else {
    return null;
  }
}
