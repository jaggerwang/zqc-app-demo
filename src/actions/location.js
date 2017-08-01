/**
 * 在球场
 * zaiqiuchang.com
 */

import geolib from 'geolib'

import logger from '../logger'
import * as apis from '../apis'

let oldPosition
let oldCity

export function resetLocation () {
  return {
    type: 'RESET_LOCATION'
  }
}

export function setLocationPosition (position) {
  return dispatch => {
    if (oldPosition && position &&
      geolib.getDistance(position.coords, oldPosition.coords) < 10) {
      return
    }

    dispatch({
      type: 'SET_LOCATION_POSITION',
      position
    })

    dispatch(updateLocationCity())

    oldPosition = position
  }
}

export function setLocationCity (city) {
  return dispatch => {
    if (oldCity && oldCity.code === city.code) {
      return
    }

    dispatch({
      type: 'SET_LOCATION_CITY',
      city
    })

    oldCity = city
  }
}

export function updateLocationCity () {
  return (dispatch, getState) => {
    let {network, location} = getState()
    if (!network.isConnected || !location.position ||
      (oldPosition && geolib.getDistance(
          oldPosition.coords, location.position.coords) < 1000)) {
      return
    }

    apis.lbsRegeo(location.position.coords)
      .then(response => {
        let {data: {address}} = response
        let city = {
          name: address.city,
          code: address.cityCode
        }
        let m = city.name.match(/^(.+)市$/)
        if (m) {
          city.name = m[1]
        }
        dispatch(setLocationCity(city))
      })
      .catch(error => logger.warn(error))
  }
}
