/**
 * 在球场
 * zaiqiuchang.com
 */

import geolib from 'geolib';

export function distanceText(local, remote) {
  if (!local.position || !remote) {
    return '未知';
  }

  let {coords, timestamp} = local.position;
  distance = geolib.getDistance(coords, remote);
  if (distance < 10) {
    return '<10m';
  } else if (10 <= distance && distance < 1000) {
    return distance + 'm';
  } else {
    return Math.round(distance / 1000) + 'km';
  }
}