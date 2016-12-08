/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';

export const RESET_SCREEN_STATE = 'reset_screen_state';
export const SET_SCREEN_STATE = 'set_screen_state';

export function resetScreenState(screenId) {
  return {
    type: RESET_SCREEN_STATE,
    screenId,
  };
}

export function setScreenState(screenId, screenState) {
  return {
    type: SET_SCREEN_STATE,
    screenId,
    screenState,
  };
}
