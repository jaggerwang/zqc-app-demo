/**
 * 在球场
 * zaiqiuchang.com
 */

import {Alert} from 'react-native';

import logger from '../logger';
import * as utils from '../utils';
import * as apis from '../apis';
import * as actions from './';

export const RESET_LOCATION = 'reset_location';
export const SET_LOCATION_POSITION = 'set_location_position';
export const SET_LOCATION_CITY = 'set_location_city';

let oldPosition;
let oldCity;

export function resetLocation() {
  return {
    type: RESET_LOCATION,
  };
}

export function setLocationPosition(position) {
  return (dispatch, getState) => {
    if (oldPosition && position 
      && geolib.getDistance(position.coords, oldPosition.coords) < 10) {
      return;
    }

    dispatch({
      type: SET_LOCATION_POSITION,
      position,
    });

    dispatch(actions.updateAccountLocation());

    dispatch(updateLocationCity());

    oldPosition = position;
  };
}

export function setLocationCity(city) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_LOCATION_CITY,
      city,
    });

    if (!oldCity || oldCity != city) {
      dispatch(actions.setCity(city));
    }

    oldCity = city;
  };
  return ;
}

export function updateLocationCity() {
  return (dispatch, getState) => {
    let {network, location} = getState();
    if (!network.isConnected || !location.position 
      || (oldPosition && geolib.getDistance(oldPosition.coords, location.position.coords) < 1000)) {
      return;
    }

    apis.lbsRegeo(location.position.coords)
      .then(response => {
        let {data: {address}} = response;
        let city = {
          name: address.city,
          code: address.cityCode,
        };
        let m = city.name.match(/^(.+)市$/);
        if (m) {
          city.name = m[1];
        }
        dispatch(setLocationCity(city));
      })
      .catch(error => dispatch(actions.handleApiError(error)));
  };
}
