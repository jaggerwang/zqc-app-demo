/**
 * 在球场
 * zaiqiuchang.com
 */

export const RESET = 'reset';
export const RESET_STORE = 'reset_store';
export const SET_STORE_VERSION = 'set_store_version';

export function reset() {
  return {
    type: RESET,
  };
}

export function resetStore() {
  return {
    type: RESET_STORE,
  };
}

export function setStoreVersion(version) {
  return {
    type: SET_STORE_VERSION,
    version,
  };
}
