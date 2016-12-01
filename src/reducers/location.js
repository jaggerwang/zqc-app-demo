/**
 * 在球场
 * zaiqiuchang.com
 */

import coordtransform from 'coordtransform';
import DeviceInfo from 'react-native-device-info';

import logger from '../logger';
import * as actions from '../actions';

const initialState = {
  position: undefined,
  city: {name: '成都', code: '028'},
};

export default (state = initialState, action) => {
  if (action.type == actions.SET_LOCATION_POSITION) {
    let {position} = action;
    if (position) {
      let {coords} = position
      let {longitude, latitude, altitude} = coords
      gcj02 = coordtransform.wgs84togcj02(longitude, latitude);
      longitude = Number(gcj02[0].toFixed(6));
      latitude = Number(gcj02[1].toFixed(6));
      altitude = Number(altitude.toFixed(6));
      position = {
        ...position,
        coords: {
          ...coords,
          longitude,
          latitude,
          altitude,
        }
      };
    }
    return {
      ...state,
      position,
    };
  } else if (action.type == actions.SET_LOCATION_CITY) {
    let {city} = action;
    return {
      ...state,
      city,
    };
  } else if (action.type == actions.RESET_LOCATION) {
    return initialState;
  } else {
    return state;
  }
}
