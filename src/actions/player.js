/**
 * 在球场
 * zaiqiuchang.com
 */

export function resetPlayerState () {
  return {
    type: 'RESET_PLAYER_STATE'
  }
}

export function setPlayerState (state) {
  return {
    type: 'SET_PLAYER_STATE',
    ...state
  }
}
