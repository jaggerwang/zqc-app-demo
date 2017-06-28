/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  reach: undefined,
  isConnected: undefined
}

export default (state = initialState, action) => {
  if (action.type === 'set_network') {
    let {...newState} = action
    delete newState.type
    return Object.assign({}, state, newState)
  } else if (action.type === 'reset_network') {
    return initialState
  } else {
    return state
  }
}
