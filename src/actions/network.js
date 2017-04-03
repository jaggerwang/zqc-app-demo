/**
 * 在球场
 * zaiqiuchang.com
 */

export const RESET_NETWORK = 'reset_network';
export const SET_NETWORK = 'set_network';

export function resetNetwork() {
  return {
    type: RESET_NETWORK,
  };
}

export function setNetwork(state) {
  return {
    type: SET_NETWORK,
    ...state,
  };
}
