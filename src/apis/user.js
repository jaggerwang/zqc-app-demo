/**
 * 在球场
 * zaiqiuchang.com
 */

import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';

export function userInfo(id) {
  return getApi(`${API_ORIGIN}/user/info`, {id});
}

export function userInfos(ids) {
  return getApi(`${API_ORIGIN}/user/infos`, {ids: ids.join(',')});
}

export function nearbyUsers({location, distance='', limit=10}) {
  let {longitude, latitude} = location;
  return getApi(`${API_ORIGIN}/user/nearby`, {
    location: `${longitude},${latitude}`,
    distance,
    limit,
  });
}
