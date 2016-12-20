/**
 * 在球场
 * zaiqiuchang.com
 */

import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';

export function lbsRegeo(location) {
  let {longitude, latitude} = location;
  return getApi(`${API_ORIGIN}/lbs/regeo`, {
    location: `${longitude},${latitude}`,
  });
}