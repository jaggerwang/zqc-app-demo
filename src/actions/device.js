/**
 * 在球场
 * zaiqiuchang.com
 */

export function resetDevice () {
  return {
    type: 'reset_device'
  }
}

export function setKeyboard ({coords}) {
  return {
    type: 'set_keyboard',
    coords
  }
}
