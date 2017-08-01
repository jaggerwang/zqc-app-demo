/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  reach: undefined,
  isConnected: undefined
}

export default (state = initialState, action) => {
  if (action.type === 'SET_NETWORK') {
    let {...newState} = action
    delete newState.type
    return Object.assign({}, state, newState)
  } else if (action.type === 'RESET_NETWORK') {
    return initialState
  } else {
    return state
  }
}
