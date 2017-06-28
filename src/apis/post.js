/**
 * 在球场
 * zaiqiuchang.com
 */

import {getApi} from './'

export function postInfo (id) {
  return getApi('/post/info', {id})
}

export function postInfos (ids) {
  return getApi('/post/infos', {ids: ids.join(',')})
}

export function nearbyPosts ({location, sportCode = '', distance = '',
  status = 0, limit = 10, offset = ''}) {
  let {longitude, latitude} = location
  return getApi('/post/nearby', {
    location: `${longitude},${latitude}`,
    sportCode,
    distance,
    status,
    limit,
    offset
  })
}

export function postsOfCity ({cityCode = '', sportCode = '', status = 0,
  limit = 10, offset = ''}) {
  return getApi('/post/byCity', {cityCode, sportCode, status, limit, offset})
}
