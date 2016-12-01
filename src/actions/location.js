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

export function resetLocation() {
  return {
    type: RESET_LOCATION,
  };
}

export function setLocationPosition(position) {
  return {
    type: SET_LOCATION_POSITION,
    position,
  };
}

export function setLocationCity(city) {
  return {
    type: SET_LOCATION_CITY,
    city,
  };
}
