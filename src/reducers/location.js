/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  position: undefined,
  city: undefined
}

export default (state = initialState, action) => {
  if (action.type === 'SET_LOCATION_POSITION') {
    let {position} = action
    if (position) {
      position.coords.longitude = Number(position.coords.longitude.toFixed(6))
      position.coords.latitude = Number(position.coords.latitude.toFixed(6))
      position.coords.altitude = Number(position.coords.altitude.toFixed(6))
    }
    return {
      ...state,
      position
    }
  } else if (action.type === 'SET_LOCATION_CITY') {
    let {city} = action
    return {
      ...state,
      city
    }
  } else if (action.type === 'RESET_LOCATION') {
    return initialState
  } else {
    return state
  }
}
