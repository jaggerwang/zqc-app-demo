/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  opBarHidden: true,
  orientation: 'PORTRAIT',
  isBuffering: false,
  loaded: false,
  paused: false,
  ended: false,
  rate: undefined,
  rateSelectorVisible: false,
  src: undefined,
  naturalSize: undefined,
  duration: 0,
  playableDuration: 0,
  currentTime: 0
}

export default (state = initialState, action) => {
  if (action.type === 'SET_PLAYER_STATE') {
    let {...newState} = action
    delete newState.type
    newState = Object.assign({}, state, newState)
    newState.currentTime = Math.min(newState.currentTime, newState.duration)
    return newState
  } else if (action.type === 'RESET' || action.type === 'RESET_PLAYER_STATE') {
    return initialState
  } else {
    return state
  }
}
