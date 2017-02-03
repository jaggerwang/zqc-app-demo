/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';

export const RESET_PLAYER_STATE = 'reset_player_state';
export const SET_PLAYER_STATE = 'set_player_state';

export function resetPlayerState() {
  return {
    type: RESET_PLAYER_STATE,
  };
}

export function setPlayerState(state) {
  return {
    type: SET_PLAYER_STATE,
    ...state,
  };
}
