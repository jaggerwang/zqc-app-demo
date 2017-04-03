/**
 * 在球场
 * zaiqiuchang.com
 */

export const RESET_DEVICE = 'reset_device';
export const SET_KEYBOARD = 'set_keyboard';

export function resetDevice() {
  return {
    type: RESET_DEVICE,
  };
}

export function setKeyboard({coords}) {
  return {
    type: SET_KEYBOARD,
    coords,
  };
}
