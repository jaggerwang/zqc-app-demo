/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as utils from '../utils';
import * as actions from './';

export const RESET_STORE = 'reset_store';
export const SET_STORE = 'set_store';

export function resetStore() {
  return {
    type: RESET_STORE,
  };
}

export function setStore({isReady}) {
  return {
    type: SET_STORE,
    isReady,
  };
}