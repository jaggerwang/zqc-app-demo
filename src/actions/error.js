/**
 * 在球场
 * zaiqiuchang.com
 */

import {navToBootstrap} from '../navigation';
import * as apis from '../apis';

export const RESET_ERROR = 'reset_error';
export const ERROR_INPUT = 'error_input';
export const ERROR_FLASH = 'error_flash';

export function resetError() {
  return {
    type: RESET_ERROR,
  };
}

export function errorInput(screen, error) {
  return {
    type: ERROR_INPUT,
    screen: screen,
    error,
  };
}

export function errorFlash(error, duration=2000) {
  return (dispatch, getState) => {
    dispatch({
      type: ERROR_FLASH,
      error,
    });
    setTimeout(() => {
      dispatch({
        type: ERROR_FLASH,
        error: '',
      });
    }, duration);
  };
}

export function handleApiError(error) {
  return (dispatch, getState) => {
    if (error instanceof apis.HttpError) {
      if (error.code == 401) {
        navToBootstrap();
        return;
      }
    }
    dispatch(errorFlash(error.message));
  };
}
