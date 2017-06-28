/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  keyboard: {
    coords: undefined
  }
}

export default (state = initialState, action) => {
  if (action.type === 'set_keyboard') {
    let {coords} = action
    return {
      ...state,
      keyboard: {
        ...state.keyboard,
        coords
      }
    }
  } else if (action.type === 'reset_device') {
    return initialState
  } else {
    return state
  }
}
